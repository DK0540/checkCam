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

/////////////////////////////////////new
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center; /* Center content vertically and horizontally */
// `;

// const CaptureSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   font-size: ${(props) => (props.recording ? "30px" : "18px")};
//   margin-top: ${(props) => (props.recording ? "20px" : "10px")};
//   color: ${(props) => (props.isWhite ? "white" : "red")};
// `;

// const ButtonsContainer = styled.div`
//   display: flex;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(60);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const initializeCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   useEffect(() => {
//     initializeCamera();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime - 1);

//         if (elapsedTime <= 0) {
//           stopRecording();
//         }
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording, elapsedTime]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   if (elapsedTime < 1) {
//     stopRecording();
//   }

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//     }
//   };

//   const retakeVideo = async () => {
//     setCapturedVideo(null);
//     // Automatically start recording again

//     setElapsedTime(60); // Reset elapsed time

//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }

//     await initializeCamera();
//     startRecording();
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <ButtonsContainer>
//             <Button onClick={retakeVideo}>Retake</Button>
//             <Button onClick={saveVideo}>Save</Button>
//           </ButtonsContainer>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//           <ButtonsContainer>
//             {!recording && (
//               <Button onClick={startRecording} disabled={!mediaStream}>
//                 Start Recording
//               </Button>
//             )}
//           </ButtonsContainer>

//           {recording && (
//             <>
//               <Timer
//                 recording
//                 isWhite={elapsedTime >= 10}
//               >{`${elapsedTime}`}</Timer>
//               <ButtonsContainer>
//                 <Button onClick={stopRecording}>Stop Recording</Button>
//               </ButtonsContainer>
//             </>
//           )}
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

//////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center; /* Center content vertically and horizontally */
// `;

// const CaptureSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
// `;

// // const Timer = styled.span`
// //   font-size: 18px;
// //   margin-top: 10px;
// //   color: ${(props) => (props.isWhite ? "white" : "red")};
// // `;
// const Timer = styled.span`
//   font-size: ${(props) => (props.recording ? "30px" : "18px")};
//   margin-top: ${(props) => (props.recording ? "20px" : "10px")};
//   color: ${(props) => (props.isWhite ? "white" : "red")};
// `;

// const ButtonsContainer = styled.div`
//   display: flex;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(60);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime - 1);

//         if (elapsedTime <= 0) {
//           stopRecording();
//         }
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording, elapsedTime]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   if (elapsedTime < 1) {
//     stopRecording();
//   }

//   // const retakeVideo = () => {
//   //   setCapturedVideo(null);
//   //   startRecording();
//   // };

//   const retakeVideo = async () => {
//     setCapturedVideo(null);
//     setElapsedTime(60); // Reset elapsed time

//     // Stop the previous media stream
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }

//     // Reinitialize the camera
//     await initializeCamera();

//     // Start recording again
//     startRecording();
//   };

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <ButtonsContainer>
//             <Button onClick={retakeVideo}>Retake</Button>
//             <Button onClick={saveVideo}>Save</Button>
//           </ButtonsContainer>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//           <ButtonsContainer>
//             {!recording && (
//               <Button onClick={startRecording} disabled={!mediaStream}>
//                 Start Recording
//               </Button>
//             )}
//           </ButtonsContainer>

//           {recording && (
//             <>
//               <Timer
//                 recording
//                 isWhite={elapsedTime >= 10}
//               >{`${elapsedTime}`}</Timer>
//               <ButtonsContainer>
//                 <Button onClick={stopRecording}>Stop Recording</Button>
//               </ButtonsContainer>
//             </>
//           )}
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

///////////////////////////////////////////////////////////////////all  are good
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   font-size: 18px;
//   margin-top: 10px;
//   color: ${(props) => (props.isWhite ? "white" : "red")};
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   text-align: center;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(60);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       // Cleanup: Stop the media stream when the component unmounts
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime - 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   if (elapsedTime < 1) {
//     stopRecording();
//   }

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           {recording && (
//             <>
//               <Button onClick={stopRecording}>Stop Recording</Button>
//               <Timer isWhite={elapsedTime >= 10}>{`${elapsedTime}s`}</Timer>
//             </>
//           )}
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//       {!recording && (
//         <Button onClick={startRecording} disabled={!mediaStream}>
//           Start Recording
//         </Button>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

////////////////////////////////////////////////////////////timing color changeing
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   font-size: 18px;
//   margin-top: 10px;
//   color: ${(props) => (props.isRed ? "#e74c3c" : "#f39c12")};
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   text-align: center;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       // Cleanup: Stop the media stream when the component unmounts
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       let prevTime = 0;
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime + 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   if (elapsedTime > 60) {
//     stopRecording();
//   }

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           {recording && (
//             <>
//               <Button onClick={stopRecording}>Stop Recording</Button>
//               <Timer isRed={elapsedTime >= 10}>{`${elapsedTime}s`}</Timer>
//             </>
//           )}
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//       {!recording && (
//         <Button onClick={startRecording} disabled={!mediaStream}>
//           Start Recording
//         </Button>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

/////////////////////////////////////////////////////////////////stop timing working
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   color: #f39c12; /* Yellow color */
//   font-size: 18px;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   text-align: center;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       // Cleanup: Stop the media stream when the component unmounts
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       let prevTime = 0;
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime + 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   if (elapsedTime > 60) {
//     stopRecording();
//   }

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           {recording && (
//             <>
//               <Button onClick={stopRecording}>Stop Recording</Button>
//               <Timer>{`${elapsedTime}s`}</Timer>
//             </>
//           )}
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//       {!recording && (
//         <Button onClick={startRecording} disabled={!mediaStream}>
//           Start Recording
//         </Button>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

//////////////////////////////////////////////////////////////good with automatic on
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   color: #f39c12; /* Yellow color */
//   font-size: 18px;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   text-align: center;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       // Cleanup: Stop the media stream when the component unmounts
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime + 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <CaptureSection>
//           {recording && (
//             <>
//               <Button onClick={stopRecording}>Stop Recording</Button>
//               <Timer>{`${elapsedTime}s`}</Timer>
//             </>
//           )}
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </CaptureSection>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//       {!recording && (
//         <Button onClick={startRecording} disabled={!mediaStream}>
//           Start Recording
//         </Button>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

/////////////////////////////////////////////////////////////////good with seconds
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Timer = styled.span`
//   color: #f39c12; /* Yellow color */
//   font-size: 18px;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   text-align: center;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   useEffect(() => {
//     let interval;

//     if (recording) {
//       interval = setInterval(() => {
//         setElapsedTime((prevTime) => prevTime + 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [recording]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

// const toggleCamera = async () => {
// if (mediaStream) {
//   mediaStream.getTracks().forEach((track) => track.stop());
//   }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

// const retakeVideo = () => {
//   setCapturedVideo(null);
//   startRecording(); // Automatically start recording again
// };

//   // const saveVideo = () => {
//   //   if (capturedVideo) {
//   //     onCapture(capturedVideo);
//   //     onClose();
//   //   }
//   // };
//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <>
//           {!recording && <Button onClick={toggleCamera}>Toggle Camera</Button>}
//           <CaptureSection>
//             {!recording && (
//               <Button onClick={startRecording} disabled={!mediaStream}>
//                 Start Recording
//               </Button>
//             )}
//             {recording && (
//               <>
//                 <Button onClick={stopRecording}>Stop Recording</Button>
//                 <Timer>{`Recording: ${elapsedTime}s`}</Timer>
//               </>
//             )}
//             <VideoPreview ref={videoRef} autoPlay playsInline muted />
//           </CaptureSection>
//         </>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

//////////////////////////////////////////////////////////////////>>>>final below okay 100% working
// import React, { useState, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const toggleCamera = async () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const retakeVideo = () => {
// setCapturedVideo(null);
// startRecording(); // Automatically start recording again
//   };

//   // const saveVideo = () => {
//   //   if (capturedVideo) {
//   //     onCapture(capturedVideo);
//   //     onClose();
//   //   }
//   // };
//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <>
//           {!recording && <Button onClick={toggleCamera}>Toggle Camera</Button>}
//           <CaptureSection>
//             {!recording && (
//               <Button onClick={startRecording} disabled={!mediaStream}>
//                 Start Recording
//               </Button>
//             )}
//             {recording && (
//               <Button onClick={stopRecording}>Stop Recording</Button>
//             )}
//             {recording && <span>Recording...</span>}
//           </CaptureSection>
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

///////////////////////////////////////////////////////////ok3
// import React, { useState, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const toggleCamera = async () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     startRecording(); // Automatically start recording again
//   };

//   // const saveVideo = () => {
//   //   if (capturedVideo) {
//   //     onCapture(capturedVideo);
//   //     onClose();
//   //   }
//   // };
//   const saveVideo = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }

//     if (chunksRef.current.length > 0) {
//       const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//       setCapturedVideo(URL.createObjectURL(blob));
//       chunksRef.current = [];
//       console.log("Blob created:", blob);
//       console.log("Captured Video URL (before onCapture):", capturedVideo);
//     }

//     if (capturedVideo) {
//       onCapture(capturedVideo);
//       onClose();
//       console.log("Captured Video URL (after onCapture):", capturedVideo);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedVideo ? (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideo}>Save</Button>
//         </CaptureSection>
//       ) : (
//         <>
//           {!recording && <Button onClick={toggleCamera}>Toggle Camera</Button>}
//           <CaptureSection>
//             {!recording && (
//               <Button onClick={startRecording} disabled={!mediaStream}>
//                 Start Recording
//               </Button>
//             )}
//             {recording && (
//               <Button onClick={stopRecording}>Stop Recording</Button>
//             )}
//             {recording && <span>Recording...</span>}
//           </CaptureSection>
//           <VideoPreview ref={videoRef} autoPlay playsInline muted />
//         </>
//       )}
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

//////////////////////////////////////////////////////////////ok2
// import React, { useState, useRef } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [recording, setRecording] = useState(false);
//   const [mediaStream, setMediaStream] = useState(null);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = () => {
//     if (mediaStream) {
//       mediaRecorderRef.current = new MediaRecorder(mediaStream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "video/webm" });
//         const videoURL = URL.createObjectURL(blob);
//         onCapture(videoURL);
//         onClose();
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state !== "inactive"
//     ) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const toggleCamera = async () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   return (
//     <StatementCameraViewContainer>
//       {!recording && <Button onClick={toggleCamera}>Toggle Camera</Button>}
//       <CaptureSection>
//         {!recording && (
//           <Button onClick={startRecording} disabled={!mediaStream}>
//             Start Recording
//           </Button>
//         )}
//         {recording && <Button onClick={stopRecording}>Stop Recording</Button>}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       <VideoPreview ref={videoRef} autoPlay playsInline muted />
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

////////////////////////////////////////////////////////////ok
// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const CameraFunctions = ({ onCapture, setCapturedVideo, setFileSize }) => {
//   const videoRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/mp4" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         setFileSize((blob.size / (1024 * 1024)).toFixed(2) + " MB");
//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setRecording(true);

//       setTimeout(() => {
//         stopRecording();
//       }, 5000); // Stop recording after 5 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     setFileSize(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideoToFile = () => {
//     // Implement logic to save video to gallery or a file
//     alert("Video saved to gallery or file!");
//     setCapturedVideo(null);
//     setFileSize(null);
//     stopCamera();
//   };

//   return {
//     openCamera,
//     startRecording,
//     stopRecording,
//     retakeVideo,
//     saveVideoToFile,
//     videoRef,
//     recording,
//   };
// };

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);

//   const {
//     openCamera,
//     startRecording,
//     stopRecording,
//     retakeVideo,
//     saveVideoToFile,
//     videoRef,
//     recording,
//   } = CameraFunctions({ onCapture, setCapturedVideo, setFileSize });

//   return (
//     <StatementCameraViewContainer>
//       {!capturedVideo ? (
//         <>
//           <button onClick={() => openCamera("user")}>Open Front Camera</button>
//           <button onClick={() => openCamera("environment")}>
//             Open Rear Camera
//           </button>
//         </>
//       ) : null}
//       <CaptureSection>
//         {!capturedVideo ? (
//           <Button onClick={startRecording} disabled={recording}>
//             Record Video
//           </Button>
//         ) : null}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       {capturedVideo && (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <div>
//             <span>File Size: {fileSize}</span>
//           </div>
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideoToFile}>Save</Button>
//         </CaptureSection>
//       )}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//       <Button className="closeBtn" onClick={onClose}>
//         Close
//       </Button>
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

/////////////////////////////////
// // StatementCameraView.js
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import { MdCameraswitch } from "react-icons/md";
// import styled from "styled-components";

// const Button = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CapturedImageContainer = styled.div`
//   max-width: 100%;
//   text-align: right;
//   padding: 10px;
//   position: absolute;
//   bottom: 0;
//   right: 0;
// `;

// const CapturedImage = styled.img`
//   max-width: 100%;
// `;

// const CaptureOptions = styled.div`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [facingMode, setFacingMode] = useState("environment");
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);

//   const handleTakePhoto = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowOptions(true);
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setShowOptions(false);
//   };

//   const handleSave = () => {
//     onCapture(capturedImage);
//     onClose();
//   };

//   const toggleFacingMode = () => {
//     setFacingMode((prevMode) =>
//       prevMode === "environment" ? "user" : "environment"
//     );
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedImage && (
//         <CapturedImageContainer>
//           <CapturedImage src={capturedImage} alt="Captured" />
//           {showOptions && (
//             <CaptureOptions>
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </CaptureOptions>
//           )}
//         </CapturedImageContainer>
//       )}
//       {!capturedImage && (
//         <>
//           <Camera
//             isImageMirror={false}
//             onTakePhoto={handleTakePhoto}
//             idealFacingMode={facingMode}
//           />
//           <Button className="cambtn1" onClick={toggleFacingMode}>
//             <MdCameraswitch />
//           </Button>
//           <Button className="closeBtn" onClick={onClose}>
//             Close
//           </Button>
//         </>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;

/////////////////////////
// // StatementCameraView.js
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import { MdCameraswitch } from "react-icons/md";
// import styled from "styled-components";

// const Button = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const StatementCameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CapturedImageContainer = styled.div`
//   max-width: 100%;
//   text-align: right;
//   padding: 10px;
//   position: absolute;
//   bottom: 0;
//   right: 0;
// `;

// const CapturedImage = styled.img`
//   max-width: 100%;
// `;

// const CaptureOptions = styled.div`
//   margin-top: 10px;
// `;

// const StatementCameraView = ({ onCapture, onClose }) => {
//   const [facingMode, setFacingMode] = useState("environment");
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);

//   const handleTakePhoto = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowOptions(true);
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setShowOptions(false);
//   };

//   const handleSave = () => {
//     onCapture(capturedImage);
//     onClose();
//   };

//   const toggleFacingMode = () => {
//     setFacingMode((prevMode) =>
//       prevMode === "environment" ? "user" : "environment"
//     );
//   };

//   return (
//     <StatementCameraViewContainer>
//       {capturedImage && (
//         <CapturedImageContainer>
//           <CapturedImage src={capturedImage} alt="Captured" />
//           {showOptions && (
//             <CaptureOptions>
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </CaptureOptions>
//           )}
//         </CapturedImageContainer>
//       )}
//       {!capturedImage && (
//         <>
//           <Camera
//             isImageMirror={false}
//             onTakePhoto={handleTakePhoto}
//             idealFacingMode={facingMode}
//           />
//           <Button className="cambtn1" onClick={toggleFacingMode}>
//             <MdCameraswitch />
//           </Button>
//           <Button className="closeBtn" onClick={onClose}>
//             Close
//           </Button>
//         </>
//       )}
//     </StatementCameraViewContainer>
//   );
// };

// export default StatementCameraView;
