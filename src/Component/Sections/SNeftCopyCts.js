import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import styled from "styled-components";
import { FaCamera, FaFile } from "react-icons/fa";
import SNeftCopyCameraView from "../CamStore/SNeftCopyCameraView";

const SNeftCopyContainer = styled.div`
  background-color: #f3f3f3ed;
  padding: 10px;
  border-bottom: 2px solid gray;
`;

const FarmerSNeftCopyPreview = styled.div`
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

const SNeftCopyPhotoText = styled.p`
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

const SNeftCopyCts = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
  farmerNameTitle,
  farmerFather,
  farmerName,
  setSNeftCopyImage,
  setNeftCopyImage,
}) => {
  const [farmerSNeftCopyImage, setFarmerSNeftCopyImage] = useState(null);
  const [showSNeftCopyCamera, setShowSNeftCopyCamera] = useState(false);
  const [sNeftCopyLocation, setSNeftCopyLocation] = useState(null);
  const [sNeftCopyCapturedDateTime, setSNeftCopyCapturedDateTime] =
    useState(null);

  const handleOpenSNeftCopyCamera = () => {
    setShowSNeftCopyCamera(true);
  };

  const handleSNeftCopyCameraClose = () => {
    setShowSNeftCopyCamera(false);
  };

  const handleSNeftCopyCapture = (dataUri) => {
    setFarmerSNeftCopyImage(dataUri);
    setShowSNeftCopyCamera(false);
    getSNeftCopyLocation();
  };

  const handleSNeftCopyFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmerSNeftCopyImage(reader.result);
        getSNeftCopyLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getSNeftCopyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setSNeftCopyLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set SNeftCopy capturedDateTime to the current date and time
          setSNeftCopyCapturedDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting SNeftCopy location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (farmerSNeftCopyImage && sNeftCopyLocation) {
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

        // Add your table data here (similar to the FarmerSubsidyCts section)
        const sNoText = `Farmer S/No : ${farmerFieldId}`;
        const latitudeText = `Latitude   : ${sNeftCopyLocation?.latitude.toFixed(
          7
        )}`;
        const longitudeText = `Longitude : ${sNeftCopyLocation?.longitude.toFixed(
          7
        )}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${sNeftCopyCapturedDateTime}`;

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
        setFarmerSNeftCopyImage(dataURL);
        setNeftCopyImage(dataURL);
      };

      image.src = farmerSNeftCopyImage;
    }
  }, [
    farmerSNeftCopyImage,
    sNeftCopyLocation,
    farmerName,
    farmerFather,
    farmerNameTitle,
    sNeftCopyCapturedDateTime,
  ]);

  return (
    <SNeftCopyContainer id="sNeftCopyContainer">
      <Headp>Subsidy Neft Copy</Headp>
      <ButtonContainer>
        <CameraButton onClick={handleOpenSNeftCopyCamera}>
          <FaCamera />
        </CameraButton>
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="image/*"
            onChange={handleSNeftCopyFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {showSNeftCopyCamera && (
        <SNeftCopyCameraView
          onCapture={handleSNeftCopyCapture}
          onClose={handleSNeftCopyCameraClose}
        />
      )}
      {farmerSNeftCopyImage && sNeftCopyLocation && (
        <FarmerSNeftCopyPreview
          imageUrl={farmerSNeftCopyImage}
        ></FarmerSNeftCopyPreview>
      )}
      {farmerSNeftCopyImage ? null : (
        <SNeftCopyPhotoText>Empty</SNeftCopyPhotoText>
      )}
    </SNeftCopyContainer>
  );
};

export default SNeftCopyCts;

/////////////////////old one

// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";

// import SNeftCopyCameraView from "../CamStore/SNeftCopyCameraView";

// // Add other styled components if needed
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

// const SNeftCopyCts = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
//   setSNeftCopyImage,
//   setNeftCopyImage,
// }) => {
//   // SNeftCopy Section States
//   const [farmerSNeftCopyImage, setFarmerSNeftCopyImage] = useState(null);
//   const [showSNeftCopyCamera, setShowSNeftCopyCamera] = useState(false);
//   const [sNeftCopyLocation, setSNeftCopyLocation] = useState(null);
//   const [sNeftCopyCapturedDateTime, setSNeftCopyCapturedDateTime] =
//     useState(null);

//   const handleOpenSNeftCopyCamera = () => {
//     setShowSNeftCopyCamera(true);
//   };

//   const handleSNeftCopyCameraClose = () => {
//     setShowSNeftCopyCamera(false);
//   };

//   const handleSNeftCopyCapture = (dataUri) => {
//     setFarmerSNeftCopyImage(dataUri);
//     setShowSNeftCopyCamera(false);
//     getSNeftCopyLocation();
//   };

//   const handleSNeftCopyFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFarmerSNeftCopyImage(reader.result);
//         getSNeftCopyLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getSNeftCopyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setSNeftCopyLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set SNeftCopy capturedDateTime to the current date and time
//           setSNeftCopyCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting SNeftCopy location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (farmerSNeftCopyImage && sNeftCopyLocation) {
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

//         // Add your table data here (similar to the FarmerSubsidyCts section)
//         const sNoText = `Farmer S/No : ${farmerFieldId}`;
//         const latitudeText = `Latitude   : ${sNeftCopyLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${sNeftCopyLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${sNeftCopyCapturedDateTime}`;

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
//         setFarmerSNeftCopyImage(dataURL);
//         setNeftCopyImage(dataURL);
//       };

//       image.src = farmerSNeftCopyImage;
//     }
//   }, [
//     farmerSNeftCopyImage,
//     sNeftCopyLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     sNeftCopyCapturedDateTime,
//   ]);

//   return (
//     <div>
//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button onClick={handleOpenSNeftCopyCamera}>
//           Open SNeftCopy Camera
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleSNeftCopyFileUpload}
//         />
//       </div>
//       {showSNeftCopyCamera && (
//         <SNeftCopyCameraView
//           onCapture={handleSNeftCopyCapture}
//           onClose={handleSNeftCopyCameraClose}
//         />
//       )}
//       <TableContainer>
//         {farmerSNeftCopyImage && sNeftCopyLocation && (
//           <FarmerPhotoPrview
//             imageUrl={farmerSNeftCopyImage}
//           ></FarmerPhotoPrview>
//         )}
//       </TableContainer>
//     </div>
//   );
// };

// export default SNeftCopyCts;
