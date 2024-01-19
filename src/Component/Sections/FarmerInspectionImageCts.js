import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import styled from "styled-components";
import { FaCamera, FaFile } from "react-icons/fa";
import InspectionCameraView from "../CamStore/InspectionCameraView";

const InspectionContainer = styled.div`
  background-color: #dfdfdf;
  padding: 10px;
  border-bottom: 2px solid gray;
`;

const FarmerInspectionPreview = styled.div`
  max-width: 150px;
  height: 130px;
  background-color: #2ecc71;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-top: -81px;
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

const InspectionPhotoText = styled.p`
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

const FarmerInspectionImageCts = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
  farmerNameTitle,
  farmerFather,
  farmerName,
  setInspectionImage,
  setFInspectionImage,
}) => {
  const [farmerInspectionImage, setFarmerInspectionImage] = useState(null);
  const [showInspectionCamera, setShowInspectionCamera] = useState(false);
  const [inspectionLocation, setInspectionLocation] = useState(null);
  const [inspectionCapturedDateTime, setInspectionCapturedDateTime] =
    useState(null);

  const handleOpenInspectionCamera = () => {
    setShowInspectionCamera(true);
  };

  const handleInspectionCameraClose = () => {
    setShowInspectionCamera(false);
  };

  const handleCaptureInspection = (dataUri) => {
    setFarmerInspectionImage(dataUri);
    setShowInspectionCamera(false);
    getInspectionLocation();
  };

  const handleInspectionFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmerInspectionImage(reader.result);
        getInspectionLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getInspectionLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setInspectionLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set inspection capturedDateTime to the current date and time
          setInspectionCapturedDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting inspection location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (farmerInspectionImage && inspectionLocation) {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match the captured image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the captured image onto the canvas
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the table onto the canvas with a beautiful border
        context.strokeStyle = "#3498db"; // Set border color
        context.lineWidth = 2; // Set border width

        // Draw the border around the table
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = "14px Arial";
        context.fillStyle = "white";

        // Add your table data here (similar to other sections)
        const sNoText = `Farmer S/No : ${farmerFieldId}`;
        const latitudeText = `Latitude   : ${inspectionLocation?.latitude.toFixed(
          7
        )}`;
        const longitudeText = `Longitude : ${inspectionLocation?.longitude.toFixed(
          7
        )}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${inspectionCapturedDateTime}`;

        context.font = "bold 14px Arial"; // Set bold font
        context.fillText(sNoText, 20, image.height - 140); // Place at the top
        context.font = "14px Arial"; // Reset font

        context.fillText(latitudeText, 10, image.height - 120);
        context.fillText(longitudeText, 10, image.height - 100);
        context.fillText(farmerNameText, 10, image.height - 80);
        context.fillText(farmerNameTitleText, 10, image.height - 60);
        context.fillText(dateTimeText, 10, image.height - 40);

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL("image/jpeg");
        setFarmerInspectionImage(dataURL);
        setFInspectionImage(dataURL);
      };

      image.src = farmerInspectionImage;
    }
  }, [
    farmerInspectionImage,
    inspectionLocation,
    farmerName,
    farmerFather,
    farmerNameTitle,
    inspectionCapturedDateTime,
  ]);

  return (
    <InspectionContainer id="inspectionContainer">
      <Headp>Pre Inspection Photo</Headp>
      <ButtonContainer>
        <CameraButton onClick={handleOpenInspectionCamera}>
          <FaCamera />
        </CameraButton>
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="image/*"
            onChange={handleInspectionFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {showInspectionCamera && (
        <InspectionCameraView
          onCapture={handleCaptureInspection}
          onClose={handleInspectionCameraClose}
        />
      )}
      {farmerInspectionImage && inspectionLocation && (
        <FarmerInspectionPreview
          imageUrl={farmerInspectionImage}
        ></FarmerInspectionPreview>
      )}
      {farmerInspectionImage ? null : (
        <InspectionPhotoText>Empty</InspectionPhotoText>
      )}
    </InspectionContainer>
  );
};

export default FarmerInspectionImageCts;

//////////////////////////////==============Old
// // FarmerInspectionImageCts.js
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";

// import InspectionCameraView from "../CamStore/InspectionCameraView";

// const TableContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
//   border: 2px solid #3498db; // Border style
//   border-radius: 8px; // Border radius
//   overflow: hidden;
// `;
// const FarmerPhotoPrview = styled.div`
//   width: 100%;
//   max-width: 200px;
//   height: 180px;
//   background-color: #2ecc71;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 20px auto;
// `;

// const FarmerInspectionImageCts = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   setInspectionImage,
//   setFInspectionImage,
// }) => {
//   const [farmerInspectionImage, setFarmerInspectionImage] = useState(null);
//   const [showInspectionCamera, setShowInspectionCamera] = useState(false);
//   const [inspectionLocation, setInspectionLocation] = useState(null);
//   const [inspectionCapturedDateTime, setInspectionCapturedDateTime] =
//     useState(null);

//   const handleOpenInspectionCamera = () => {
//     setShowInspectionCamera(true);
//   };

//   const handleInspectionCameraClose = () => {
//     setShowInspectionCamera(false);
//   };

//   const handleCaptureInspection = (dataUri) => {
//     setFarmerInspectionImage(dataUri);
//     setShowInspectionCamera(false);
//     getInspectionLocation();
//   };

//   const handleInspectionFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFarmerInspectionImage(reader.result);
//         getInspectionLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getInspectionLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setInspectionLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set inspection capturedDateTime to the current date and time
//           setInspectionCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting inspection location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (farmerInspectionImage && inspectionLocation) {
//       const image = new Image();

//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         // Set canvas dimensions to match the captured image
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Draw the captured image onto the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas with a beautiful border
//         context.strokeStyle = "#3498db"; // Set border color
//         context.lineWidth = 2; // Set border width

//         // Draw the border around the table
//         context.strokeRect(0, 0, canvas.width, canvas.height);

//         context.font = "14px Arial";
//         context.fillStyle = "white";

//         // Add your table data here (similar to other sections)
//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${inspectionLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${inspectionLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${inspectionCapturedDateTime}`;

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
//         setFarmerInspectionImage(dataURL);
//         setFInspectionImage(dataURL);
//       };

//       image.src = farmerInspectionImage;
//     }
//   }, [
//     farmerInspectionImage,
//     inspectionLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     inspectionCapturedDateTime,
//   ]);

//   return (
//     <div>
//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button onClick={handleOpenInspectionCamera}>
//           Open Farmer Inspection Camera
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleInspectionFileUpload}
//         />
//       </div>

//       {showInspectionCamera && (
//         <InspectionCameraView
//           onCapture={handleCaptureInspection}
//           onClose={handleInspectionCameraClose}
//         />
//       )}
//       <TableContainer>
//         {farmerInspectionImage && inspectionLocation && (
//           <FarmerPhotoPrview
//             imageUrl={farmerInspectionImage}
//           ></FarmerPhotoPrview>
//         )}
//       </TableContainer>
//     </div>
//   );
// };

// export default FarmerInspectionImageCts;
