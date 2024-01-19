import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StatementCameraView from "../CamStore/StatementCameraView ";
import { FaCamera, FaFile } from "react-icons/fa";

const StatementCaptureContainer = styled.div`
  background-color: #f3f3f3ed;
  padding: 10px;
  border-bottom: 2px solid gray;
`;

const FarmerStatementPreview = styled.div`
  max-width: 150px;
  height: 130px;
  background-color: #2ecc71;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  right: -304px;
  gap: 18px;
  margin-top: 5px;
`;

const CameraButton = styled.button`
  background-color: green;
  color: white;
  padding: 3px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 70px;
  font-size: 17px;
  margin-bottom: 0;
`;

const FileUploadButton = styled.label`
  background-color: blue;
  color: white;
  padding: 3px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 64px;
  text-align: center;
  font-size: 18px;
`;

const StatementPhotoText = styled.p`
  max-width: 150px;
  height: 130px;
  margin-top: -81px;
  color: #777777;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #777777;
  border-radius: 8px;
`;

const Headp = styled.p`
  margin-top: -4px;
  font-size: 16px;
  font-weight: 500;
  color: #818181;
`;

const FarmerStatementCapture = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
  farmerNameTitle,
  farmerFather,
  farmerName,
  capturedVideo,
  setCapturedVideo,
}) => {
  const [showStatementCamera, setShowStatementCamera] = useState(false);
  const [statementLocation, setStatementLocation] = useState(null);
  const [statementCapturedDateTime, setStatementCapturedDateTime] =
    useState(null);

  const handleOpenStatementCamera = () => {
    setShowStatementCamera(true);
  };

  const handleStatementCameraClose = () => {
    setShowStatementCamera(false);
  };

  // const handleCaptureStatement = (videoUrl) => {
  //   setCapturedVideo(videoUrl);
  //   setShowStatementCamera(false);
  // };

  const handleCaptureStatement = (videoUrl) => {
    console.log("Captured Video in Child:", videoUrl); // Log the captured video URL in child component
    setCapturedVideo(videoUrl);
    setShowStatementCamera(false);
  };

  const handleStatementFileUpload = (event) => {
    // Handle file upload if needed
  };

  const getStatementLocation = () => {
    // Geolocation logic
  };

  // useEffect(() => {
  //   if (capturedVideo) {
  //     // Save the captured video in the setStatementImage state
  //     setStatementImage(capturedVideo);
  //   }
  // }, [capturedVideo, setStatementImage]);

  return (
    <StatementCaptureContainer id="statementCaptureContainer">
      <Headp>Statement Video</Headp>
      <ButtonContainer>
        <CameraButton onClick={handleOpenStatementCamera}>
          <FaCamera />
        </CameraButton>
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="video/*" // Assume only video files
            onChange={handleStatementFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {showStatementCamera && (
        <StatementCameraView
          onCapture={handleCaptureStatement}
          onClose={handleStatementCameraClose}
        />
      )}

      {capturedVideo ? (
        <FarmerStatementPreview>
          <video controls width="100%" height="100%" src={capturedVideo} />
        </FarmerStatementPreview>
      ) : (
        <StatementPhotoText>Empty</StatementPhotoText>
      )}
    </StatementCaptureContainer>
  );
};

export default FarmerStatementCapture;

//////////////////////////////////////////////////Last chnages
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import StatementCameraView from "../CamStore/StatementCameraView ";
// import { FaCamera, FaFile } from "react-icons/fa";

// const StatementCaptureContainer = styled.div`
//   background-color: #f3f3f3ed;
//   padding: 10px;
//   border-bottom: 2px solid gray;
// `;

// const FarmerStatementPreview = styled.div`
//   max-width: 150px;
//   height: 130px;
//   background-color: #2ecc71;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   right: -304px;
//   gap: 18px;
//   margin-top: 5px;
// `;

// const CameraButton = styled.button`
//   background-color: green;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0;
// `;

// const FileUploadButton = styled.label`
//   background-color: blue;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const StatementPhotoText = styled.p`
//   max-width: 150px;
//   height: 130px;
//   margin-top: -81px;
//   color: #777777;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dashed #777777;
//   border-radius: 8px;
// `;

// const FarmerStatementCapture = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   capturedVideo,
//   setCapturedVideo,
// }) => {
//   const [showStatementCamera, setShowStatementCamera] = useState(false);
//   const [statementLocation, setStatementLocation] = useState(null);
//   const [statementCapturedDateTime, setStatementCapturedDateTime] =
//     useState(null);

//   const handleOpenStatementCamera = () => {
//     setShowStatementCamera(true);
//   };

//   const handleStatementCameraClose = () => {
//     setShowStatementCamera(false);
//   };

//   const handleCaptureStatement = (videoUrl) => {
//     setCapturedVideo(videoUrl);
//     setShowStatementCamera(false);
//   };

//   const handleStatementFileUpload = (event) => {
//     // Handle file upload if needed
//   };

//   const getStatementLocation = () => {
//     // Geolocation logic
//   };

//   // useEffect(() => {
//   //   if (capturedVideo) {
//   //     // Save the captured video in the setStatementImage state
//   //     setStatementImage(capturedVideo);
//   //   }
//   // }, [capturedVideo, setStatementImage]);

//   return (
//     <StatementCaptureContainer id="statementCaptureContainer">
//       <ButtonContainer>
//         <CameraButton onClick={handleOpenStatementCamera}>
//           <FaCamera />
//         </CameraButton>
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="video/*" // Assume only video files
//             onChange={handleStatementFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {showStatementCamera && (
//         <StatementCameraView
//           onCapture={handleCaptureStatement}
//           onClose={handleStatementCameraClose}
//         />
//       )}

//       {capturedVideo ? (
//         <FarmerStatementPreview>
//           <video controls width="100%" height="100%" src={capturedVideo} />
//         </FarmerStatementPreview>
//       ) : (
//         <StatementPhotoText>Empty</StatementPhotoText>
//       )}
//     </StatementCaptureContainer>
//   );
// };

// export default FarmerStatementCapture;

////////////////////////////////////////////////////////////video saving
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import StatementCameraView from "../CamStore/StatementCameraView ";
// import { FaCamera, FaFile } from "react-icons/fa";

// const StatementCaptureContainer = styled.div`
//   background-color: #f3f3f3ed;
//   padding: 10px;
//   border-bottom: 2px solid gray;
// `;

// const FarmerStatementPreview = styled.div`
//   max-width: 150px;
//   height: 130px;
//   background-color: #2ecc71;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   right: -304px;
//   gap: 18px;
//   margin-top: 5px;
// `;

// const CameraButton = styled.button`
//   background-color: green;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0;
// `;

// const FileUploadButton = styled.label`
//   background-color: blue;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const StatementPhotoText = styled.p`
//   max-width: 150px;
//   height: 130px;
//   margin-top: -81px;
//   color: #777777;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dashed #777777;
//   border-radius: 8px;
// `;

// const FarmerStatementCapture = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   statementImage,
//   setStatementImage,
// }) => {
//   const [showStatementCamera, setShowStatementCamera] = useState(false);
//   const [statementLocation, setStatementLocation] = useState(null);
//   const [statementCapturedDateTime, setStatementCapturedDateTime] =
//     useState(null);

//   const [capturedVideo, setCapturedVideo] = useState(null);

//   const handleOpenStatementCamera = () => {
//     setShowStatementCamera(true);
//   };

//   const handleStatementCameraClose = () => {
//     setShowStatementCamera(false);
//   };

//   const handleCaptureStatement = (videoUrl) => {
//     setCapturedVideo(videoUrl);
//     setShowStatementCamera(false);
//   };

//   const handleStatementFileUpload = (event) => {
//     // Handle file upload if needed
//   };

//   const getStatementLocation = () => {
//     // Geolocation logic
//   };

//   useEffect(() => {
//     if (capturedVideo) {
//       // Save the captured video in the setStatementImage state
//       setStatementImage(capturedVideo);
//     }
//   }, [capturedVideo, setStatementImage]);

//   return (
//     <StatementCaptureContainer id="statementCaptureContainer">
//       <ButtonContainer>
//         <CameraButton onClick={handleOpenStatementCamera}>
//           <FaCamera />
//         </CameraButton>
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="video/*" // Assume only video files
//             onChange={handleStatementFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {showStatementCamera && (
//         <StatementCameraView
//           onCapture={handleCaptureStatement}
//           onClose={handleStatementCameraClose}
//         />
//       )}

//       {capturedVideo ? (
//         <FarmerStatementPreview>
//           <video controls width="100%" height="100%" src={capturedVideo} />
//         </FarmerStatementPreview>
//       ) : (
//         <StatementPhotoText>Empty</StatementPhotoText>
//       )}
//     </StatementCaptureContainer>
//   );
// };

// export default FarmerStatementCapture;

///////////////////////////////////////////////////////////////old last
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import StatementCameraView from "../CamStore/StatementCameraView ";
// import { FaCamera, FaFile } from "react-icons/fa";
// const StatementCaptureContainer = styled.div`
//   background-color: #f3f3f3ed;
//   padding: 10px;
//   border-bottom: 2px solid gray;
// `;

// const FarmerStatementPreview = styled.div`
//   max-width: 150px;
//   height: 130px;
//   background-color: #2ecc71;
//   background-image: ${(props) =>
//     props.videoUrl ? `url(${props.videoUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin-top: -81px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   right: -304px;
//   gap: 18px;
//   margin-top: 5px;
// `;

// const CameraButton = styled.button`
//   background-color: green;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0;
// `;

// const FileUploadButton = styled.label`
//   background-color: blue;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const StatementPhotoText = styled.p`
//   max-width: 150px;
//   height: 130px;
//   margin-top: -81px;
//   color: #777777;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dashed #777777;
//   border-radius: 8px;
// `;

// const FarmerStatementCapture = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   statementImage,
//   setStatementImage,
// }) => {
//   const [showStatementCamera, setShowStatementCamera] = useState(false);
//   const [statementLocation, setStatementLocation] = useState(null);
//   const [statementCapturedDateTime, setStatementCapturedDateTime] =
//     useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);

//   const handleOpenStatementCamera = () => {
//     setShowStatementCamera(true);
//   };

//   const handleStatementCameraClose = () => {
//     setShowStatementCamera(false);
//   };

//   const handleCaptureStatement = (videoURL) => {
//     setCapturedVideo(videoURL);
//     setShowStatementCamera(false);
//     getStatementLocation();
//   };

//   const handleStatementFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setStatementImage(reader.result);
//         getStatementLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getStatementLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setStatementLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set statement capturedDateTime to the current date and time
//           setStatementCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting statement location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (statementImage && statementLocation) {
//       const image = new Image();

//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         // Set canvas dimensions to match the captured image
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Draw the captured image onto the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";

//         // Add relevant information to be displayed on the image
//         // Adjust the content based on your requirements
//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${statementLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${statementLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${statementCapturedDateTime}`;

//         context.font = "bold 14px Arial"; // Set bold font
//         context.fillText(sNoText, 20, image.height - 140); // Place at the top
//         context.font = "14px Arial"; // Reset font

//         context.fillText(latitudeText, 10, image.height - 120);
//         context.fillText(longitudeText, 10, image.height - 100);
//         context.fillText(farmerNameText, 10, image.height - 80);
//         context.fillText(farmerNameTitleText, 10, image.height - 60);
//         context.fillText(dateTimeText, 10, image.height - 40);

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setStatementImage(dataURL);
//       };

//       image.src = statementImage;
//     }
//   }, [
//     statementImage,
//     statementLocation,
//     farmerFieldId,
//     statementCapturedDateTime,
//   ]);

//   return (
//     <StatementCaptureContainer id="statementCaptureContainer">
//       <ButtonContainer>
//         <CameraButton onClick={handleOpenStatementCamera}>
//           <FaCamera />
//         </CameraButton>
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleStatementFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {showStatementCamera && (
//         <StatementCameraView
//           onCapture={handleCaptureStatement}
//           onClose={handleStatementCameraClose}
//         />
//       )}

//       {capturedVideo && statementLocation ? (
//         <FarmerStatementPreview videoUrl={capturedVideo} />
//       ) : (
//         <StatementPhotoText>Empty</StatementPhotoText>
//       )}
//     </StatementCaptureContainer>
//   );
// };

// export default FarmerStatementCapture;

//////////////////////////////////////////////////////////////////old2
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import StatementCameraView from "../CamStore/StatementCameraView ";
// import { FaCamera, FaFile } from "react-icons/fa";
// const StatementCaptureContainer = styled.div`
//   background-color: #f3f3f3ed;
//   padding: 10px;
//   border-bottom: 2px solid gray;
// `;

// const FarmerStatementPreview = styled.div`
//   max-width: 150px;
//   height: 130px;
//   background-color: #2ecc71;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin-top: -81px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   right: -304px;
//   gap: 18px;
//   margin-top: 5px;
// `;

// const CameraButton = styled.button`
//   background-color: green;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0;
// `;

// const FileUploadButton = styled.label`
//   background-color: blue;
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const StatementPhotoText = styled.p`
//   max-width: 150px;
//   height: 130px;
//   margin-top: -81px;
//   color: #777777;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dashed #777777;
//   border-radius: 8px;
// `;

// const FarmerStatementCapture = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   statementImage,
//   setStatementImage,
// }) => {
//   const [showStatementCamera, setShowStatementCamera] = useState(false);
//   const [statementLocation, setStatementLocation] = useState(null);
//   const [statementCapturedDateTime, setStatementCapturedDateTime] =
//     useState(null);

//   const handleOpenStatementCamera = () => {
//     setShowStatementCamera(true);
//   };

//   const handleStatementCameraClose = () => {
//     setShowStatementCamera(false);
//   };

//   const handleCaptureStatement = (dataUri) => {
//     setStatementImage(dataUri);
//     setShowStatementCamera(false);
//     getStatementLocation();
//   };

//   const handleStatementFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setStatementImage(reader.result);
//         getStatementLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getStatementLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setStatementLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set statement capturedDateTime to the current date and time
//           setStatementCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting statement location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (statementImage && statementLocation) {
//       const image = new Image();

//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         // Set canvas dimensions to match the captured image
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Draw the captured image onto the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";

//         // Add relevant information to be displayed on the image
//         // Adjust the content based on your requirements
//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${statementLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${statementLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${statementCapturedDateTime}`;

//         context.font = "bold 14px Arial"; // Set bold font
//         context.fillText(sNoText, 20, image.height - 140); // Place at the top
//         context.font = "14px Arial"; // Reset font

//         context.fillText(latitudeText, 10, image.height - 120);
//         context.fillText(longitudeText, 10, image.height - 100);
//         context.fillText(farmerNameText, 10, image.height - 80);
//         context.fillText(farmerNameTitleText, 10, image.height - 60);
//         context.fillText(dateTimeText, 10, image.height - 40);

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setStatementImage(dataURL);
//       };

//       image.src = statementImage;
//     }
//   }, [
//     statementImage,
//     statementLocation,
//     farmerFieldId,
//     statementCapturedDateTime,
//   ]);

//   return (
//     <StatementCaptureContainer id="statementCaptureContainer">
//       <ButtonContainer>
//         <CameraButton onClick={handleOpenStatementCamera}>
//           <FaCamera />
//         </CameraButton>
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleStatementFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {showStatementCamera && (
//         <StatementCameraView
//           onCapture={handleCaptureStatement}
//           onClose={handleStatementCameraClose}
//         />
//       )}

//       {statementImage && statementLocation ? (
//         <FarmerStatementPreview imageUrl={statementImage} />
//       ) : (
//         <StatementPhotoText>Empty</StatementPhotoText>
//       )}
//     </StatementCaptureContainer>
//   );
// };

// export default FarmerStatementCapture;

//////////////////////old
// // FarmerStatementCapture.js
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";

// import StatementCameraView from "../CamStore/StatementCameraView "; // Adjust the path accordingly

// const FarmerStatementCapture = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   statementImage,
//   setStatementImage,
// }) => {
//   const [showStatementCamera, setShowStatementCamera] = useState(false);
//   const [statementLocation, setStatementLocation] = useState(null);
//   const [statementCapturedDateTime, setStatementCapturedDateTime] =
//     useState(null);

//   const handleOpenStatementCamera = () => {
//     setShowStatementCamera(true);
//   };

//   const handleStatementCameraClose = () => {
//     setShowStatementCamera(false);
//   };

//   const handleCaptureStatement = (dataUri) => {
//     setStatementImage(dataUri);
//     setShowStatementCamera(false);
//     getStatementLocation();
//   };

//   const handleStatementFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setStatementImage(reader.result);
//         getStatementLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getStatementLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setStatementLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set statement capturedDateTime to the current date and time
//           setStatementCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting statement location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (statementImage && statementLocation) {
//       const image = new Image();

//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         // Set canvas dimensions to match the captured image
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Draw the captured image onto the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";

//         // Add relevant information to be displayed on the image
//         // Adjust the content based on your requirements
//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${statementLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${statementLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${statementCapturedDateTime}`;

//         context.font = "bold 14px Arial"; // Set bold font
//         context.fillText(sNoText, 20, image.height - 140); // Place at the top
//         context.font = "14px Arial"; // Reset font

//         context.fillText(latitudeText, 10, image.height - 120);
//         context.fillText(longitudeText, 10, image.height - 100);
//         context.fillText(farmerNameText, 10, image.height - 80);
//         context.fillText(farmerNameTitleText, 10, image.height - 60);
//         context.fillText(dateTimeText, 10, image.height - 40);

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setStatementImage(dataURL);
//       };

//       image.src = statementImage;
//     }
//   }, [
//     statementImage,
//     statementLocation,
//     farmerFieldId,
//     statementCapturedDateTime,
//   ]);

//   return (
//     <div>
//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button onClick={handleOpenStatementCamera}>
//           Open Farmer Statement Camera
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleStatementFileUpload}
//         />
//       </div>

//       {showStatementCamera && (
//         <StatementCameraView
//           onCapture={handleCaptureStatement}
//           onClose={handleStatementCameraClose}
//         />
//       )}

//       {/* Render the preview of the captured image */}
//       <div>
//         {statementImage && statementLocation && (
//           <img
//             src={statementImage}
//             alt="Statement Captured"
//             style={{ maxWidth: "100%" }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FarmerStatementCapture;
