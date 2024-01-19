// SubsidyCameraView.js
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { MdCameraswitch } from "react-icons/md";
import styled from "styled-components";

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
`;

const SubsidyCameraViewContainer = styled.div`
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

const CapturedImageContainer = styled.div`
  max-width: 100%;
  text-align: right;
  padding: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CapturedImage = styled.img`
  max-width: 100%;
`;

const CaptureOptions = styled.div`
  margin-top: 10px;
`;

const SubsidyCameraView = ({ onCapture, onClose }) => {
  const [facingMode, setFacingMode] = useState("environment");
  const [capturedImage, setCapturedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleTakePhoto = (dataUri) => {
    setCapturedImage(dataUri);
    setShowOptions(true);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowOptions(false);
  };

  const handleSave = () => {
    onCapture(capturedImage);
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  return (
    <SubsidyCameraViewContainer>
      {capturedImage && (
        <CapturedImageContainer>
          <CapturedImage src={capturedImage} alt="Captured" />
          {showOptions && (
            <CaptureOptions>
              <Button onClick={handleRetake}>Retake</Button>
              <Button onClick={handleSave}>Save</Button>
            </CaptureOptions>
          )}
        </CapturedImageContainer>
      )}
      {!capturedImage && (
        <>
          <Camera
            isImageMirror={false}
            onTakePhoto={handleTakePhoto}
            idealFacingMode={facingMode}
          />
          <Button className="cambtn1" onClick={toggleFacingMode}>
            <MdCameraswitch />
          </Button>
          <Button className="closeBtn" onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </SubsidyCameraViewContainer>
  );
};

export default SubsidyCameraView;

/////////////////old
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import { MdCameraswitch } from "react-icons/md";
// import styled from "styled-components";
// import "./CameraView.css"; // Change the CSS file name

// const Button = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const SubsidyCameraViewContainer = styled.div`
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

// const SubsidyCameraView = ({ onCapture, onClose }) => {
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
//     <>
//       {capturedImage ? (
//         <div>
//           <img
//             src={capturedImage}
//             alt="Captured"
//             style={{ maxWidth: "100%" }}
//           />
//           {showOptions && (
//             <>
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </>
//           )}
//         </div>
//       ) : (
//         <SubsidyCameraViewContainer>
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
//         </SubsidyCameraViewContainer>
//       )}
//     </>
//   );
// };

// export default SubsidyCameraView;

//======================================================>>One
// import React, { useRef, useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";

// const CameraViewContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow-y: auto; /* Enable vertical scrolling */
// `;

// const CameraViewContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
// `;

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
//   height: 30px;
//   font-size: 10px;
//   width: 72px;
// `;

// const CloseButton = styled(CameraButton)`
//   background-color: #e74c3c;
// `;

// const SubsidyCameraView = ({ onCapture, onClose }) => {
//   const [facingMode, setFacingMode] = useState("environment");
//   const cameraRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const handleCapture = () => {
//     const dataUri = cameraRef.current.takePhoto();
//     setCapturedImage(dataUri);
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
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
//     <CameraViewContainer>
//       <CameraViewContent>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//         <Camera
//           ref={cameraRef}
//           onTakePhoto={(dataUri) => {
//             setCapturedImage(dataUri);
//           }}
//         />
//         <CameraButton onClick={handleCapture}>Capture</CameraButton>
//         {capturedImage && (
//           <>
//             <img src={capturedImage} alt="Captured" />
//             <CameraButton onClick={handleRetake}>Retake</CameraButton>
//             <CameraButton onClick={handleSave}>Save</CameraButton>
//           </>
//         )}
//       </CameraViewContent>
//     </CameraViewContainer>
//   );
// };

// export default SubsidyCameraView;
