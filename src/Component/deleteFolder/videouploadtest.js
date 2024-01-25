import React, { useState, useRef } from "react";
import styled from "styled-components";

const StatementCameraViewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const CaptureSection = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const VideoPreview = styled.video`
  margin-top: 10px;
`;

const StatementCameraView = ({ onCapture, onClose }) => {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = () => {
    if (mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/mp4" });
        setCapturedVideo(URL.createObjectURL(blob));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const toggleCamera = async () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const retakeVideo = () => {
    setCapturedVideo(null);
    startRecording(); // Automatically start recording again
  };

  // const saveVideo = () => {
  //   if (capturedVideo) {
  //     onCapture(capturedVideo);
  //     onClose();
  //   }
  // };
  const saveVideo = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }

    if (chunksRef.current.length > 0) {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      setCapturedVideo(URL.createObjectURL(blob));
      chunksRef.current = [];
      console.log("Blob created:", blob);
      console.log("Captured Video URL (before onCapture):", capturedVideo);
    }

    if (capturedVideo) {
      onCapture(capturedVideo);
      onClose();
      console.log("Captured Video URL (after onCapture):", capturedVideo);
    }
  };

  return (
    <StatementCameraViewContainer>
      {capturedVideo ? (
        <CaptureSection>
          <VideoPreview controls src={capturedVideo} />
          <Button onClick={retakeVideo}>Retake</Button>
          <Button onClick={saveVideo}>Save</Button>
        </CaptureSection>
      ) : (
        <>
          {!recording && <Button onClick={toggleCamera}>Toggle Camera</Button>}
          <CaptureSection>
            {!recording && (
              <Button onClick={startRecording} disabled={!mediaStream}>
                Start Recording
              </Button>
            )}
            {recording && (
              <Button onClick={stopRecording}>Stop Recording</Button>
            )}
            {recording && <span>Recording...</span>}
          </CaptureSection>
          <VideoPreview ref={videoRef} autoPlay playsInline muted />
        </>
      )}
      <Button className="closeBtn" onClick={onClose}>
        Close
      </Button>
    </StatementCameraViewContainer>
  );
};

export default StatementCameraView;
