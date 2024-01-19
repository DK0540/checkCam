import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import { MdCameraswitch } from "react-icons/md";
import CameraView from "./CamStore/CameraView";
import axios from "axios";
import "./PopupForm.css";
import BankPassbookCameraView from "./CamStore/BankPassbookCameraView";
import ChallanCameraView from "./CamStore/ChallanCameraView";
import FarmerSubsidyCts from "./Sections/FarmerSubsidyCts";
import SNeftCopyCts from "./Sections/SNeftCopyCts";
import FarmerInspectionImageCts from "./Sections/FarmerInspectionImageCts";
import FarmerFilterImage from "./Sections/FarmerFilterImage";
import FarmerPipeImageCts from "./Sections/FarmerPipeImageCts";

import FarmerStatementCapture from "./Sections/FarmerStatementvcaptre";
import img11 from "../Component/assets/vbnlogo2.jpg";
import FarmerPhotoSection from "./Sections/FarmerPhotoSection";
import BankPassbookSection from "./Sections/BankPassbookSection";
import FarmerChallanSection from "./Sections/FarmerChallanSection";

const PopupFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const PopupFormContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: black;
  margin-top: 1180px;
  margin-bottom: 200px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  background-color: #e74c3c;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const PopupForm = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
  farmerNameTitle,
  farmerFather,
  farmerName,
}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState(null);
  const [farmerPhoto, setFarmerPhoto] = useState(null);
  const [capturedDateTime, setCapturedDateTime] = useState(null);

  //passbook states
  const [bankPassbookImage, setBankPassbookImage] = useState(null);
  const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
  const [bankPassbookLocation, setBankPassbookLocation] = useState(null);
  const [bankPassbookCapturedDateTime, setBankPassbookCapturedDateTime] =
    useState(null);

  //bank challen states
  const [challanImage, setChallanImage] = useState(null);
  const [showChallanCamera, setShowChallanCamera] = useState(false);
  const [challanLocation, setChallanLocation] = useState(null);
  const [capturedChallanDateTime, setCapturedChallanDateTime] = useState(null);
  //external states images
  const [subsidyImage, setSubsidyImage] = useState(null);
  const [neftCopyImage, setNeftCopyImage] = useState(null);
  const [fInspectionImage, setFInspectionImage] = useState(null);
  const [farmerFilterImage, setFarmerFilterImage] = useState(null);
  const [farmerPipeImage, setFarmerPipeImage] = useState(null);
  const [statementImage, setStatementImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);

  // alert(`token:${token},  device_uuid:${device_uuid}`);
  //===================================>>>functions related to farmer photo sections
  const handleCapture = (dataUri) => {
    setCapturedImage(dataUri);
    setShowCamera(false);

    // Get current location after capturing the image
    getCurrentLocation();
  };

  const handleRetake = () => {
    setShowCamera(true);
    setCapturedImage(null);
    setLocation(null);
    setFarmerPhoto(null);
    setCapturedDateTime(null); // Reset capturedDateTime when retaking the photo
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result); // Update capturedImage with the uploaded image
        getCurrentLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set capturedDateTime to the current date and time
          setCapturedDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (capturedImage && location) {
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
        const latitudeText = `Latitude   : ${location?.latitude.toFixed(7)}`;
        const longitudeText = `Longitude : ${location?.longitude.toFixed(7)}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${capturedDateTime}`;

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
        setFarmerPhoto(dataURL);
      };

      image.src = capturedImage;
    }
  }, [
    capturedImage,
    location,
    farmerName,
    farmerFather,
    farmerNameTitle,
    capturedDateTime,
  ]);

  //=================end farmer photo section functions
  //=====================================================>>functions related to bank passbook section
  const handleBankPassbookCapture = (dataUri) => {
    setBankPassbookImage(dataUri);
    setShowBankPassbookCamera(false);
    getBankPassbookLocation();
  };

  const handleBankPassbookRetake = () => {
    setShowBankPassbookCamera(true);
    setBankPassbookImage(null);
    setBankPassbookLocation(null);
    setBankPassbookCapturedDateTime(null);
  };

  const handleBankPassbookOpenCamera = () => {
    setShowBankPassbookCamera(true);
  };

  const handleBankPassbookCameraClose = () => {
    setShowBankPassbookCamera(false);
  };

  const handleBankPassbookFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBankPassbookImage(reader.result);
        getBankPassbookLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getBankPassbookLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setBankPassbookLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set bank passbook capturedDateTime to the current date and time
          setBankPassbookCapturedDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting bank passbook location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (bankPassbookImage && bankPassbookLocation) {
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
        const latitudeText = `Latitude   : ${bankPassbookLocation?.latitude.toFixed(
          7
        )}`;
        const longitudeText = `Longitude : ${bankPassbookLocation?.longitude.toFixed(
          7
        )}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${bankPassbookCapturedDateTime}`;

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
        setBankPassbookImage(dataURL);
      };

      image.src = bankPassbookImage;
    }
  }, [
    bankPassbookImage,
    bankPassbookLocation,
    farmerName,
    farmerFather,
    farmerNameTitle,
    bankPassbookCapturedDateTime,
  ]);
  //===================>>end passbook section related functions
  //====================>>functions related to farmer bank chalen section

  // Add these functions for the Bank Challan section
  const handleCaptureChallan = (dataUri) => {
    setChallanImage(dataUri);
    setShowChallanCamera(false);
    getCurrentChallanLocation();
  };

  const handleRetakeChallan = () => {
    setShowChallanCamera(true);
    setChallanImage(null);
    setChallanLocation(null);
    setCapturedChallanDateTime(null);
  };

  const handleOpenChallanCamera = () => {
    setShowChallanCamera(true);
  };

  const handleChallanCameraClose = () => {
    setShowChallanCamera(false);
  };

  const handleChallanFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChallanImage(reader.result);
        getCurrentChallanLocation(); // Update to the function for Challan location
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentChallanLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setChallanLocation({ latitude, longitude });
          console.log(`Challan Latitude: ${latitude}, Longitude: ${longitude}`);

          // Set capturedChallanDateTime to the current date and time
          setCapturedChallanDateTime(new Date().toLocaleString());
        },
        (error) => {
          console.error("Error getting challan location:", error.message);
        }
      );
    } else {
      console.error(
        "Geolocation is not supported for challan by this browser."
      );
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (challanImage && challanLocation) {
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
        const latitudeText = `Latitude   : ${challanLocation?.latitude.toFixed(
          7
        )}`;
        const longitudeText = `Longitude : ${challanLocation?.longitude.toFixed(
          7
        )}`;
        const farmerNameText = `Farmer :  ${farmerName}`;
        const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
        const dateTimeText = `Captured on: ${capturedChallanDateTime}`;

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
        setChallanImage(dataURL);
      };

      image.src = challanImage;
    }
  }, [
    challanImage,
    challanLocation,
    farmerName,
    farmerFather,
    farmerNameTitle,
    capturedChallanDateTime,
  ]);

  //server connection

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("farmer_id", farmerId);
      formData.append("farmer_field_id", farmerFieldId);

      // Convert the data URI to a Blob and append to form data if not null or empty
      if (farmerPhoto) {
        const base64Data = farmerPhoto.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append("farmer_photo", blob, "farmer_photo.jpg");
      }
      // Convert the bank passbook data URI to a Blob and append to form data if not null or empty

      if (bankPassbookImage) {
        const bankPassbookBase64 = bankPassbookImage.split(",")[1];
        const bankPassbookBlob = b64toBlob(bankPassbookBase64);
        formData.append(
          "farmer_bank_passbook",
          bankPassbookBlob,
          "farmer_bank_passbook.jpg"
        );
      }

      // Convert the data URI to a Blob and append to form data if not null or empty
      if (challanImage) {
        const base64Data = challanImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_bank_challan_copy",
          blob,
          "farmer_bank_challan_copy.jpg"
        );
      }

      // Convert the data URI to a Blob and append to form data if not null or empty
      if (subsidyImage) {
        const base64Data = subsidyImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append("farmer_subsidy_cts", blob, "farmer_subsidy_cts.jpg");
      }

      if (neftCopyImage) {
        const base64Data = neftCopyImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_subsidy_neft_copy",
          blob,
          "farmer_subsidy_neft_copy.jpg"
        );
      }

      if (fInspectionImage) {
        const base64Data = fInspectionImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_pre_inspection_photo",
          blob,
          "farmer_pre_inspection_photo.jpg"
        );
      }

      if (farmerFilterImage) {
        const base64Data = farmerFilterImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_post_inspection_photo_with_filter",
          blob,
          "farmer_post_inspection_photo_with_filter.jpg"
        );
      }

      if (farmerPipeImage) {
        const base64Data = farmerPipeImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_post_inspection_photo_with_pipe",
          blob,
          "farmer_post_inspection_photo_with_pipe.jpg"
        );
      }

      if (statementImage) {
        const base64Data = statementImage.split(",")[1];
        const blob = b64toBlob(base64Data);
        formData.append(
          "farmer_statement_video",
          blob,
          "farmer_statement_video.jpg"
        );
      }

      const response = await axios.post(
        "https://sfamsserver.in/api/admin/farmer-doc/save",
        formData,
        {
          headers: {
            device_uuid: device_uuid,
            token: token,
          },
        }
      );

      console.log("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error.message);
    } finally {
      onClose();
    }
  };

  // Helper function to convert base64 to Blob
  const b64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/jpeg" });
  };

  return (
    <>
      <PopupFormContainer>
        <PopupFormContent>
          <div style={{ marginBottom: 10 }}>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </div>
          <FarmerPhotoSection
            handleOpenCamera={handleOpenCamera}
            handleFileUpload={handleFileUpload}
            showCamera={showCamera}
            capturedImage={capturedImage}
            location={location}
            farmerPhoto={farmerPhoto}
            CameraView={CameraView}
            handleCapture={handleCapture}
            handleCameraClose={handleCameraClose}
            TableContainer={TableContainer}
          />

          {/*farmer Bank Passbook Section */}

          <BankPassbookSection
            handleBankPassbookOpenCamera={handleBankPassbookOpenCamera}
            handleBankPassbookFileUpload={handleBankPassbookFileUpload}
            showBankPassbookCamera={showBankPassbookCamera}
            handleBankPassbookCapture={handleBankPassbookCapture}
            handleBankPassbookCameraClose={handleBankPassbookCameraClose}
            bankPassbookImage={bankPassbookImage}
            TableContainer={TableContainer}
            bankPassbookLocation={bankPassbookLocation}
          />

          {/*farmer Bank Passbook Section End */}
          {/* Farmer Challan Section */}

          <FarmerChallanSection
            handleOpenChallanCamera={handleOpenChallanCamera}
            handleChallanFileUpload={handleChallanFileUpload}
            showChallanCamera={showChallanCamera}
            capturedImage={capturedImage}
            challanImage={challanImage}
            handleCaptureChallan={handleCaptureChallan}
            handleChallanCameraClose={handleChallanCameraClose}
            challanLocation={challanLocation}
          />

          {/* Farmer SubsidyCts Section */}
          {/* Farmer Subsidy Section */}
          <FarmerSubsidyCts
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
            setSubsidyImage={setSubsidyImage}
          />
          {/* SNeftCopy Section */}
          <SNeftCopyCts
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
            setNeftCopyImage={setNeftCopyImage}
          />

          {/* Farmer Inspection section*/}

          <FarmerInspectionImageCts
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
            setFInspectionImage={setFInspectionImage}
          />

          {/* Farmer filter Image section*/}
          <FarmerFilterImage
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            setFarmerFilterImage={setFarmerFilterImage}
            farmerFilterImage={farmerFilterImage}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
          />

          {/* Farmer Pipe Image section*/}
          <FarmerPipeImageCts
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
            farmerPipeImage={farmerPipeImage}
            setFarmerPipeImage={setFarmerPipeImage}
          />
          {/* Farmer Video Image section*/}
          <FarmerStatementCapture
            onClose={onClose}
            farmerId={farmerId}
            farmerFieldId={farmerFieldId}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={farmerNameTitle}
            farmerFather={farmerFather}
            farmerName={farmerName}
            statementImage={statementImage}
            setStatementImage={setStatementImage}
            capturedVideo={capturedVideo}
            setCapturedVideo={setCapturedVideo}
          />

          <>
            <Button onClick={handleSave}>Submit</Button>
          </>
        </PopupFormContent>
      </PopupFormContainer>
    </>
  );
};

export default PopupForm;

//////////////////////////////////////////////////////////////////////////////////
// /////////////////working uploading video////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";
// import { MdCameraswitch } from "react-icons/md";
// import CameraView from "./CamStore/CameraView";
// import axios from "axios";
// import "./PopupForm.css";
// import BankPassbookCameraView from "./CamStore/BankPassbookCameraView";
// import ChallanCameraView from "./CamStore/ChallanCameraView";
// import FarmerSubsidyCts from "./Sections/FarmerSubsidyCts";
// import SNeftCopyCts from "./Sections/SNeftCopyCts";
// import FarmerInspectionImageCts from "./Sections/FarmerInspectionImageCts";
// import FarmerFilterImage from "./Sections/FarmerFilterImage";
// import FarmerPipeImageCts from "./Sections/FarmerPipeImageCts";

// import FarmerStatementCapture from "./Sections/FarmerStatementvcaptre";
// import img11 from "../Component/assets/vbnlogo2.jpg";
// import FarmerPhotoSection from "./Sections/FarmerPhotoSection";
// import BankPassbookSection from "./Sections/BankPassbookSection";
// import FarmerChallanSection from "./Sections/FarmerChallanSection";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
//   margin-top: 1180px;
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

// const TableContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);
//   const [capturedDateTime, setCapturedDateTime] = useState(null);

//   //passbook states
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);
//   const [bankPassbookCapturedDateTime, setBankPassbookCapturedDateTime] =
//     useState(null);

//   //bank challen states
//   const [challanImage, setChallanImage] = useState(null);
//   const [showChallanCamera, setShowChallanCamera] = useState(false);
//   const [challanLocation, setChallanLocation] = useState(null);
//   const [capturedChallanDateTime, setCapturedChallanDateTime] = useState(null);
//   //external states images
//   const [subsidyImage, setSubsidyImage] = useState(null);
//   const [neftCopyImage, setNeftCopyImage] = useState(null);
//   const [fInspectionImage, setFInspectionImage] = useState(null);
//   const [farmerFilterImage, setFarmerFilterImage] = useState(null);
//   const [farmerPipeImage, setFarmerPipeImage] = useState(null);
//   const [statementImage, setStatementImage] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);

//   // alert(`token:${token},  device_uuid:${device_uuid}`);
//   //===================================>>>functions related to farmer photo sections
//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null);
//     setFarmerPhoto(null);
//     setCapturedDateTime(null); // Reset capturedDateTime when retaking the photo
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleCameraClose = () => {
//     setShowCamera(false);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         getCurrentLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set capturedDateTime to the current date and time
//           setCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (capturedImage && location) {
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
//         const latitudeText = `Latitude   : ${location?.latitude.toFixed(7)}`;
//         const longitudeText = `Longitude : ${location?.longitude.toFixed(7)}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${capturedDateTime}`;

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
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [
//     capturedImage,
//     location,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     capturedDateTime,
//   ]);

//   //=================end farmer photo section functions
//   //=====================================================>>functions related to bank passbook section
//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getBankPassbookLocation();
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//     setBankPassbookCapturedDateTime(null);
//   };

//   const handleBankPassbookOpenCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         getBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set bank passbook capturedDateTime to the current date and time
//           setBankPassbookCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting bank passbook location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
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
//         const latitudeText = `Latitude   : ${bankPassbookLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${bankPassbookLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${bankPassbookCapturedDateTime}`;

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
//         setBankPassbookImage(dataURL);
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [
//     bankPassbookImage,
//     bankPassbookLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     bankPassbookCapturedDateTime,
//   ]);
//   //===================>>end passbook section related functions
//   //====================>>functions related to farmer bank chalen section

//   // Add these functions for the Bank Challan section
//   const handleCaptureChallan = (dataUri) => {
//     setChallanImage(dataUri);
//     setShowChallanCamera(false);
//     getCurrentChallanLocation();
//   };

//   const handleRetakeChallan = () => {
//     setShowChallanCamera(true);
//     setChallanImage(null);
//     setChallanLocation(null);
//     setCapturedChallanDateTime(null);
//   };

//   const handleOpenChallanCamera = () => {
//     setShowChallanCamera(true);
//   };

//   const handleChallanCameraClose = () => {
//     setShowChallanCamera(false);
//   };

//   const handleChallanFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setChallanImage(reader.result);
//         getCurrentChallanLocation(); // Update to the function for Challan location
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCurrentChallanLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setChallanLocation({ latitude, longitude });
//           console.log(`Challan Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set capturedChallanDateTime to the current date and time
//           setCapturedChallanDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting challan location:", error.message);
//         }
//       );
//     } else {
//       console.error(
//         "Geolocation is not supported for challan by this browser."
//       );
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (challanImage && challanLocation) {
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
//         const latitudeText = `Latitude   : ${challanLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${challanLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${capturedChallanDateTime}`;

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
//         setChallanImage(dataURL);
//       };

//       image.src = challanImage;
//     }
//   }, [
//     challanImage,
//     challanLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     capturedChallanDateTime,
//   ]);

//   //server connection
//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       // ... (other form data)

//       let capturedVideoFile = null;

//       if (capturedVideo) {
//         // Convert the captured video to a Blob
//         const blob = await fetch(capturedVideo).then((res) => res.blob());
//         // Create a File object from the Blob
//         capturedVideoFile = new File([blob], "farmer_statement_video.mp4");
//         formData.append("farmer_statement_video", capturedVideoFile);
//       }

//       const response = await axios.post(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         formData,
//         {
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//         }
//       );

//       console.log("Video uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading video:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>
//           <FarmerPhotoSection
//             handleOpenCamera={handleOpenCamera}
//             handleFileUpload={handleFileUpload}
//             showCamera={showCamera}
//             capturedImage={capturedImage}
//             location={location}
//             farmerPhoto={farmerPhoto}
//             CameraView={CameraView}
//             handleCapture={handleCapture}
//             handleCameraClose={handleCameraClose}
//             TableContainer={TableContainer}
//           />

//           {/*farmer Bank Passbook Section */}

//           <BankPassbookSection
//             handleBankPassbookOpenCamera={handleBankPassbookOpenCamera}
//             handleBankPassbookFileUpload={handleBankPassbookFileUpload}
//             showBankPassbookCamera={showBankPassbookCamera}
//             handleBankPassbookCapture={handleBankPassbookCapture}
//             handleBankPassbookCameraClose={handleBankPassbookCameraClose}
//             bankPassbookImage={bankPassbookImage}
//             TableContainer={TableContainer}
//             bankPassbookLocation={bankPassbookLocation}
//           />

//           {/*farmer Bank Passbook Section End */}
//           {/* Farmer Challan Section */}

//           <FarmerChallanSection
//             handleOpenChallanCamera={handleOpenChallanCamera}
//             handleChallanFileUpload={handleChallanFileUpload}
//             showChallanCamera={showChallanCamera}
//             capturedImage={capturedImage}
//             challanImage={challanImage}
//             handleCaptureChallan={handleCaptureChallan}
//             handleChallanCameraClose={handleChallanCameraClose}
//             challanLocation={challanLocation}
//           />

//           {/* Farmer SubsidyCts Section */}
//           {/* Farmer Subsidy Section */}
//           <FarmerSubsidyCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setSubsidyImage={setSubsidyImage}
//           />
//           {/* SNeftCopy Section */}
//           <SNeftCopyCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setNeftCopyImage={setNeftCopyImage}
//           />

//           {/* Farmer Inspection section*/}

//           <FarmerInspectionImageCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setFInspectionImage={setFInspectionImage}
//           />

//           {/* Farmer filter Image section*/}
//           <FarmerFilterImage
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             setFarmerFilterImage={setFarmerFilterImage}
//             farmerFilterImage={farmerFilterImage}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//           />

//           {/* Farmer Pipe Image section*/}
//           <FarmerPipeImageCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             farmerPipeImage={farmerPipeImage}
//             setFarmerPipeImage={setFarmerPipeImage}
//           />
//           {/* Farmer Video Image section*/}
//           <FarmerStatementCapture
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             statementImage={statementImage}
//             setStatementImage={setStatementImage}
//             capturedVideo={capturedVideo}
//             setCapturedVideo={setCapturedVideo}
//           />

//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

// /////////////////working uploading video////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";
// import { MdCameraswitch } from "react-icons/md";
// import CameraView from "./CamStore/CameraView";
// import axios from "axios";
// import "./PopupForm.css";
// import BankPassbookCameraView from "./CamStore/BankPassbookCameraView";
// import ChallanCameraView from "./CamStore/ChallanCameraView";
// import FarmerSubsidyCts from "./Sections/FarmerSubsidyCts";
// import SNeftCopyCts from "./Sections/SNeftCopyCts";
// import FarmerInspectionImageCts from "./Sections/FarmerInspectionImageCts";
// import FarmerFilterImage from "./Sections/FarmerFilterImage";
// import FarmerPipeImageCts from "./Sections/FarmerPipeImageCts";

// import FarmerStatementCapture from "./Sections/FarmerStatementvcaptre";
// import img11 from "../Component/assets/vbnlogo2.jpg";
// import FarmerPhotoSection from "./Sections/FarmerPhotoSection";
// import BankPassbookSection from "./Sections/BankPassbookSection";
// import FarmerChallanSection from "./Sections/FarmerChallanSection";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
//   margin-top: 1180px;
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

// const TableContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 20px;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
//   farmerNameTitle,
//   farmerFather,
//   farmerName,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);
//   const [capturedDateTime, setCapturedDateTime] = useState(null);

//   //passbook states
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);
//   const [bankPassbookCapturedDateTime, setBankPassbookCapturedDateTime] =
//     useState(null);

//   //bank challen states
//   const [challanImage, setChallanImage] = useState(null);
//   const [showChallanCamera, setShowChallanCamera] = useState(false);
//   const [challanLocation, setChallanLocation] = useState(null);
//   const [capturedChallanDateTime, setCapturedChallanDateTime] = useState(null);
//   //external states images
//   const [subsidyImage, setSubsidyImage] = useState(null);
//   const [neftCopyImage, setNeftCopyImage] = useState(null);
//   const [fInspectionImage, setFInspectionImage] = useState(null);
//   const [farmerFilterImage, setFarmerFilterImage] = useState(null);
//   const [farmerPipeImage, setFarmerPipeImage] = useState(null);
//   const [statementImage, setStatementImage] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);

//   // alert(`token:${token},  device_uuid:${device_uuid}`);
//   //===================================>>>functions related to farmer photo sections
//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null);
//     setFarmerPhoto(null);
//     setCapturedDateTime(null); // Reset capturedDateTime when retaking the photo
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleCameraClose = () => {
//     setShowCamera(false);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         getCurrentLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set capturedDateTime to the current date and time
//           setCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (capturedImage && location) {
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
//         const latitudeText = `Latitude   : ${location?.latitude.toFixed(7)}`;
//         const longitudeText = `Longitude : ${location?.longitude.toFixed(7)}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${capturedDateTime}`;

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
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [
//     capturedImage,
//     location,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     capturedDateTime,
//   ]);

//   //=================end farmer photo section functions
//   //=====================================================>>functions related to bank passbook section
//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getBankPassbookLocation();
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//     setBankPassbookCapturedDateTime(null);
//   };

//   const handleBankPassbookOpenCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         getBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set bank passbook capturedDateTime to the current date and time
//           setBankPassbookCapturedDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting bank passbook location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
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
//         const latitudeText = `Latitude   : ${bankPassbookLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${bankPassbookLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${bankPassbookCapturedDateTime}`;

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
//         setBankPassbookImage(dataURL);
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [
//     bankPassbookImage,
//     bankPassbookLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     bankPassbookCapturedDateTime,
//   ]);
//   //===================>>end passbook section related functions
//   //====================>>functions related to farmer bank chalen section

//   // Add these functions for the Bank Challan section
//   const handleCaptureChallan = (dataUri) => {
//     setChallanImage(dataUri);
//     setShowChallanCamera(false);
//     getCurrentChallanLocation();
//   };

//   const handleRetakeChallan = () => {
//     setShowChallanCamera(true);
//     setChallanImage(null);
//     setChallanLocation(null);
//     setCapturedChallanDateTime(null);
//   };

//   const handleOpenChallanCamera = () => {
//     setShowChallanCamera(true);
//   };

//   const handleChallanCameraClose = () => {
//     setShowChallanCamera(false);
//   };

//   const handleChallanFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setChallanImage(reader.result);
//         getCurrentChallanLocation(); // Update to the function for Challan location
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const getCurrentChallanLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setChallanLocation({ latitude, longitude });
//           console.log(`Challan Latitude: ${latitude}, Longitude: ${longitude}`);

//           // Set capturedChallanDateTime to the current date and time
//           setCapturedChallanDateTime(new Date().toLocaleString());
//         },
//         (error) => {
//           console.error("Error getting challan location:", error.message);
//         }
//       );
//     } else {
//       console.error(
//         "Geolocation is not supported for challan by this browser."
//       );
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (challanImage && challanLocation) {
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
//         const latitudeText = `Latitude   : ${challanLocation?.latitude.toFixed(
//           7
//         )}`;
//         const longitudeText = `Longitude : ${challanLocation?.longitude.toFixed(
//           7
//         )}`;
//         const farmerNameText = `Farmer :  ${farmerName}`;
//         const farmerNameTitleText = `${farmerNameTitle} : ${farmerFather}`;
//         const dateTimeText = `Captured on: ${capturedChallanDateTime}`;

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
//         setChallanImage(dataURL);
//       };

//       image.src = challanImage;
//     }
//   }, [
//     challanImage,
//     challanLocation,
//     farmerName,
//     farmerFather,
//     farmerNameTitle,
//     capturedChallanDateTime,
//   ]);

//   //server connection
//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       // ... (other form data)

//       let capturedVideoFile = null;

//       if (capturedVideo) {
//         // Convert the captured video to a Blob
//         const blob = await fetch(capturedVideo).then((res) => res.blob());
//         // Create a File object from the Blob
//         capturedVideoFile = new File([blob], "farmer_statement_video.mp4");
//         formData.append("farmer_statement_video", capturedVideoFile);
//       }

//       const response = await axios.post(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         formData,
//         {
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//         }
//       );

//       console.log("Video uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading video:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   ////////////
//   // const handleSave = async () => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("farmer_id", farmerId);
//   //     formData.append("farmer_field_id", farmerFieldId);

//   //     // ... (other form data)

//   //     let capturedVideoData = null;

//   //     if (capturedVideo) {
//   //       const videoParts = capturedVideo.split(",");
//   //       if (videoParts.length === 2) {
//   //         capturedVideoData = videoParts[1].replace(/\s/g, "");
//   //         formData.append("farmer_statement_video", capturedVideoData);
//   //       } else {
//   //         console.error("Invalid captured video format");
//   //       }
//   //     }

//   //     const response = await axios.post(
//   //       "https://sfamsserver.in/api/admin/farmer-doc/save",
//   //       formData,
//   //       {
//   //         headers: {
//   //           device_uuid: device_uuid,
//   //           token: token,
//   //         },
//   //       }
//   //     );

//   //     console.log("Video uploaded successfully");
//   //   } catch (error) {
//   //     console.error("Error uploading video:", error.message);
//   //   } finally {
//   //     onClose();
//   //   }
//   // };

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>
//           <FarmerPhotoSection
//             handleOpenCamera={handleOpenCamera}
//             handleFileUpload={handleFileUpload}
//             showCamera={showCamera}
//             capturedImage={capturedImage}
//             location={location}
//             farmerPhoto={farmerPhoto}
//             CameraView={CameraView}
//             handleCapture={handleCapture}
//             handleCameraClose={handleCameraClose}
//             TableContainer={TableContainer}
//           />

//           {/*farmer Bank Passbook Section */}

//           <BankPassbookSection
//             handleBankPassbookOpenCamera={handleBankPassbookOpenCamera}
//             handleBankPassbookFileUpload={handleBankPassbookFileUpload}
//             showBankPassbookCamera={showBankPassbookCamera}
//             handleBankPassbookCapture={handleBankPassbookCapture}
//             handleBankPassbookCameraClose={handleBankPassbookCameraClose}
//             bankPassbookImage={bankPassbookImage}
//             TableContainer={TableContainer}
//             bankPassbookLocation={bankPassbookLocation}
//           />

//           {/*farmer Bank Passbook Section End */}
//           {/* Farmer Challan Section */}

//           <FarmerChallanSection
//             handleOpenChallanCamera={handleOpenChallanCamera}
//             handleChallanFileUpload={handleChallanFileUpload}
//             showChallanCamera={showChallanCamera}
//             capturedImage={capturedImage}
//             challanImage={challanImage}
//             handleCaptureChallan={handleCaptureChallan}
//             handleChallanCameraClose={handleChallanCameraClose}
//             challanLocation={challanLocation}
//           />

//           {/* Farmer SubsidyCts Section */}
//           {/* Farmer Subsidy Section */}
//           <FarmerSubsidyCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setSubsidyImage={setSubsidyImage}
//           />
//           {/* SNeftCopy Section */}
//           <SNeftCopyCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setNeftCopyImage={setNeftCopyImage}
//           />

//           {/* Farmer Inspection section*/}

//           <FarmerInspectionImageCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             setFInspectionImage={setFInspectionImage}
//           />

//           {/* Farmer filter Image section*/}
//           <FarmerFilterImage
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             setFarmerFilterImage={setFarmerFilterImage}
//             farmerFilterImage={farmerFilterImage}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//           />

//           {/* Farmer Pipe Image section*/}
//           <FarmerPipeImageCts
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             farmerPipeImage={farmerPipeImage}
//             setFarmerPipeImage={setFarmerPipeImage}
//           />
//           {/* Farmer Video Image section*/}
//           <FarmerStatementCapture
//             onClose={onClose}
//             farmerId={farmerId}
//             farmerFieldId={farmerFieldId}
//             device_uuid={device_uuid}
//             token={token}
//             farmerNameTitle={farmerNameTitle}
//             farmerFather={farmerFather}
//             farmerName={farmerName}
//             statementImage={statementImage}
//             setStatementImage={setStatementImage}
//             capturedVideo={capturedVideo}
//             setCapturedVideo={setCapturedVideo}
//           />

//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
