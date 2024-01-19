import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SubsidyCameraView from "../CamStore/SubsidyCameraView";
import { FaCamera, FaFile } from "react-icons/fa";

const SubsidyContainer = styled.div`
  background-color: #dfdfdf;
  padding: 10px;
  border-bottom: 2px solid gray;
`;

const FarmerSubsidyPreview = styled.div`
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

const SubsidyPhotoText = styled.p`
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

const FarmerSubsidySection = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
  farmerNameTitle,
  farmerFather,
  farmerName,
  setSubsidyImage,
}) => {
  const [farmerSubsidyImage, setFarmerSubsidyImage] = useState(null);
  const [showSubsidyCamera, setShowSubsidyCamera] = useState(false);
  const [subsidyLocation, setSubsidyLocation] = useState(null);
  const [subsidyCapturedDateTime, setSubsidyCapturedDateTime] = useState(null);

  const handleOpenSubsidyCamera = () => {
    setShowSubsidyCamera(true);
  };

  const handleSubsidyCameraClose = () => {
    setShowSubsidyCamera(false);
  };

  const handleCaptureSubsidy = (dataUri) => {
    setFarmerSubsidyImage(dataUri);
    setShowSubsidyCamera(false);
    getSubsidyLocation();
  };

  const handleSubsidyFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmerSubsidyImage(reader.result);
        getSubsidyLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getSubsidyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setSubsidyLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set subsidy capturedDateTime to the current date and time
          setSubsidyCapturedDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting subsidy location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (farmerSubsidyImage && subsidyLocation) {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match the captured image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the captured image onto the canvas
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the table onto the canvas
        context.font = "14px Arial";
        context.fillStyle = "white";

        const sNoText = `Farmer S/No : ${farmerFieldId}`;
        const latitudeText = `Latitude   : ${subsidyLocation?.latitude.toFixed(
          7
        )}`;
        const longitudeText = `Longitude : ${subsidyLocation?.longitude.toFixed(
          7
        )}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${subsidyCapturedDateTime}`;

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
        setFarmerSubsidyImage(dataURL);
        setSubsidyImage(dataURL);
      };

      image.src = farmerSubsidyImage;
    }
  }, [
    farmerSubsidyImage,
    subsidyLocation,
    farmerName,
    farmerFather,
    farmerNameTitle,
    subsidyCapturedDateTime,
  ]);

  return (
    <SubsidyContainer id="subsidyContainer">
      <Headp>Subsidy Neft Copy</Headp>
      <ButtonContainer>
        <CameraButton onClick={handleOpenSubsidyCamera}>
          <FaCamera />
        </CameraButton>
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="image/*"
            onChange={handleSubsidyFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {showSubsidyCamera && (
        <SubsidyCameraView
          onCapture={handleCaptureSubsidy}
          onClose={handleSubsidyCameraClose}
        />
      )}
      {farmerSubsidyImage && subsidyLocation && (
        <FarmerSubsidyPreview
          imageUrl={farmerSubsidyImage}
        ></FarmerSubsidyPreview>
      )}
      {farmerSubsidyImage ? null : <SubsidyPhotoText>Empty</SubsidyPhotoText>}
    </SubsidyContainer>
  );
};

export default FarmerSubsidySection;

/////////////////////////////////////////////////////////////old
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";

// import SubsidyCameraView from "../CamStore/SubsidyCameraView";

// const PopupFormContainer = styled.div`
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

// const FileUploadButton = styled.button`
//   background-color: #278fe6;
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

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
//   margin-top: 410px;
//   margin-bottom: 200px;
// `;

// const Button = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const CloseButton = styled(Button)`
//   background-color: #e74c3c;
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

// const FarmerBankPassbookPreview = styled.div`
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

// const ChallanPhotoPreview = styled.div`
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
// const TableContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
// `;

// const TableRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 10px;
// `;

// const TableCellLabel = styled.span`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const TableCellData = styled.span`
//   font-size: 14px;
// `;

// const FarmerSubsidyCts = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   setSubsidyImage,
// }) => {
//   // ... (previously defined states and functions)

//   // Farmer Subsidy Section
//   const [farmerSubsidyImage, setFarmerSubsidyImage] = useState(null);
//   const [showSubsidyCamera, setShowSubsidyCamera] = useState(false);
//   const [subsidyLocation, setSubsidyLocation] = useState(null);
//   const [subsidyCapturedDateTime, setSubsidyCapturedDateTime] = useState(null);

//   const handleOpenSubsidyCamera = () => {
//     setShowSubsidyCamera(true);
//   };

//   const handleSubsidyCameraClose = () => {
//     setShowSubsidyCamera(false);
//   };

//   const handleCaptureSubsidy = (dataUri) => {
//     setFarmerSubsidyImage(dataUri);
//     setShowSubsidyCamera(false);
//     getSubsidyLocation();
//   };

//   const handleSubsidyFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFarmerSubsidyImage(reader.result);
//         getSubsidyLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getSubsidyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setSubsidyLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set subsidy capturedDateTime to the current date and time
//           setSubsidyCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting subsidy location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (farmerSubsidyImage && subsidyLocation) {
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

//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${subsidyLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${subsidyLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${subsidyCapturedDateTime}`;

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
//         setFarmerSubsidyImage(dataURL);
//         setSubsidyImage(dataURL);
//       };

//       image.src = farmerSubsidyImage;
//     }
//   }, [
//     farmerSubsidyImage,
//     subsidyLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     subsidyCapturedDateTime,
//   ]);

//   return (
//     <div>
//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button onClick={handleOpenSubsidyCamera}>
//           Open Farmer Subsidy Camera
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleSubsidyFileUpload}
//         />
//       </div>

//       {showSubsidyCamera && (
//         <SubsidyCameraView
//           onCapture={handleCaptureSubsidy}
//           onClose={handleSubsidyCameraClose}
//         />
//       )}
//       <TableContainer>
//         {farmerSubsidyImage && subsidyLocation && (
//           <FarmerPhotoPrview imageUrl={farmerSubsidyImage}></FarmerPhotoPrview>
//         )}
//       </TableContainer>
//     </div>
//   );
// };

// export default FarmerSubsidyCts;
