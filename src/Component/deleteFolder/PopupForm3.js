///////////////////////////////////////////////////////below code is completed all
import React, { useState, useEffect } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";

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

const FormData = styled.div`
  background-color: #d1f1d1;
  padding: 10px;
  border-radius: 8px;
  width: 350px;
  color: black;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

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
  width: 200px;
  height: 180px;
  background-color: #2ecc71; /* Green background color */
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 20px;
`;

//farmerpassbook
const FarmerBankPassbookPreview = styled.div`
  width: 200px;
  height: 180px;
  background-color: #f1c40f; /* Yellow background color */
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 20px;
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

  return (
    <>
      <PopupFormContainer>
        <PopupFormContent>
          <div style={{ marginBottom: 10 }}>
            <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <CloseButton onClick={onClose}>Close</CloseButton>
          </div>

          {showCamera && (
            <>
              <Camera
                isImageMirror={false}
                onTakePhoto={(dataUri) => handleCapture(dataUri)}
              />
              <div style={{ marginTop: 10 }}>
                <Button onClick={handleRetake}>
                  <AiOutlineCamera /> Retake
                </Button>
                <Button onClick={handleCameraClose}>Close</Button>
              </div>
            </>
          )}

          <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

          <div style={{ marginBottom: 10 }}>
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
              <div style={{ marginTop: 10 }}>
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
        </PopupFormContent>
      </PopupFormContainer>
    </>
  );
};

export default PopupForm;
//server connection
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

//=============================================================>>below 100 all are good
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

//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   const [bankPassbookLocation, setBankPassbookLocation] = useState(null);
//   //========================================>>Passbook functions

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
//     // Get current location after capturing the image
//     getCurrentBankPassbookLocation();
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
//         setBankPassbookImage(dataURL);
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, bankPassbookLocation, farmerId]);
//   //===========================================>>>pasbook functions
// const handleCapture = (dataUri) => {
//   setCapturedImage(dataUri);
//   setShowCamera(false);

//   // Get current location after capturing the image
//   getCurrentLocation();
// };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null);
//     setFarmerPhoto(null); // Reset farmerPhoto when retaking the photo
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//             </>
//           )}

//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           <div style={{ marginTop: 10 }}>
//             <CameraButton onClick={handleRetake}>
//               <AiOutlineCamera /> Retake Farmer Photo
//             </CameraButton>
//           </div>

//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenBankPassbookCamera}>Open Bank Passbook Camera</button>
//             <input type="file" accept="image/*" onChange={handleBankPassbookFileUpload} />
//           </div>

//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//             </>
//           )}

//           <FarmerBankPassbookPreview imageUrl={bankPassbookImage}>
//             {!bankPassbookImage && (
//               <Button onClick={handleOpenBankPassbookCamera}>
//                 <AiOutlineCamera /> Open Bank Passbook Camera
//               </Button>
//             )}
//           </FarmerBankPassbookPreview>

//           {bankPassbookLocation && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Bank Passbook Latitude: {bankPassbookLocation.latitude.toFixed(6)}, Longitude:{" "}
//               {bankPassbookLocation.longitude.toFixed(6)}
//             </div>
//           )}

//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//=================================================================>>>>All are done
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

//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   //========================================>>Passbook functions

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
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
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     // Combine the captured image and table into a single image
//     if (bankPassbookImage && location) {
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
//         setBankPassbookImage(dataURL);
//       };

//       image.src = bankPassbookImage;
//     }
//   }, [bankPassbookImage, location, farmerId]);
//   //===========================================>>>pasbook functions
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

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//             </>
//           )}

//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           <div style={{ marginTop: 10 }}>
//             <CameraButton onClick={handleRetake}>
//               <AiOutlineCamera /> Retake Farmer Photo
//             </CameraButton>
//           </div>

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
//             </>
//           )}

//           <FarmerBankPassbookPreview imageUrl={bankPassbookImage}>
//             {!bankPassbookImage && (
//               <Button onClick={handleOpenBankPassbookCamera}>
//                 <AiOutlineCamera /> Open Bank Passbook Camera
//               </Button>
//             )}
//           </FarmerBankPassbookPreview>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//========================================================>>>This method done
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

//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);
//   //========================================>>Passbook functions

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
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
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   //===========================================>>>pasbook functions
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

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//     <PopupFormContainer>
//     <PopupFormContent>
//       <div style={{ marginBottom: 10 }}>
//         <button onClick={handleOpenCamera}>Open Farmer Photo Camera</button>
//         <input type="file" accept="image/*" onChange={handleFileUpload} />
//       </div>

//       {showCamera && (
//         <>
//           <Camera
//             isImageMirror={false}
//             onTakePhoto={(dataUri) => handleCapture(dataUri)}
//           />
//         </>
//       )}

//       <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//       <div style={{ marginTop: 10 }}>
//         <CameraButton onClick={handleRetake}>
//           <AiOutlineCamera /> Retake Farmer Photo
//         </CameraButton>
//       </div>

//       <div style={{ marginBottom: 10 }}>
//         <button onClick={handleOpenBankPassbookCamera}>Open Bank Passbook Camera</button>
//         <input type="file" accept="image/*" onChange={handleBankPassbookFileUpload} />
//       </div>

//       {showBankPassbookCamera && (
//         <>
//           <Camera
//             isImageMirror={false}
//             onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//           />
//         </>
//       )}

//       <FarmerBankPassbookPreview imageUrl={bankPassbookImage}>
//         {!bankPassbookImage && (
//           <Button onClick={handleOpenBankPassbookCamera}>
//             <AiOutlineCamera /> Open Bank Passbook Camera
//           </Button>
//         )}
//       </FarmerBankPassbookPreview>

//       {location && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: 10,
//             left: "50%",
//             transform: "translateX(-50%)",
//             color: "white",
//             fontSize: 14,
//             textAlign: "center",
//           }}
//         >
//           Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//           {location.longitude.toFixed(6)}
//         </div>
//       )}
//     </PopupFormContent>
//   </PopupFormContainer>
// </>
// );
// };

// export default PopupForm;
//============================================================>>tried one method
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

//   const [bankPassbookImage, setBankPassbookImage] = useState(null);
//   const [showBankPassbookCamera, setShowBankPassbookCamera] = useState(false);

//   //========================================>>Passbook functions

//   const handleBankPassbookCapture = (dataUri) => {
//     setBankPassbookImage(dataUri);
//     setShowBankPassbookCamera(false);
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
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   //===========================================>>>pasbook functions
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

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//             <button onClick={handleOpenCamera}>Open Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           <div style={{ marginTop: 10 }}>
//             <CameraButton onClick={handleRetake}>
//               <AiOutlineCamera /> Retake
//             </CameraButton>
//           </div>
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           <FarmerBankPassbookPreview imageUrl={bankPassbookImage}>
//             {!bankPassbookImage && (
//               <div style={{ marginBottom: 10 }}>
//                 <button onClick={handleOpenBankPassbookCamera}>
//                   Open Camera
//                 </button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleBankPassbookFileUpload}
//                 />
//               </div>
//             )}
//           </FarmerBankPassbookPreview>

//           {showBankPassbookCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleBankPassbookCapture(dataUri)}
//               />
//             </>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

///==========================================================>>>farmerphotodone1
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

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//             <button onClick={handleOpenCamera}>Open Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           <div style={{ marginTop: 10 }}>
//             <CameraButton onClick={handleRetake}>
//               <AiOutlineCamera /> Retake
//             </CameraButton>
//           </div>
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)}
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//========================================================>>All are good 1 but extra preview exist
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

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
//         setFarmerPhoto(null); // Reset farmerPhoto when uploading a new image
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
//             <button onClick={handleOpenCamera}>Open Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           {capturedImage && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   border: "2px solid white",
//                   borderRadius: 8,
//                   padding: 10,
//                 }}
//               >
//                 <table style={{ color: "white", fontSize: 14 }}>
//                   <tbody>
//                     <tr>
//                       <td>Farmer ID:</td>
//                       <td>{farmerId}</td>
//                     </tr>
//                     <tr>
//                       <td>Latitude:</td>
//                       <td>{location?.latitude.toFixed(6)}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude:</td>
//                       <td>{location?.longitude.toFixed(6)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <CameraButton onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </CameraButton>
//               </div>
//             </div>
//           )}

//           {farmerPhoto && (
//             <div style={{ textAlign: "center", marginTop: 10 }}>
//               <img
//                 src={farmerPhoto}
//                 alt="Farmer Photo"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//             </div>
//           )}

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)}
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//================================================>>Id added in table
// import React, { useState } from "react";
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
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenCamera}>Open Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           {capturedImage && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   border: "2px solid white",
//                   borderRadius: 8,
//                   padding: 10,
//                 }}
//               >
//                 <table style={{ color: "white", fontSize: 14 }}>
//                   <tbody>
//                     <tr>
//                       <td>Farmer ID:</td>
//                       <td>{farmerId}</td>
//                     </tr>
//                     <tr>
//                       <td>Latitude:</td>
//                       <td>{location?.latitude.toFixed(6)}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude:</td>
//                       <td>{location?.longitude.toFixed(6)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <CameraButton onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </CameraButton>
//               </div>
//             </div>
//           )}

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)}
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//========================================>>>Former id not exist
// import React, { useState } from "react";
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
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <div style={{ marginBottom: 10 }}>
//             <button onClick={handleOpenCamera}>Open Camera</button>
//             <input type="file" accept="image/*" onChange={handleFileUpload} />
//             <CloseButton onClick={onClose}>Close</CloseButton>
//           </div>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           {capturedImage && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   border: "2px solid white",
//                   borderRadius: 8,
//                   padding: 10,
//                 }}
//               >
//                 <table style={{ color: "white", fontSize: 14 }}>
//                   <tbody>
//                     <tr>
//                       <td>Latitude:</td>
//                       <td>{location?.latitude.toFixed(6)}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude:</td>
//                       <td>{location?.longitude.toFixed(6)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <CameraButton onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </CameraButton>
//               </div>
//             </div>
//           )}

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)}
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//=========================================================>>All are good both filupload and camera working
// import React, { useState } from "react";
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
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCapturedImage(reader.result); // Update capturedImage with the uploaded image
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

//   return (
//     <>
//       <PopupFormContainer>
// <PopupFormContent>
//   <div style={{ marginBottom: 10 }}>
//     <button onClick={handleOpenCamera}>Open Camera</button>
//     <input type="file" accept="image/*" onChange={handleFileUpload} />
//   </div>

//   {showCamera && (
//     <>
//       <Camera
//         isImageMirror={false}
//         onTakePhoto={(dataUri) => handleCapture(dataUri)}
//       />
//     </>
//   )}

//           {capturedImage && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   border: "2px solid white",
//                   borderRadius: 8,
//                   padding: 10,
//                 }}
//               >
//                 <table style={{ color: "white", fontSize: 14 }}>
//                   <tbody>
//                     <tr>
//                       <td>Latitude:</td>
//                       <td>{location?.latitude.toFixed(6)}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude:</td>
//                       <td>{location?.longitude.toFixed(6)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <CameraButton onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </CameraButton>
//               </div>
//             </div>
//           )}

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)}
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//======================================================>>>>Addedcamera open working
// import React, { useState } from "react";
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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false); // Set to false initially
//   const [location, setLocation] = useState(null);

//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null); // Reset location when retaking the photo
//   };

//   const handleOpenCamera = () => {
//     setShowCamera(true);
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <button onClick={handleOpenCamera}>Open Camera</button>

//           {showCamera && (
//             <>
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             </>
//           )}

//           {capturedImage && (
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: 10,
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   border: "2px solid white",
//                   borderRadius: 8,
//                   padding: 10,
//                 }}
//               >
//                 <table style={{ color: "white", fontSize: 14 }}>
//                   <tbody>
//                     <tr>
//                       <td>Latitude:</td>
//                       <td>{location?.latitude.toFixed(6)}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude:</td>
//                       <td>{location?.longitude.toFixed(6)}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ maxWidth: "100%", borderRadius: 8 }}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <CameraButton onClick={handleRetake}>
//                   <AiOutlineCamera /> Retake
//                 </CameraButton>
//               </div>
//             </div>
//           )}

//           {location && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 10,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 color: "white",
//                 fontSize: 14,
//                 textAlign: "center",
//               }}
//             >
//               Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//               {location.longitude.toFixed(6)},
//             </div>
//           )}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//============================================>>added buttons not working
// import React, { useState } from "react";
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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(true);
//   const [location, setLocation] = useState(null);

//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null); // Reset location when retaking the photo
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <p>Upload all Images of Farmer</p>
//           <FormData>
//             <Label>Farmer Photo:</Label>
//             <CameraButton>
//               <AiOutlineCamera /> Capture
//             </CameraButton>
//             <FileUploadButton>
//               <FaFileUpload /> Upload
//             </FileUploadButton>
//             {showCamera && (
//               <>
//                 <Camera
//                   isImageMirror={false}
//                   onTakePhoto={(dataUri) => handleCapture(dataUri)}
//                 />
//               </>
//             )}

//             {capturedImage && (
//               <div
//                 style={{
//                   textAlign: "center",
//                   marginTop: 10,
//                   position: "relative",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     border: "2px solid white",
//                     borderRadius: 8,
//                     padding: 10,
//                   }}
//                 >
//                   <table style={{ color: "white", fontSize: 14 }}>
//                     <tbody>
//                       <tr>
//                         <td>Latitude:</td>
//                         <td>{location?.latitude.toFixed(6)}</td>
//                       </tr>
//                       <tr>
//                         <td>Longitude:</td>
//                         <td>{location?.longitude.toFixed(6)}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   style={{ maxWidth: "100%", borderRadius: 8 }}
//                 />
//                 <div style={{ marginTop: 10 }}>
//                   <CameraButton onClick={handleRetake}>
//                     <AiOutlineCamera /> Retake
//                   </CameraButton>
//                 </div>
//               </div>
//             )}

//             {location && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 10,
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   color: "white",
//                   fontSize: 14,
//                   textAlign: "center",
//                 }}
//               >
//                 Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//                 {location.longitude.toFixed(6)}
//               </div>
//             )}
//             <CapturedFarmerPhoto imageUrl={capturedImage}></CapturedFarmerPhoto>
//           </FormData>
//           {capturedImage && (
//             <FormData>
//               <CameraButton onClick={handleRetake}>
//                 <AiOutlineCamera /> Retake
//               </CameraButton>
//             </FormData>
//           )}
//           <CloseButton onClick={onClose}>Close</CloseButton>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
//=======================================================>>Reatke option working
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";

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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(true);
//   const [location, setLocation] = useState(null);

//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//     setLocation(null); // Reset location when retaking the photo
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <p>Upload all Images of Farmer</p>
//           <FormData>
//             <Label>Farmer Photo:</Label>
//             {showCamera && (
//               <>
//                 <Camera
//                   isImageMirror={false}
//                   onTakePhoto={(dataUri) => handleCapture(dataUri)}
//                 />
//               </>
//             )}

//             {capturedImage && (
//               <div style={{ textAlign: "center", marginTop: 10 }}>
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   style={{ maxWidth: "100%", borderRadius: 8 }}
//                 />
//                 <div style={{ marginTop: 10 }}>
//                   <CameraButton onClick={handleRetake}>
//                     <AiOutlineCamera /> Retake
//                   </CameraButton>
//                 </div>
//               </div>
//             )}

//             {location && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 10,
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   color: "white",
//                   fontSize: 14,
//                   textAlign: "center",
//                 }}
//               >
//                 Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
//                 {location.longitude.toFixed(6)}
//               </div>
//             )}
//             <CapturedFarmerPhoto imageUrl={capturedImage}></CapturedFarmerPhoto>
//           </FormData>
//           {capturedImage && (
//             <FormData>
//               <CameraButton onClick={handleRetake}>
//                 <AiOutlineCamera /> Retake
//               </CameraButton>
//             </FormData>
//           )}
//           {/* ... your existing JSX */}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//==================================================>>>>>latitud and longitude is working
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";

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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(true);

//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false);

//     // Get current location after capturing the image
//     getCurrentLocation();
//   };

//   const handleRetake = () => {
//     setShowCamera(true);
//     setCapturedImage(null);
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
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

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <p>Upload all Images of Farmer</p>
//           <FormData>
//             <Label>Farmer Photo:</Label>
//             {showCamera && (
//               <Camera
//                 isImageMirror={false}
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             )}
//             <CapturedFarmerPhoto imageUrl={capturedImage}></CapturedFarmerPhoto>
//           </FormData>
//           {capturedImage && (
//             <FormData>
//               <CameraButton onClick={handleRetake}>
//                 <AiOutlineCamera /> Retake
//               </CameraButton>
//             </FormData>
//           )}
//           {/* ... your existing JSX */}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//======================================>>>Camera working
// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS styles
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";

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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(true);

//   const handleCapture = (dataUri) => {
//     setCapturedImage(dataUri);
//     setShowCamera(false); // Turn off the camera after capturing an image
//   };

//   const handleRetake = () => {
//     setShowCamera(true); // Enable the camera for retaking
//     setCapturedImage(null); // Reset captured image
//   };

//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <p>Upload all Images of Farmer</p>
//           <FormData>
//             <Label>Farmer Photo:</Label>
//             {showCamera && (
//               <Camera
//                 isImageMirror={false} // Adjust this based on your camera orientation
//                 onTakePhoto={(dataUri) => handleCapture(dataUri)}
//               />
//             )}
//             <CapturedFarmerPhoto imageUrl={capturedImage}></CapturedFarmerPhoto>
//           </FormData>
//           {capturedImage && (
//             <FormData>
//               <CameraButton onClick={handleRetake}>
//                 <AiOutlineCamera /> Retake
//               </CameraButton>
//             </FormData>
//           )}
//           {/* ... your existing JSX */}
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;

//====================Basic=========>>
// import React from "react";
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

// const CapturedFarmerPhoto = styled.div`
//   background-color: black;
//   padding: 10px;
//   border-radius: 8px;
//   width: 50px;
//   height: 50px;
// `;

// const RetakeButton = styled.button`
//   background-color: red;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
//   height: 22px;
//   width: 44px;
//   font-size: 9px;
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

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   return (
//     <>
//       <PopupFormContainer>
//         <PopupFormContent>
//           <p>Upload all Images of Farmer</p>
//           <FormData>
//             <Label>Farmer Photo:</Label>
//             <CameraButton>
//               <AiOutlineCamera /> Capture
//             </CameraButton>
//             <FileUploadButton>
//               <FaFileUpload /> Upload
//             </FileUploadButton>
//             <CapturedFarmerPhoto></CapturedFarmerPhoto>
//             <RetakeButton>Retake</RetakeButton>
//           </FormData>
//           <FormData>
//             <Label>Farmer Bank Passbook:</Label>
//             <CameraButton>
//               <AiOutlineCamera /> Capture
//             </CameraButton>
//             <FileUploadButton>
//               <FaFileUpload /> Upload
//             </FileUploadButton>
//             <CapturedFarmerPhoto></CapturedFarmerPhoto>
//             <RetakeButton>Retake</RetakeButton>
//           </FormData>
//           <Button>Submit</Button>
//           <CloseButton onClick={onClose}>Close</CloseButton>
//         </PopupFormContent>
//       </PopupFormContainer>
//     </>
//   );
// };

// export default PopupForm;
