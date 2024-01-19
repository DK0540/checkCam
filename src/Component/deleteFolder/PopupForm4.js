import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

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
const FileUploadButton = styled.button`
  background-color: #278fe6;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  height: 30px;
  font-size: 10px;
  width: 72px;
`;

const CameraButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  height: 30px;
  font-size: 10px;
  width: 72px;
`;

// const FormData = styled.div`
//   background-color: #d1f1d1;
//   padding: 10px;
//   border-radius: 8px;
//   width: 350px;
//   color: black;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-family: initial;
`;

const CapturedFarmerPhoto = styled.div`
  background-color: black;
  padding: 10px;
  border-radius: 8px;
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const PopupFormContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: black;
  margin-top: 410px;
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
const FarmerPhotoPrview = styled.div`
  width: 100%;
  max-width: 200px;
  height: 180px;
  background-color: #2ecc71;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 20px auto;
`;

const FarmerBankPassbookPreview = styled.div`
  width: 100%;
  max-width: 200px;
  height: 180px;
  background-color: #f1c40f;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 20px auto;
`;

const FarmerBankChallanCopyPreview = styled.div`
  width: 100%;
  max-width: 200px;
  height: 180px;
  background-color: #ff5733;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 20px auto;
`;

const PopupForm = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [location, setLocation] = useState(null);
  const [farmerPhoto, setFarmerPhoto] = useState(null);

  const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
  const [bankPassbookImage, setBankPassbookImage] = useState(null);
  const [bankPassbookLocation, setBankPassbookLocation] = useState(null);

  const [showBankChallanCopyCamera, setShowBankChallanCopyCamera] =
    useState(false);
  const [farmerBankChallanCopyImage, setFarmerBankChallanCopyImage] =
    useState(null);
  const [farmerBankChallanCopyLocation, setFarmerBankChallanCopyLocation] =
    useState(null);
  //========================================>>Passbook functions1

  useEffect(() => {
    if (!showBankPassbookCamera) {
      setBankPassbookImage(bankPassbookImage);
      getCurrentBankPassbookLocation(bankPassbookLocation);
    }
  }, [showBankPassbookCamera]);

  const handleBankPassbookCapture = (dataUri) => {
    setBankPassbookImage(dataUri);
    setShowBankPassbookCamera(false);
    getCurrentBankPassbookLocation(); // Get location after capturing the image
  };

  const handleBankPassbookRetake = () => {
    setShowBankPassbookCamera(true);
    setBankPassbookImage(null);
    setBankPassbookLocation(null);
  };
  const handleBankPassbookCameraClose = () => {
    setShowBankPassbookCamera(false);
    setBankPassbookImage(null);
    setBankPassbookLocation(null);
  };

  const getCurrentBankPassbookLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setBankPassbookLocation({ latitude, longitude });
          console.log(
            `Bank Passbook Latitude: ${latitude}, Longitude: ${longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleOpenBankPassbookCamera = () => {
    setShowBankPassbookCamera(true);
  };

  const handleBankPassbookFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBankPassbookImage(reader.result);
        // Get current location after uploading the image
        getCurrentBankPassbookLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (bankPassbookImage && bankPassbookLocation) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the captured image
      canvas.width = 400; // Adjust the width as needed
      canvas.height = 300; // Adjust the height as needed

      // Draw the captured image onto the canvas
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the table onto the canvas
        context.font = "14px Arial";
        context.fillStyle = "white";
        context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
        context.fillText(
          `Latitude: ${bankPassbookLocation?.latitude.toFixed(6)}`,
          10,
          40
        );
        context.fillText(
          `Longitude: ${bankPassbookLocation?.longitude.toFixed(6)}`,
          10,
          60
        );

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL("image/jpeg");
        setBankPassbookImage(dataURL); // Set the new dataURL instead of original bankPassbookImage
      };

      image.src = bankPassbookImage;
    }
  }, [bankPassbookImage, bankPassbookLocation, farmerId]);

  //===========================================>>>pasbook functions2

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
    setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the captured image
      canvas.width = 400; // Adjust the width as needed
      canvas.height = 300; // Adjust the height as needed

      // Draw the captured image onto the canvas
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the table onto the canvas
        context.font = "14px Arial";
        context.fillStyle = "white";
        context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
        context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
        context.fillText(
          `Longitude: ${location?.longitude.toFixed(6)}`,
          10,
          60
        );

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL("image/jpeg");
        setFarmerPhoto(dataURL);
      };

      image.src = capturedImage;
    }
  }, [capturedImage, location, farmerId]);
  //=============================chaln section
  useEffect(() => {
    if (!showBankChallanCopyCamera) {
      setFarmerBankChallanCopyImage(farmerBankChallanCopyImage);
      getCurrentBankChallanCopyLocation(farmerBankChallanCopyLocation);
    }
  }, [showBankChallanCopyCamera]);

  const handleBankChallanCopyCapture = (dataUri) => {
    setFarmerBankChallanCopyImage(dataUri);
    setShowBankChallanCopyCamera(false);
    getCurrentBankChallanCopyLocation(); // Get location after capturing the image
  };

  const handleBankChallanCopyRetake = () => {
    setShowBankChallanCopyCamera(true);
    setFarmerBankChallanCopyImage(null);
    setFarmerBankChallanCopyLocation(null);
  };

  const handleBankChallanCopyCameraClose = () => {
    setShowBankChallanCopyCamera(false);
    setFarmerBankChallanCopyImage(null);
    setFarmerBankChallanCopyLocation(null);
  };

  const getCurrentBankChallanCopyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setFarmerBankChallanCopyLocation({ latitude, longitude });
          console.log(
            `Bank FarmerBank chalan Latitude: ${latitude}, Longitude: ${longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleOpenBankChallanCopyCamera = () => {
    setShowBankChallanCopyCamera(true);
  };

  const handleBankChallanCopyFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmerBankChallanCopyImage(reader.result);
        // Get current location after uploading the image
        getCurrentBankChallanCopyLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Combine the captured image and table into a single image
    if (farmerBankChallanCopyImage && farmerBankChallanCopyLocation) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the captured image
      canvas.width = 400; // Adjust the width as needed
      canvas.height = 300; // Adjust the height as needed

      // Draw the captured image onto the canvas
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the table onto the canvas
        context.font = "14px Arial";
        context.fillStyle = "white";
        context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
        context.fillText(
          `Latitude: ${farmerBankChallanCopyLocation?.latitude.toFixed(6)}`,
          10,
          40
        );
        context.fillText(
          `Longitude: ${farmerBankChallanCopyLocation?.longitude.toFixed(6)}`,
          10,
          60
        );

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL("image/jpeg");
        setFarmerBankChallanCopyImage(dataURL);
      };

      image.src = farmerBankChallanCopyImage;
    }
  }, [farmerBankChallanCopyImage, farmerBankChallanCopyLocation, farmerId]);

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
      //chalan data blob conversion
      if (farmerBankChallanCopyImage) {
        const farmerBankChallanCopyImage64 =
          farmerBankChallanCopyImage.split(",")[1];
        const farmerBankChallanCopyImageBlob = b64toBlob(
          farmerBankChallanCopyImage64
        );
        formData.append(
          "farmer_bank_challan_copy",
          farmerBankChallanCopyImageBlob,
          "farmer_bank_challan_copy.jpg"
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

          {/* Farmer Photo Section */}
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
          {showCamera && (
            <>
              <Camera
                isImageMirror={false}
                onTakePhoto={(dataUri) => handleCapture(dataUri)}
              />
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <Button onClick={handleRetake}>
                  <AiOutlineCamera /> Retake
                </Button>
                <Button onClick={handleCameraClose}>Close</Button>
              </div>
            </>
          )}
          <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

          {/* Bank Passbook Section */}
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <button onClick={handleOpenBankPassbookCamera}>
              Open Bank Passbook Camera
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleBankPassbookFileUpload}
            />
          </div>
          {showBankPassbookCamera && (
            <>
              <Camera
                isImageMirror={false}
                onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
              />
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <Button onClick={handleBankPassbookRetake}>
                  <AiOutlineCamera /> Retake
                </Button>
                <Button onClick={handleBankPassbookCameraClose}>Close</Button>
              </div>
            </>
          )}
          <FarmerBankPassbookPreview
            imageUrl={bankPassbookImage}
          ></FarmerBankPassbookPreview>
          {/* Bank Challan Copy Section */}
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <button onClick={handleOpenBankChallanCopyCamera}>
              Open Bank Challan Copy Camera
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleBankChallanCopyFileUpload}
            />
          </div>
          {showBankChallanCopyCamera && (
            <>
              <Camera
                isImageMirror={false}
                onTakePhoto={(dataUri) => handleBankChallanCopyCapture(dataUri)}
              />
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <Button onClick={handleBankChallanCopyRetake}>
                  <AiOutlineCamera /> Retake
                </Button>
                <Button onClick={handleBankChallanCopyCameraClose}>
                  Close
                </Button>
              </div>
            </>
          )}
          <FarmerBankChallanCopyPreview
            imageUrl={farmerBankChallanCopyImage}
          ></FarmerBankChallanCopyPreview>
          <>
            <Button onClick={handleSave}>Submit</Button>
          </>
        </PopupFormContent>
      </PopupFormContainer>
    </>
  );
};

export default PopupForm;

//==========================================================>>two images uploding
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";
// import axios from "axios";

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

// // const FormData = styled.div`
// //   background-color: #d1f1d1;
// //   padding: 10px;
// //   border-radius: 8px;
// //   width: 350px;
// //   color: black;
// //   display: flex;
// //   gap: 10px;
// //   justify-content: center;
// //   align-items: center;
// //   margin-bottom: 10px;
// // `;

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
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
//   background-color: #f1c40f;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 20px auto;
// `;

// const FarmerBankChallanCopyPreview = styled.div`
//   width: 100%;
//   max-width: 200px;
//   height: 180px;
//   background-color: #ff5733;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 20px auto;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);

//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);

//   const [showBankChallanCopyCamera, setShowBankChallanCopyCamera] =
//     useState(false);
//   const [farmerBankChallanCopyImage, setFarmerBankChallanCopyImage] =
//     useState(null);
//   const [farmerBankChallanCopyLocation, setFarmerBankChallanCopyLocation] =
//     useState(null);
//   //========================================>>Passbook functions1

//   useEffect(() => {
//     if (!showBankPassbookCamera) {
//       setBankPassbookImage(bankPassbookImage);
//       getCurrentBankPassbookLocation(bankPassbookLocation);
//     }
//   }, [showBankPassbookCamera]);

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getCurrentBankPassbookLocation(); // Get location after capturing the image
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };
//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };

//   const getCurrentBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(
//             `Bank Passbook Latitude: ${latitude}, Longitude: ${longitude}`
//           );
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOpenBankPassbookCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         // Get current location after uploading the image
//         getCurrentBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(
//           `Latitude: ${bankPassbookLocation?.latitude.toFixed(6)}`,
//           10,
//           40
//         );
//         context.fillText(
//           `Longitude: ${bankPassbookLocation?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setBankPassbookImage(dataURL); // Set the new dataURL instead of original bankPassbookImage
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, bankPassbookLocation, farmerId]);

//   //===========================================>>>pasbook functions2

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
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
//         context.fillText(
//           `Longitude: ${location?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [capturedImage, location, farmerId]);

//   //server connection

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       // Convert the data URI to a Blob and append to form data if not null or empty
//       if (farmerPhoto) {
//         const base64Data = farmerPhoto.split(",")[1];
//         const blob = b64toBlob(base64Data);
//         formData.append("farmer_photo", blob, "farmer_photo.jpg");
//       }

//       // Convert the bank passbook data URI to a Blob and append to form data if not null or empty
//       if (bankPassbookImage) {
//         const bankPassbookBase64 = bankPassbookImage.split(",")[1];
//         const bankPassbookBlob = b64toBlob(bankPassbookBase64);
//         formData.append(
//           "farmer_bank_passbook",
//           bankPassbookBlob,
//           "farmer_bank_passbook.jpg"
//         );
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

//       console.log("Images uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   // Helper function to convert base64 to Blob
//   const b64toBlob = (base64Data) => {
//     const byteCharacters = atob(base64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);

//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     return new Blob(byteArrays, { type: "image/jpeg" });
//   };

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {/* Farmer Photo Section */}
//           <div style={{ marginBottom: 20, textAlign: "center" }}>
//             <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//           </div>
//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10, textAlign: "center" }}>
//                 <Button onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleCameraClose}>Close</Button>
//               </div>
//             </>
//           )}
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           {/* Bank Passbook Section */}
//           <div style={{ marginBottom: 20, textAlign: "center" }}>
//             <button onClick={handleOpenBankPassbookCamera}>
//               Open Bank Passbook Camera
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBankPassbookFileUpload}
//             />
//           </div>
//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10, textAlign: "center" }}>
//                 <Button onClick={handleBankPassbookRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleBankPassbookCameraClose}>Close</Button>
//               </div>
//             </>
//           )}
//           <FarmerBankPassbookPreview
//             imageUrl={bankPassbookImage}
//           ></FarmerBankPassbookPreview>

//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//=================================================>>In the below code image saving successfully.
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import axios from "axios";

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

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);

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
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
//         context.fillText(
//           `Longitude: ${location?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [capturedImage, location, farmerId]);

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       // Convert the data URI to a Blob
//       const base64Data = farmerPhoto.split(",")[1];
//       const blob = b64toBlob(base64Data);

//       // Append the Blob to the form data
//       formData.append("farmer_photo", blob, "farmer_photo.jpg");

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

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   // Helper function to convert base64 to Blob
//   const b64toBlob = (base64Data) => {
//     const byteCharacters = atob(base64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);

//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     return new Blob(byteArrays, { type: "image/jpeg" });
//   };

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {/* Farmer Photo Section */}
//           <div style={{ marginBottom: 20, textAlign: "center" }}>
//             <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//           </div>
//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10, textAlign: "center" }}>
//                 <Button onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleCameraClose}>Close</Button>
//               </div>
//             </>
//           )}
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           {/* Save Button */}
//           {capturedImage && (
// <>
//   <Button onClick={handleSave}>Submit</Button>
// </>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//========================>>Server conection *************************************************>>>
// ///////////////////////////////////////////////////////===========>>Scrolling done
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";

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

// const FormData = styled.div`
//   background-color: #d1f1d1;
//   padding: 10px;
//   border-radius: 8px;
//   width: 350px;
//   color: black;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
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
//   background-color: #f1c40f;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 20px auto;
// `;

// const FarmerBankChallanCopyPreview = styled.div`
//   width: 100%;
//   max-width: 200px;
//   height: 180px;
//   background-color: #ff5733;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 20px auto;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);

//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);

//   const [showBankChallanCopyCamera, setShowBankChallanCopyCamera] =
//     useState(false);
//   const [farmerBankChallanCopyImage, setFarmerBankChallanCopyImage] =
//     useState(null);
//   const [farmerBankChallanCopyLocation, setFarmerBankChallanCopyLocation] =
//     useState(null);
//   //========================================>>Passbook functions1

//   useEffect(() => {
//     if (!showBankPassbookCamera) {
//       setBankPassbookImage(bankPassbookImage);
//       getCurrentBankPassbookLocation(bankPassbookLocation);
//     }
//   }, [showBankPassbookCamera]);

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getCurrentBankPassbookLocation(); // Get location after capturing the image
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };
//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };

//   const getCurrentBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(
//             `Bank Passbook Latitude: ${latitude}, Longitude: ${longitude}`
//           );
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOpenBankPassbookCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         // Get current location after uploading the image
//         getCurrentBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(
//           `Latitude: ${bankPassbookLocation?.latitude.toFixed(6)}`,
//           10,
//           40
//         );
//         context.fillText(
//           `Longitude: ${bankPassbookLocation?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setBankPassbookImage(dataURL); // Set the new dataURL instead of original bankPassbookImage
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, bankPassbookLocation, farmerId]);

//   //===========================================>>>pasbook functions2

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
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
//         context.fillText(
//           `Longitude: ${location?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [capturedImage, location, farmerId]);

//   //===============================================bank chalan functions here

// useEffect(() => {
//   if (!showBankChallanCopyCamera) {
//     setFarmerBankChallanCopyImage(farmerBankChallanCopyImage);
//     getCurrentBankChallanCopyLocation(farmerBankChallanCopyLocation);
//   }
// }, [showBankChallanCopyCamera]);

// const handleBankChallanCopyCapture = (dataUri) => {
//   setFarmerBankChallanCopyImage(dataUri);
//   setShowBankChallanCopyCamera(false);
//   getCurrentBankChallanCopyLocation(); // Get location after capturing the image
// };

// const handleBankChallanCopyRetake = () => {
//   setShowBankChallanCopyCamera(true);
//   setFarmerBankChallanCopyImage(null);
//   setFarmerBankChallanCopyLocation(null);
// };

// const handleBankChallanCopyCameraClose = () => {
//   setShowBankChallanCopyCamera(false);
//   setFarmerBankChallanCopyImage(null);
//   setFarmerBankChallanCopyLocation(null);
// };

// const getCurrentBankChallanCopyLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         setFarmerBankChallanCopyLocation({ latitude, longitude });
//         console.log(
//           `Bank FarmerBank chalan Latitude: ${latitude}, Longitude: ${longitude}`
//         );
//       },
//       (error) => {
//         console.error("Error getting location:", error.message);
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
// };

// const handleOpenBankChallanCopyCamera = () => {
//   setShowBankChallanCopyCamera(true);
// };

// const handleBankChallanCopyFileUpload = (event) => {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFarmerBankChallanCopyImage(reader.result);
//       // Get current location after uploading the image
//       getCurrentBankChallanCopyLocation();
//     };
//     reader.readAsDataURL(file);
//   }
// };

// useEffect(() => {
//   // Combine the captured image and table into a single image
//   if (farmerBankChallanCopyImage && farmerBankChallanCopyLocation) {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     // Set canvas dimensions to match the captured image
//     canvas.width = 400; // Adjust the width as needed
//     canvas.height = 300; // Adjust the height as needed

//     // Draw the captured image onto the canvas
//     const image = new Image();
//     image.onload = () => {
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);

//       // Draw the table onto the canvas
//       context.font = "14px Arial";
//       context.fillStyle = "white";
//       context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//       context.fillText(
//         `Latitude: ${farmerBankChallanCopyLocation?.latitude.toFixed(6)}`,
//         10,
//         40
//       );
//       context.fillText(
//         `Longitude: ${farmerBankChallanCopyLocation?.longitude.toFixed(6)}`,
//         10,
//         60
//       );

//       // Convert the canvas content to a data URL
//       const dataURL = canvas.toDataURL("image/jpeg");
//       setFarmerBankChallanCopyImage(dataURL);
//     };

//     image.src = farmerBankChallanCopyImage;
//   }
// }, [farmerBankChallanCopyImage, farmerBankChallanCopyLocation, farmerId]);

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {/* Farmer Photo Section */}
//           <div style={{ marginBottom: 20, textAlign: "center" }}>
//             <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//           </div>
//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10, textAlign: "center" }}>
//                 <Button onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleCameraClose}>Close</Button>
//               </div>
//             </>
//           )}
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           {/* Bank Passbook Section */}
//           <div style={{ marginBottom: 20, textAlign: "center" }}>
//             <button onClick={handleOpenBankPassbookCamera}>
//               Open Bank Passbook Camera
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBankPassbookFileUpload}
//             />
//           </div>
//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10, textAlign: "center" }}>
//                 <Button onClick={handleBankPassbookRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleBankPassbookCameraClose}>Close</Button>
//               </div>
//             </>
//           )}
//           <FarmerBankPassbookPreview
//             imageUrl={bankPassbookImage}
//           ></FarmerBankPassbookPreview>

// {/* Bank Challan Copy Section */}
// <div style={{ marginBottom: 20, textAlign: "center" }}>
//   <button onClick={handleOpenBankChallanCopyCamera}>
//     Open Bank Challan Copy Camera
//   </button>
//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleBankChallanCopyFileUpload}
//   />
// </div>
// {showBankChallanCopyCamera && (
//   <>
//     <Camera
//       isImageMirror={false}
//       onTakePhoto={(dataUri) => handleBankChallanCopyCapture(dataUri)}
//     />
//     <div style={{ marginTop: 10, textAlign: "center" }}>
//       <Button onClick={handleBankChallanCopyRetake}>
//         <AiOutlineCamera /> Retake
//       </Button>
//       <Button onClick={handleBankChallanCopyCameraClose}>
//         Close
//       </Button>
//     </div>
//   </>
// )}
// <FarmerBankChallanCopyPreview
//   imageUrl={farmerBankChallanCopyImage}
// ></FarmerBankChallanCopyPreview>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

// ///////////////////////////////////////////////////////below code is completed all
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";

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

// const FormData = styled.div`
//   background-color: #d1f1d1;
//   padding: 10px;
//   border-radius: 8px;
//   width: 350px;
//   color: black;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
// `;

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
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
//   width: 200px;
//   height: 180px;
//   background-color: #2ecc71; /* Green background color */
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 0 auto;
//   margin-top: 20px;
// `;

// //farmerpassbook
// const FarmerBankPassbookPreview = styled.div`
//   width: 200px;
//   height: 180px;
//   background-color: #f1c40f; /* Yellow background color */
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 0 auto;
//   margin-top: 20px;
// `;

// const FarmerBankChallanCopyPreview = styled.div`
//   width: 200px;
//   height: 180px;
//   background-color: #ff5733; /* Some other color for Bank Challan Copy */
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 0 auto;
//   margin-top: 20px;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);

//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);

//   const [showBankChallanCopyCamera, setShowBankChallanCopyCamera] =
//     useState(false);
//   const [farmerBankChallanCopyImage, setFarmerBankChallanCopyImage] =
//     useState(null);
//   const [farmerBankChallanCopyLocation, setFarmerBankChallanCopyLocation] =
//     useState(null);
//   //========================================>>Passbook functions1

//   useEffect(() => {
//     if (!showBankPassbookCamera) {
//       setBankPassbookImage(bankPassbookImage);
//       getCurrentBankPassbookLocation(bankPassbookLocation);
//     }
//   }, [showBankPassbookCamera]);

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getCurrentBankPassbookLocation(); // Get location after capturing the image
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };
//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };

//   const getCurrentBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(
//             `Bank Passbook Latitude: ${latitude}, Longitude: ${longitude}`
//           );
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOpenBankPassbookCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         // Get current location after uploading the image
//         getCurrentBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(
//           `Latitude: ${bankPassbookLocation?.latitude.toFixed(6)}`,
//           10,
//           40
//         );
//         context.fillText(
//           `Longitude: ${bankPassbookLocation?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setBankPassbookImage(dataURL); // Set the new dataURL instead of original bankPassbookImage
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, bankPassbookLocation, farmerId]);

//   //===========================================>>>pasbook functions2

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
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
//         context.fillText(
//           `Longitude: ${location?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [capturedImage, location, farmerId]);

//   //===============================================bank chalan functions here

//   useEffect(() => {
//     if (!showBankChallanCopyCamera) {
//       setFarmerBankChallanCopyImage(farmerBankChallanCopyImage);
//       getCurrentBankChallanCopyLocation(farmerBankChallanCopyLocation);
//     }
//   }, [showBankChallanCopyCamera]);

//   const handleBankChallanCopyCapture = (dataUri) => {
//     setFarmerBankChallanCopyImage(dataUri);
//     setShowBankChallanCopyCamera(false);
//     getCurrentBankChallanCopyLocation(); // Get location after capturing the image
//   };

//   const handleBankChallanCopyRetake = () => {
//     setShowBankChallanCopyCamera(true);
//     setFarmerBankChallanCopyImage(null);
//     setFarmerBankChallanCopyLocation(null);
//   };

//   const handleBankChallanCopyCameraClose = () => {
//     setShowBankChallanCopyCamera(false);
//     setFarmerBankChallanCopyImage(null);
//     setFarmerBankChallanCopyLocation(null);
//   };

//   const getCurrentBankChallanCopyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setFarmerBankChallanCopyLocation({ latitude, longitude });
//           console.log(
//             `Bank FarmerBank chalan Latitude: ${latitude}, Longitude: ${longitude}`
//           );
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOpenBankChallanCopyCamera = () => {
//     setShowBankChallanCopyCamera(true);
//   };

//   const handleBankChallanCopyFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFarmerBankChallanCopyImage(reader.result);
//         // Get current location after uploading the image
//         getCurrentBankChallanCopyLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (farmerBankChallanCopyImage && farmerBankChallanCopyLocation) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(
//           `Latitude: ${farmerBankChallanCopyLocation?.latitude.toFixed(6)}`,
//           10,
//           40
//         );
//         context.fillText(
//           `Longitude: ${farmerBankChallanCopyLocation?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerBankChallanCopyImage(dataURL);
//       };

//       image.src = farmerBankChallanCopyImage;
//     }
//   }, [farmerBankChallanCopyImage, farmerBankChallanCopyLocation, farmerId]);

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <Button onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleCameraClose}>Close</Button>
//               </div>
//             </>
//           )}

//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenBankPassbookCamera}>
//               Open Bank Passbook Camera
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBankPassbookFileUpload}
//             />
//           </div>
//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <Button onClick={handleBankPassbookRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleBankPassbookCameraClose}>Close</Button>
//               </div>
//             </>
//           )}

//           <FarmerBankPassbookPreview
//             imageUrl={bankPassbookImage}
//           ></FarmerBankPassbookPreview>

//           {/*chalan section*/}
//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenBankChallanCopyCamera}>
//               Open Bank Challan Copy Camera
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBankChallanCopyFileUpload}
//             />
//           </div>
//           {showBankChallanCopyCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankChallanCopyCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <Button onClick={handleBankChallanCopyRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleBankChallanCopyCameraClose}>
//                   Close
//                 </Button>
//               </div>
//             </>
//           )}
//           <FarmerBankChallanCopyPreview
//             imageUrl={farmerBankChallanCopyImage}
//           ></FarmerBankChallanCopyPreview>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

// ///////////////////////////////////////////////////////below code is completed all
// import React, { useState, useEffect } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import { FaFileUpload } from "react-icons/fa";

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

// const FormData = styled.div`
//   background-color: #d1f1d1;
//   padding: 10px;
//   border-radius: 8px;
//   width: 350px;
//   color: black;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Label = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   font-family: initial;
// `;

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
//   background-image: url(${(props) => props.imageUrl});
//   background-size: cover;
//   background-position: center;
// `;

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
//   color: black;
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
//   width: 200px;
//   height: 180px;
//   background-color: #2ecc71; /* Green background color */
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 0 auto;
//   margin-top: 20px;
// `;

// //farmerpassbook
// const FarmerBankPassbookPreview = styled.div`
//   width: 200px;
//   height: 180px;
//   background-color: #f1c40f; /* Yellow background color */
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin: 0 auto;
//   margin-top: 20px;
// `;
// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [farmerPhoto, setFarmerPhoto] = useState(null);

//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);
//   //========================================>>Passbook functions1

//   useEffect(() => {
//     if (!showBankPassbookCamera) {
//       setBankPassbookImage(bankPassbookImage);
//       getCurrentBankPassbookLocation(bankPassbookLocation);
//     }
//   }, [showBankPassbookCamera]);

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     getCurrentBankPassbookLocation(); // Get location after capturing the image
//   };

//   const handleBankPassbookRetake = () => {
//     setShowBankPassbookCamera(true);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };
//   const handleBankPassbookCameraClose = () => {
//     setShowBankPassbookCamera(false);
//     setBankPassbookImage(null);
//     setBankPassbookLocation(null);
//   };

//   const getCurrentBankPassbookLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setBankPassbookLocation({ latitude, longitude });
//           console.log(
//             `Bank Passbook Latitude: ${latitude}, Longitude: ${longitude}`
//           );
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOpenBankPassbookCamera = () => {
//     setShowBankPassbookCamera(true);
//   };

//   const handleBankPassbookFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBankPassbookImage(reader.result);
//         // Get current location after uploading the image
//         getCurrentBankPassbookLocation();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && bankPassbookLocation) {
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(
//           `Latitude: ${bankPassbookLocation?.latitude.toFixed(6)}`,
//           10,
//           40
//         );
//         context.fillText(
//           `Longitude: ${bankPassbookLocation?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setBankPassbookImage(dataURL); // Set the new dataURL instead of original bankPassbookImage
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, bankPassbookLocation, farmerId]);

//   //===========================================>>>pasbook functions2

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
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
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
//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");

//       // Set canvas dimensions to match the captured image
//       canvas.width = 400; // Adjust the width as needed
//       canvas.height = 300; // Adjust the height as needed

//       // Draw the captured image onto the canvas
//       const image = new Image();
//       image.onload = () => {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Draw the table onto the canvas
//         context.font = "14px Arial";
//         context.fillStyle = "white";
//         context.fillText(`Farmer ID: ${farmerId}`, 10, 20);
//         context.fillText(`Latitude: ${location?.latitude.toFixed(6)}`, 10, 40);
//         context.fillText(
//           `Longitude: ${location?.longitude.toFixed(6)}`,
//           10,
//           60
//         );

//         // Convert the canvas content to a data URL
//         const dataURL = canvas.toDataURL("image/jpeg");
//         setFarmerPhoto(dataURL);
//       };

//       image.src = capturedImage;
//     }
//   }, [capturedImage, location, farmerId]);

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <Button onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleCameraClose}>Close</Button>
//               </div>
//             </>
//           )}

//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenBankPassbookCamera}>
//               Open Bank Passbook Camera
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleBankPassbookFileUpload}
//             />
//           </div>
//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <Button onClick={handleBankPassbookRetake}>
//                   <AiOutlineCamera /> Retake
//                 </Button>
//                 <Button onClick={handleBankPassbookCameraClose}>Close</Button>
//               </div>
//             </>
//           )}

//           <FarmerBankPassbookPreview
//             imageUrl={bankPassbookImage}
//           ></FarmerBankPassbookPreview>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//server connection
