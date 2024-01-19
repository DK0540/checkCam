// InspectionCameraView.js
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { MdCameraswitch } from "react-icons/md";
// import "./InspectionCameraView.css"; // Change the CSS file name
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

const InspectionCameraViewContainer = styled.div`
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

const InspectionCameraView = ({ onCapture, onClose }) => {
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
    <InspectionCameraViewContainer>
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
    </InspectionCameraViewContainer>
  );
};

export default InspectionCameraView;

///////////////////old
// // InspectionCameraView.js
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import { MdCameraswitch } from "react-icons/md";
// import "./CameraView.css"; // Change the CSS file name

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

// const InspectionCameraViewContainer = styled.div`
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

// const InspectionCameraView = ({ onCapture, onClose }) => {
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
//         <InspectionCameraViewContainer>
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
//         </InspectionCameraViewContainer>
//       )}
//     </>
//   );
// };

// export default InspectionCameraView;
