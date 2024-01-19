import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

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

const PopupFormContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const Label = styled.label`
  margin-top: 10px;
  display: block;
  color: black;
`;

const ImagePreview = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 10px;
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

const CameraButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
`;

// ... (import statements)

// ... (import statements)

// ... (import statements)

const PopupForm = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
}) => {
  const [image1, setImage1] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImagePreview, setCapturedImagePreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    // Turn off the camera when capturedImagePreview or preview1 changes
    setCameraActive(false);
  }, [capturedImagePreview, preview1]);

  const handleCameraButtonClick = () => {
    setShowCamera(true);
    setPreview1(null);
    setCameraActive(true); // Turn on the camera
  };

  const handleCameraCapture = async (dataUri) => {
    try {
      // Convert the dataUri to a Blob
      const byteString = atob(dataUri.split(",")[1]);
      const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Create a new File from the Blob
      const file = new File([blob], "captured_image.jpg", {
        type: "image/jpeg",
      });

      // Set the captured image and preview for further processing
      setImage1(file);
      setPreview1(dataUri);
      setCapturedImagePreview(dataUri);
      setShowCamera(false);
      setCameraActive(false); // Turn off the camera after capturing
    } catch (error) {
      console.error("Error converting and setting captured image:", error);
    }
  };

  const handleRetake = () => {
    setImage1(null);
    setPreview1(null);
    setCapturedImagePreview(null);
    setShowCamera(true);
    setCameraActive(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("farmer_id", farmerId);
      formData.append("farmer_field_id", farmerFieldId);
      formData.append("farmer_photo", image1);

      const response = await fetch(
        "https://sfamsserver.in/api/admin/farmer-doc/save",
        {
          method: "POST",
          headers: {
            device_uuid: device_uuid,
            token: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      onClose();
    }
  };

  return (
    <PopupFormContainer>
      <PopupFormContent>
        <h2>Upload Images for Farmer</h2>
        <p>Farmer ID: {farmerId}</p>
        <p>Farmer Field ID: {farmerFieldId}</p>

        <Label>
          {!cameraActive && (
            <>
              <CameraButton onClick={handleCameraButtonClick}>
                <AiOutlineCamera /> Capture
              </CameraButton>
            </>
          )}
          {cameraActive && (
            <Camera
              key="cameraKey"
              isFullscreen={false}
              idealResolution={{ width: 300, height: 300 }}
              onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
            />
          )}
          {/* Rest of your code */}
        </Label>

        <Button onClick={() => setCameraActive(false)}>Turn Off Camera</Button>

        {capturedImagePreview && !cameraActive && (
          <>
            <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
            <Button onClick={handleRetake}>Retake</Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
        {preview1 && (
          <>
            <ImagePreview src={preview1} alt="Preview" />
            <Button onClick={() => handleRetake(setImage1, setPreview1)}>
              Retake
            </Button>
          </>
        )}

        {image1 && (
          <>
            <Button onClick={handleSave}>Submit</Button>
          </>
        )}

        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupFormContent>
    </PopupFormContainer>
  );
};

export default PopupForm;

//=============================================================>>>Creating new component
//===============================================================>>everything working fine
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
//   font-size: 16px;
// `;

// const ImagePreview = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-top: 10px;
//   margin-bottom: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [showCamera1, setShowCamera1] = useState(false);
//   const [showCamera2, setShowCamera2] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);

//   const handleCameraCapture = async (dataUri, label) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Determine whether to set image1 or image2
//       if (label === "farmer_photo") {
//         setImage1(file);
//         setPreview1(dataUri);
//         setCapturedImagePreview(dataUri);
//         setShowCamera1(false);
//       } else if (label === "farmer_bank_passbook") {
//         setImage2(file);
//         setPreview2(dataUri);
//         setShowCamera2(false);
//       }
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = (label) => {
//     if (label === "farmer_photo") {
//       setImage1(null);
//       setPreview1(null);
//       setShowCamera1(true);
//     } else if (label === "farmer_bank_passbook") {
//       setImage2(null);
//       setPreview2(null);
//       setShowCamera2(true);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const responseData = await response.json();
//         console.error("Failed to upload images. Response:", responseData);
//         throw new Error("Failed to upload images");
//       }

//       console.log("Images uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!showCamera1 && (
//             <>
//               <CameraButton onClick={() => setShowCamera1(true)}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {showCamera1 && (
//             <Camera
//               key="cameraKey1"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, "farmer_photo")
//               }
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake("farmer_photo")}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           {!showCamera2 && (
//             <>
//               <CameraButton onClick={() => setShowCamera2(true)}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {showCamera2 && (
//             <Camera
//               key="cameraKey2"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, "farmer_bank_passbook")
//               }
//             />
//           )}
//           {preview2 && (
//             <>
//               <ImagePreview src={preview2} alt="Preview" />
//               <Button onClick={() => handleRetake("farmer_bank_passbook")}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Button onClick={handleSave} disabled={!image1 || !image2}>
//           Submit
//         </Button>

//         {capturedImagePreview && (
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={() => handleRetake("farmer_photo")}>Retake</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//==========================================================>>todays update
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
//   font-size: 16px;
// `;

// const ImagePreview = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-top: 10px;
//   margin-bottom: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);

//   useEffect(() => {
//     // Turn off the camera when capturedImagePreview or preview1 changes
//     setCameraActive(false);
//   }, [capturedImagePreview, preview1]);

//   const handleCameraButtonClick = () => {
//     setShowCamera(true);
//     setCameraActive(true); // Turn on the camera
//   };

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Determine whether to set image1 or image2
//       if (!image1) {
//         setImage1(file);
//         setPreview1(dataUri);
//         setCapturedImagePreview(dataUri);
//       } else if (!image2) {
//         setImage2(file);
//         setPreview2(dataUri);
//       }

//       setShowCamera(false);
//       setCameraActive(false); // Turn off the camera after capturing
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setImage2(null); // Clear the second image on retake
//     setPreview2(null); // Clear the second preview on retake
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//     setCameraActive(true);
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const responseData = await response.json();
//         console.error("Failed to upload images. Response:", responseData);
//         throw new Error("Failed to upload images");
//       }

//       console.log("Images uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!cameraActive && (
//             <>
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {cameraActive && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           {!cameraActive && (
//             <>
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {cameraActive && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {preview2 && (
//             <>
//               <ImagePreview src={preview2} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage2, setPreview2)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Button onClick={handleSave}>Submit</Button>

//         {capturedImagePreview && !cameraActive && (
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={handleRetake}>Retake</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//============================================================>>image is saving
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
//   font-size: 16px;
// `;

// const ImagePreview = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-top: 10px;
//   margin-bottom: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);

//   useEffect(() => {
//     // Turn off the camera when capturedImagePreview or preview1 changes
//     setCameraActive(false);
//   }, [capturedImagePreview, preview1]);

//   const handleCameraButtonClick = () => {
//     setShowCamera(true);
//     setCameraActive(true); // Turn on the camera
//   };

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Determine whether to set image1 or image2
//       if (!image1) {
//         setImage1(file);
//         setPreview1(dataUri);
//         setCapturedImagePreview(dataUri);
//       } else if (!image2) {
//         setImage2(file);
//         setPreview2(dataUri);
//       }

//       setShowCamera(false);
//       setCameraActive(false); // Turn off the camera after capturing
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setImage2(null); // Clear the second image on retake
//     setPreview2(null); // Clear the second preview on retake
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//     setCameraActive(true);
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const responseData = await response.json();
//         console.error("Failed to upload images. Response:", responseData);
//         throw new Error("Failed to upload images");
//       }

//       console.log("Images uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!cameraActive && (
//             <>
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {cameraActive && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           {!cameraActive && (
//             <>
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {cameraActive && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {preview2 && (
//             <>
//               <ImagePreview src={preview2} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage2, setPreview2)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Button onClick={handleSave}>Submit</Button>

//         {capturedImagePreview && !cameraActive && (
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={handleRetake}>Retake</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//========================================================>>>both images taking
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
//   font-size: 16px;
// `;

// const ImagePreview = styled.img`
//   width: 100px;
//   height: 100px;
//   margin-top: 10px;
//   margin-bottom: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [showCamera, setShowCamera] = useState(false);

//   useEffect(() => {
//     // Turn off the camera when a preview changes
//     if (previews.length > 0) {
//       setShowCamera(false);
//     }
//   }, [previews]);

//   const handleCameraButtonClick = () => {
//     setShowCamera(true);
//   };

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], `captured_image_${images.length + 1}.jpg`, {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImages((prevImages) => [...prevImages, file]);
//       setPreviews((prevPreviews) => [...prevPreviews, dataUri]);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = (index) => {
//     const newImages = [...images];
//     const newPreviews = [...previews];
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
//     setImages(newImages);
//     setPreviews(newPreviews);
//     setShowCamera(true);
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       images.forEach((image, index) => {
//         formData.append(`farmer_photo_${index + 1}`, image);
//       });

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Images uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!showCamera && (
//             <>
//               {previews[0] && (
//                 <>
//                   <ImagePreview src={previews[0]} alt="Preview 1" />
//                   <RetakeButton onClick={() => handleRetake(0)}>
//                     Retake
//                   </RetakeButton>
//                 </>
//               )}
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           {!showCamera && (
//             <>
//               {previews[1] && (
//                 <>
//                   <ImagePreview src={previews[1]} alt="Preview 2" />
//                   <RetakeButton onClick={() => handleRetake(1)}>
//                     Retake
//                   </RetakeButton>
//                 </>
//               )}
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//         </Label>

//         {showCamera && (
//           <Camera
//             key="cameraKey"
//             isFullscreen={false}
//             idealResolution={{ width: 300, height: 300 }}
//             onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//           />
//         )}

//         {images.length > 0 && !showCamera && (
//           <Button onClick={handleSave}>Submit</Button>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// const RetakeButton = styled(Button)`
//   background-color: #e74c3c;
// `;

// export default PopupForm;

//=====================================================>>Automatic turned off working
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// // ... (import statements)

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);

//   useEffect(() => {
//     // Turn off the camera when capturedImagePreview or preview1 changes
//     setCameraActive(false);
//   }, [capturedImagePreview, preview1]);

//   const handleCameraButtonClick = () => {
//     setShowCamera(true);
//     setPreview1(null);
//     setCameraActive(true); // Turn on the camera
//   };

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage1(file);
//       setPreview1(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//       setCameraActive(false); // Turn off the camera after capturing
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//     setCameraActive(true);
//   };

//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

// <Label>
//   {!cameraActive && (
//     <>
//       <CameraButton onClick={handleCameraButtonClick}>
//         <AiOutlineCamera /> Capture
//       </CameraButton>
//     </>
//   )}
//   {cameraActive && (
//     <Camera
//       key="cameraKey"
//       isFullscreen={false}
//       idealResolution={{ width: 300, height: 300 }}
//       onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//     />
//   )}
//   {/* Rest of your code */}
// </Label>

//         <Button onClick={() => setCameraActive(false)}>Turn Off Camera</Button>

//         {capturedImagePreview && !cameraActive &&(
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={handleRetake}>Retake</Button>
//             <Button onClick={handleSave}>Save</Button>
//           </>
//         )}
//         {preview1 && (
//           <>
//             <ImagePreview src={preview1} alt="Preview" />
//             <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//               Retake
//             </Button>
//           </>
//         )}

//         {image1 && (
//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//===============================================>>>Turn off button working
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);

//   const handleCameraButtonClick = () => {
//     setShowCamera(true);
//     setPreview1(null);
//     setCameraActive(true); // Turn on the camera
//   };

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage1(file);
//       setPreview1(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);

//       // Turn off the camera after capturing
//       setCameraActive(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

// const handleRetake = () => {
//   setImage1(null);
//   setPreview1(null);
//   setCapturedImagePreview(null);
//   setShowCamera(true);
//   setCameraActive(true); // Turn on the camera
// };

//   const handleSave = async () => {
// try {
//   const formData = new FormData();
//   formData.append("farmer_id", farmerId);
//   formData.append("farmer_field_id", farmerFieldId);
//   formData.append("farmer_photo", image1);

//   const response = await fetch(
//     "https://sfamsserver.in/api/admin/farmer-doc/save",
//     {
//       method: "POST",
//       headers: {
//         device_uuid: device_uuid,
//         token: token,
//       },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to upload images");
//   }

//   console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           {!cameraActive && (
//             <>
//               <CameraButton onClick={handleCameraButtonClick}>
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {cameraActive && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {/* Rest of your code */}
//         </Label>

//         <Button onClick={() => setCameraActive(false)}>Turn Off Camera</Button>

//         {capturedImagePreview && (
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={handleRetake}>Retake</Button>
//             <Button onClick={handleSave}>Save</Button>
//           </>
//         )}
//         {preview1 && (
//           <>
//             <ImagePreview src={preview1} alt="Preview" />
//             <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//               Retake
//             </Button>
//           </>
//         )}

//         {image1 && (
//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//==================================================>>>>working cam and saving
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage1(file);
//       setPreview1(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//   };

// const handleSave = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("farmer_id", farmerId);
//     formData.append("farmer_field_id", farmerFieldId);
//     formData.append("farmer_photo", image1);

//     const response = await fetch(
//       "https://sfamsserver.in/api/admin/farmer-doc/save",
//       {
//         method: "POST",
//         headers: {
//           device_uuid: device_uuid,
//           token: token,
//         },
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to upload images");
//     }

//     console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           {!showCamera && (
//             <>
//               <CameraButton
//                 onClick={() => {
//                   setShowCamera(!showCamera);
//                   setPreview1(null);
//                 }}
//               >
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {/* Conditionally render the Camera component */}
//           {showCamera && (
//             <Camera
//               key="cameraKey"
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//             />
//           )}
//           {capturedImagePreview && (
//             <>
//               <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </>
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         {image1 && (
//           <>
//             <Button onClick={handleSave}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//===========================================================>>functions are set
// import React, { useState, useRef } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
//   display: none; /* Hide the file input */
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleCameraCapture = async (dataUri) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage1(file);
//       setPreview1(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage1(file);
//     previewImage(file, setPreview1);
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//   };

//   const handleSave = () => {
//     console.log("Save button clicked");
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   const cameraComponent = (
//     <Camera
//       key="cameraKey"
//       isFullscreen={false}
//       idealResolution={{ width: 300, height: 300 }}
//       onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
//     />
//   );

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!showCamera && (
//             <>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 ref={fileInputRef}
//               />
//               <CameraButton
//                 onClick={() => {
//                   setShowCamera(!showCamera);
//                   setPreview1(null);
//                   fileInputRef.current.value = null; // Reset file input
//                 }}
//               >
//                 <AiOutlineCamera /> Capture
//               </CameraButton>
//             </>
//           )}
//           {/* Conditionally render the Camera component */}
//           {showCamera ? cameraComponent : null}
//           {capturedImagePreview && (
//             <>
//               <ImagePreview
//                 src={capturedImagePreview}
//                 alt="Captured Preview"
//               />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </>
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         {image1 && (
//           <>
//             <Button onClick={handleImageUpload}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//=====================================================>>>Not fixing
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     if (!showCamera) {
//       const file = e.target.files[0];
//       setImage(file);
//       previewImage(file, setPreview);
//     }
//   };

//   const handleCameraButtonClick = () => {
//     setShowCamera(!showCamera);
//     setPreview1(null);
//   };

//   const handleCameraCapture = async (dataUri, setImage, setPreview) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage(file);
//       setPreview(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//   };

//   const handleSave = () => {
//     // Implement save logic if needed
//     // For now, let's just log a message
//     console.log("Save button clicked");
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {!showCamera && (
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//             />
//           )}
//           <CameraButton onClick={handleCameraButtonClick}>
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {capturedImagePreview && (
//             <>
//               <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </>
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         {image1 && (
//           <>
//             <Button onClick={handleImageUpload}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//==================================================>>all are good 2
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = (setPreview) => {
//     setShowCamera(!showCamera);
//     setPreview === setPreview1 ? setPreview1(null) : setPreview1(null);
//   };

//   const handleCameraCapture = async (dataUri, setImage, setPreview) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage(file);
//       setPreview(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//   };

//   const handleSave = () => {
//     // Implement save logic if needed
//     // For now, let's just log a message
//     console.log("Save button clicked");
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton
//             onClick={() => handleCameraButtonClick(() => setPreview1(null))}
//           >
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {capturedImagePreview && (
//             <>
//               <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button onClick={handleSave}>Save</Button>
//             </>
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         {image1 && (
//           <>

//             <Button onClick={handleImageUpload}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//=============================================>>All are working retake also
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImagePreview, setCapturedImagePreview] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = (setPreview) => {
//     setShowCamera(!showCamera);
//     setPreview === setPreview1 ? setPreview1(null) : setPreview1(null);
//   };

//   const handleCameraCapture = async (dataUri, setImage, setPreview) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

//       // Set the captured image and preview for further processing
//       setImage(file);
//       setPreview(dataUri);
//       setCapturedImagePreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = () => {
//     setImage1(null);
//     setPreview1(null);
//     setCapturedImagePreview(null);
//     setShowCamera(true);
//   };

//   const handleSave = () => {
//     // Implement save logic if needed
//     // For now, let's just log a message
//     console.log("Save button clicked");
//   };

//   // const handleRetake = (setImage, setPreview) => {
//   //   setImage(null);
//   //   setPreview(null);
//   //   setShowCamera(true);
//   // };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//     <PopupFormContent>
//       <h2>Upload Images for Farmer</h2>
//       <p>Farmer ID: {farmerId}</p>
//       <p>Farmer Field ID: {farmerFieldId}</p>

//       <Label>
//         Farmer Photo:
//         <Input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//         />
//         <CameraButton
//           onClick={() => handleCameraButtonClick(() => setPreview1(null))}
//         >
//           <AiOutlineCamera /> Capture
//         </CameraButton>
//         {showCamera && (
//           <Camera
//             isFullscreen={false}
//             idealResolution={{ width: 300, height: 300 }}
//             onTakePhoto={(dataUri) =>
//               handleCameraCapture(dataUri, setImage1, setPreview1)
//             }
//           />
//         )}
//         {capturedImagePreview && (
//           <>
//             <ImagePreview src={capturedImagePreview} alt="Captured Preview" />
//             <Button onClick={handleRetake}>Retake</Button>
//             <Button onClick={handleSave}>Save</Button>
//           </>
//         )}
//         {preview1 && (
//           <>
//             <ImagePreview src={preview1} alt="Preview" />
//             <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//               Retake
//             </Button>
//           </>
//         )}
//       </Label>

//       {image1 && (
//         <>
//           <ImagePreview
//             src={URL.createObjectURL(image1)}
//             alt="Captured Image"
//           />
//           <Button onClick={handleImageUpload}>Submit</Button>
//         </>
//       )}

//       <CloseButton onClick={onClose}>Close</CloseButton>
//     </PopupFormContent>
//   </PopupFormContainer>
// );
// };

// export default PopupForm;
//===================================>>Both camera and file upload and preview is working
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = (setPreview) => {
//     setShowCamera(!showCamera);
//     setPreview === setPreview1 ? setPreview1(null) : setPreview1(null);
//   };

//   const handleCameraCapture = async (dataUri, setImage, setPreview) => {
//     try {
//       // Convert the dataUri to a Blob
//       const byteString = atob(dataUri.split(",")[1]);
//       const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: mimeString });

//       // Create a new File from the Blob
//       const file = new File([blob], "captured_image.jpg", {
//         type: "image/jpeg",
//       });

//       // Set the captured image and preview for further processing
//       setImage(file);
//       setPreview(dataUri);
//       setShowCamera(false);
//     } catch (error) {
//       console.error("Error converting and setting captured image:", error);
//     }
//   };

//   const handleRetake = (setImage, setPreview) => {
//     setImage(null);
//     setPreview(null);
//     setShowCamera(true);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);

//       // Ensure the server expects the file to be named "farmer_photo"
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       console.log("Image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton
//             onClick={() => handleCameraButtonClick(() => setPreview1(null))}
//           >
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         {image1 && (
//           <>
//             <ImagePreview
//               src={URL.createObjectURL(image1)}
//               alt="Captured Image"
//             />
//             <Button onClick={handleImageUpload}>Submit</Button>
//           </>
//         )}

//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//========================================>>>Camera is working and saving in server
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// // ... (import statements)

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = (setPreview) => {
//     setShowCamera(!showCamera);
//     setPreview === setPreview1 ? setPreview1(null) : setPreview1(null);
//   };

//   const handleCameraCapture = async (dataUri, setImage, setPreview) => {
//     // Convert the dataUri to a Blob
//     const byteString = atob(dataUri.split(",")[1]);
//     const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([ab], { type: mimeString });

//     // Create a new File from the Blob
//     const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

//     // Set the captured image and preview for further processing
//     setImage(file);
//     setPreview(dataUri);
//     setShowCamera(false);

//     // Upload the converted image to the server
//     await handleImageUpload(file, dataUri);
//   };

//   const handleRetake = (setImage, setPreview) => {
//     setImage(null);
//     setPreview(null);
//     setShowCamera(true);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async (image, preview) => {
//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Image uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton
//             onClick={() => handleCameraButtonClick(() => setPreview1(null))}
//           >
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Button onClick={() => handleImageUpload(image1, preview1)}>
//           Submit
//         </Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//=====================================================>>>>last one adding image through file not camera
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);

//   const handleImageChangeFromCamera = (
//     capturedImage,
//     setImage,
//     setPreview,
//     dataUri
//   ) => {
//     // Set the captured image and preview for further processing
//     setImage(dataUri);
//     setPreview(dataUri);
//     setShowCamera(false);
//   };

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = (setPreview) => {
//     // Toggle the camera visibility
//     setShowCamera(!showCamera);
//     // Set the preview based on which camera button was clicked
//     setPreview === setPreview1 ? setPreview1(null) : setPreview1(null); // Only reset preview1
//   };

//   const handleCameraCapture = (dataUri, setImage, setPreview) => {
//     // Set the captured image and close the camera
//     setImage(dataUri);
//     setPreview(dataUri);
//     setShowCamera(false);
//   };

//   const handleRetake = (setImage, setPreview) => {
//     // Clear the captured image and reopen the camera
//     setImage(null);
//     setPreview(null);
//     setShowCamera(true);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Image uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton
//             onClick={() => handleCameraButtonClick(() => setPreview1(null))}
//           >
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 300, height: 300 }} // Adjust as needed
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {preview1 && (
//             <>
//               <ImagePreview src={preview1} alt="Preview" />
//               <Button onClick={() => handleRetake(setImage1, setPreview1)}>
//                 Retake
//               </Button>
//             </>
//           )}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//============================================>>image as well as file upload working
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const handleImageChangeFromCamera = (
//     capturedImage,
//     setImage,
//     setPreview,
//     dataUri
//   ) => {
//     // Set the captured image and preview for further processing
//     setImage(dataUri);
//     setPreview(dataUri);
//     setShowCamera(false);
//   };

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = () => {
//     // Toggle the camera visibility
//     setShowCamera(!showCamera);
//   };

//   const handleCameraCapture = (dataUri, setImage, setPreview) => {
//     // Set the captured image and close the camera
//     setCapturedImage(dataUri);
//     setShowCamera(false);
//     // Handle the captured image for preview
//     setPreview(dataUri);
//   };

//   const handleRetake = () => {
//     // Clear the captured image and reopen the camera
//     setCapturedImage(null);
//     setShowCamera(true);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton onClick={() => handleCameraButtonClick(setPreview1)}>
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 640, height: 480 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {capturedImage && (
//             <>
//               <ImagePreview src={capturedImage} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button
//                 onClick={() =>
//                   handleImageChangeFromCamera(
//                     capturedImage,
//                     setImage1,
//                     setPreview1
//                   )
//                 }
//               >
//                 Save
//               </Button>
//             </>
//           )}
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
//           />
//           <CameraButton onClick={() => handleCameraButtonClick(setPreview2)}>
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 640, height: 480 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage2, setPreview2)
//               }
//             />
//           )}
//           {capturedImage && (
//             <>
//               <ImagePreview src={capturedImage} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button
//                 onClick={() =>
//                   handleImageChangeFromCamera(
//                     capturedImage,
//                     setImage2,
//                     setPreview2
//                   )
//                 }
//               >
//                 Save
//               </Button>
//             </>
//           )}
//           {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//===========================================>>Single image working
// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineCamera } from "react-icons/ai";
// import Camera from "react-html5-camera-photo"; // Import the camera component
// import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const handleImageChangeFromCamera = (
//     capturedImage,
//     setImage,
//     setPreview,
//     dataUri
//   ) => {
//     // Set the captured image and preview for further processing
//     setImage(dataUri);
//     setPreview(dataUri);
//   };

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const handleCameraButtonClick = () => {
//     // Toggle the camera visibility
//     setShowCamera(!showCamera);
//   };

//   const handleCameraCapture = (dataUri, setImage, setPreview) => {
//     // Set the captured image and close the camera
//     setCapturedImage(dataUri);
//     setShowCamera(false);
//     // Handle the captured image for preview
//     setPreview(dataUri);
//   };

//   const handleRetake = () => {
//     // Clear the captured image and reopen the camera
//     setCapturedImage(null);
//     setShowCamera(true);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <CameraButton onClick={() => handleCameraButtonClick(setPreview1)}>
//             <AiOutlineCamera /> Capture
//           </CameraButton>
//           {showCamera && (
//             <Camera
//               isFullscreen={false}
//               idealResolution={{ width: 640, height: 480 }}
//               onTakePhoto={(dataUri) =>
//                 handleCameraCapture(dataUri, setImage1, setPreview1)
//               }
//             />
//           )}
//           {capturedImage && (
//             <>
//               <ImagePreview src={capturedImage} alt="Captured Preview" />
//               <Button onClick={handleRetake}>Retake</Button>
//               <Button
//                 onClick={() =>
//                   handleImageChangeFromCamera(
//                     capturedImage,
//                     setImage1,
//                     setPreview1
//                   )
//                 }
//               >
//                 Save
//               </Button>
//             </>
//           )}
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

// ///==========================================>>Okas
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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
// const CameraButton = styled.button`
//   /* Add styles for the camera button */
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-left: 10px;
//   cursor: pointer;
// `;
// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
//           />
//           {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Challan Copy:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage3, setPreview3)}
//           />
//           {preview3 && <ImagePreview src={preview3} alt="Preview" />}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
//====================================>>>Trail4
// // PopupForm.js

// import React, { useState } from "react";
// import styled from "styled-components";
// import Camera, { FACING_MODES } from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   display: none;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
//   border-radius: 8px;
// `;

// const CameraButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const CameraContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 400px; /* Adjust max-width as needed */
//   margin: 0 auto;
//   display: ${({ visible }) => (visible ? "block" : "none")};
// `;

// const CameraPreview = styled.img`
//   width: 100%;
//   max-height: 300px; /* Adjust max-height as needed */
//   border-radius: 8px;
//   margin-top: 10px;
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
//   const [image1, setImage1] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [cameraVisible, setCameraVisible] = useState(false);
//   const [cameraImage, setCameraImage] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleTakePhoto = (dataUri) => {
//     setCameraImage(dataUri);
//     setPreview1(dataUri);
//     setCameraVisible(false);
//   };

//   const handleCameraButtonClick = () => {
//     setCameraVisible(true);
//   };

//   const handleRetake = () => {
//     setCameraImage(null);
//     setPreview1(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", cameraImage || image1);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Image uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading image:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           <ImagePreview src={preview1} alt="Preview" />
//           <CameraButton onClick={handleCameraButtonClick}>Camera</CameraButton>
//         </Label>

//         <CameraContainer visible={cameraVisible}>
//           <Camera
//             idealFacingMode={FACING_MODES.ENVIRONMENT}
//             idealResolution={{ width: 640, height: 480 }}
//             onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
//           />
//           {cameraImage && (
//             <>
//               <CameraPreview src={cameraImage} alt="Preview" />
//               <button onClick={handleRetake}>Retake</button>
//             </>
//           )}
//         </CameraContainer>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//==================================trail3
// // PopupForm.js

// import React, { useState } from "react";
// import styled from "styled-components";
// import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
//   border-radius: 8px;
// `;

// const CameraContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 400px; /* Adjust max-width as needed */
//   margin: 0 auto;
// `;

// const CameraPreview = styled.img`
//   width: 100%;
//   max-height: 300px; /* Adjust max-height as needed */
//   border-radius: 8px;
//   margin-top: 10px;
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
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);
//   const [cameraImage, setCameraImage] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleTakePhoto = (dataUri) => {
//     setCameraImage(dataUri);
//     setPreview3(dataUri);
//   };

//   const handleRetake = () => {
//     setCameraImage(null);
//     setPreview3(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", cameraImage || image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
//           />
//           {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Challan Copy:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage3, setPreview3)}
//           />
//           {preview3 && <ImagePreview src={preview3} alt="Preview" />}
//         </Label>

//         <CameraContainer>
//           <Camera
//             idealFacingMode={FACING_MODES.ENVIRONMENT}
//             idealResolution={{ width: 640, height: 480 }}
//             onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
//           />
//           {cameraImage && (
//             <>
//               <CameraPreview src={cameraImage} alt="Preview" />
//               <button onClick={handleRetake}>Retake</button>
//             </>
//           )}
//         </CameraContainer>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//====================================================>>>Trail2 camera working
// // PopupForm.js

// import React, { useState } from "react";
// import styled from "styled-components";
// import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css"; // Import the CSS file

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   text-align: center;
// `;

// const CameraContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 400px; // Adjust max-width as needed
//   margin: 0 auto;
// `;

// const CameraPreview = styled.img`
//   width: 100%;
//   max-height: 300px; // Adjust max-height as needed
//   border-radius: 8px;
//   margin-top: 10px;
// `;

// const PopupForm = ({ onClose }) => {
//   const [image, setImage] = useState(null);

//   const handleTakePhoto = (dataUri) => {
//     setImage(dataUri);
//   };

//   const handleRetake = () => {
//     setImage(null);
//   };

//   const handleSave = () => {
//     // Implement logic to save the image (e.g., send it to the server)
//     console.log("Save image:", image);
//     onClose();
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Take Photo for Farmer</h2>
//         <CameraContainer>
//           {image ? (
//             <>
//               <CameraPreview src={image} alt="Preview" />
//               <button onClick={handleRetake}>Retake</button>
//               <button onClick={handleSave}>Save</button>
//             </>
//           ) : (
//             <Camera
//               idealFacingMode={FACING_MODES.ENVIRONMENT}
//               idealResolution={{ width: 640, height: 480 }}
//               imageType={IMAGE_TYPES.JPG}
//               imageCompression={0.97}
//               onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
//             />
//           )}
//         </CameraContainer>
//         <button onClick={onClose}>Close</button>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//========================================================>>>Trail
// import React, { useState } from "react";
// import styled from "styled-components";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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

// const CameraButton = styled(Button)`
//   background-color: #2ecc71;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);
//   const [activeInput, setActiveInput] = useState(null);

//   const openCamera = (input) => {
//     setActiveInput(input);
//   };

//   const closeCamera = () => {
//     setActiveInput(null);
//   };

//   const handleImageChange = (image) => {
//     // Handle image upload for farmer_photo
//     if (image instanceof Blob) {
//       const file = new File([image], "camera-photo.jpg", {
//         type: "image/jpeg",
//       });
//       setImage1(file);
//       previewImage(image, "image-preview1");
//     }
//   };

//   const previewImage = (image, previewId) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const preview = document.getElementById(previewId);
//       if (preview) {
//         preview.src = reader.result;
//       }
//     };
//     reader.readAsDataURL(image);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           {activeInput === "image1" ? (
//             <Camera
//               onTakePhoto={(dataUri) =>
//                 handleImageChange(dataUri, setImage1, setPreview1)
//               }
//             />
//           ) : (
//             <>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageChange(e.target.files[0], setImage1, setPreview1)
//                 }
//               />
//               {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//               <CameraButton onClick={() => openCamera("image1")}>
//                 Open Camera
//               </CameraButton>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           {activeInput === "image2" ? (
//             <Camera
//               onTakePhoto={(dataUri) =>
//                 handleImageChange(dataUri, setImage2, setPreview2)
//               }
//             />
//           ) : (
//             <>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageChange(e.target.files[0], setImage2, setPreview2)
//                 }
//               />
//               {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//               <CameraButton onClick={() => openCamera("image2")}>
//                 Open Camera
//               </CameraButton>
//             </>
//           )}
//         </Label>

//         <Label>
//           Farmer Bank Challan Copy:
//           {activeInput === "image3" ? (
//             <Camera
//               onTakePhoto={(dataUri) =>
//                 handleImageChange(dataUri, setImage3, setPreview3)
//               }
//             />
//           ) : (
//             <>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleImageChange(e.target.files[0], setImage3, setPreview3)
//                 }
//               />
//               {preview3 && <ImagePreview src={preview3} alt="Preview" />}
//               <CameraButton onClick={() => openCamera("image3")}>
//                 Open Camera
//               </CameraButton>
//             </>
//           )}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//==============================================>>>below code camera not exist
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const Label = styled.label`
//   margin-top: 10px;
//   display: block;
//   color: black;
// `;

// const Input = styled.input`
//   margin-top: 5px;
//   color: green;
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
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
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Passbook:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
//           />
//           {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Challan Copy:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage3, setPreview3)}
//           />
//           {preview3 && <ImagePreview src={preview3} alt="Preview" />}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//=======================================================>>Applyes css 1/01/2024
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px; /* Adjust the width as needed */
// `;

// const ImagePreview = styled.img`
//   width: 50px;
//   height: 50px;
//   margin-top: 10px;
// `;

// const Label = styled.label`
//   margin-top: 10px;
// `;

// const Input = styled.input`
//   margin-top: 5px;
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
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const handleImageChange = (e, setImage, setPreview) => {
//     const file = e.target.files[0];
//     setImage(file);
//     previewImage(file, setPreview);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2 style={{ color: "red" }}>Upload Images for Farmer</h2>
//         {/* <p>Farmer ID: {farmerId}</p>
//   <p>Farmer Field ID: {farmerFieldId}</p>*/}

//         <Label>
//           Farmer Photo:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
//           />
//           {preview1 && <ImagePreview src={preview1} alt="Preview" />}
//         </Label>

//         <Label
//           Farmer Bank Pasl>sbook:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
//           />
//           {preview2 && <ImagePreview src={preview2} alt="Preview" />}
//         </Label>

//         <Label>
//           Farmer Bank Challan Copy:
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage3, setPreview3)}
//           />
//           {preview3 && <ImagePreview src={preview3} alt="Preview" />}
//         </Label>

//         <Button onClick={handleSubmit}>Submit</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//========================================================>>>okay image showing
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [preview1, setPreview1] = useState(null);
//   const [preview2, setPreview2] = useState(null);
//   const [preview3, setPreview3] = useState(null);

//   const handleImage1Change = (e) => {
//     const file = e.target.files[0];
//     setImage1(file);
//     previewImage(file, setPreview1);
//   };

//   const handleImage2Change = (e) => {
//     const file = e.target.files[0];
//     setImage2(file);
//     previewImage(file, setPreview2);
//   };

//   const handleImage3Change = (e) => {
//     const file = e.target.files[0];
//     setImage3(file);
//     previewImage(file, setPreview3);
//   };

//   const previewImage = (file, setPreview) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>
//         <label>
//           Farmer Photo:
//           <input type="file" accept="image/*" onChange={handleImage1Change} />
//           {preview1 && <img src={preview1} alt="Preview" />}
//         </label>
//         <label>
//           Farmer Bank Passbook:
//           <input type="file" accept="image/*" onChange={handleImage2Change} />
//           {preview2 && <img src={preview2} alt="Preview" />}
//         </label>
//         <label>
//           Farmer Bank Challan Copy:
//           <input type="file" accept="image/*" onChange={handleImage3Change} />
//           {preview3 && <img src={preview3} alt="Preview" />}
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//         <button onClick={onClose}>Close</button>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//=============================================================>>>popupis done dynamically
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const PopupForm = ({
//   onClose,
//   farmerId,
//   farmerFieldId,
//   device_uuid,
//   token,
// }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);

//   const handleImage1Change = (e) => {
//     // Handle image upload for farmer_photo
//     const file = e.target.files[0];
//     setImage1(file);
//   };

//   const handleImage2Change = (e) => {
//     // Handle image upload for farmer_bank_passbook
//     const file = e.target.files[0];
//     setImage2(file);
//   };

//   const handleImage3Change = (e) => {
//     // Handle image upload for farmer_bank_challan_copy
//     const file = e.target.files[0];
//     setImage3(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: device_uuid,
//             token: token,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>
//         <label>
//           Farmer Photo:
//           <input type="file" accept="image/*" onChange={handleImage1Change} />
//         </label>
//         <label>
//           Farmer Bank Passbook:
//           <input type="file" accept="image/*" onChange={handleImage2Change} />
//         </label>
//         <label>
//           Farmer Bank Challan Copy:
//           <input type="file" accept="image/*" onChange={handleImage3Change} />
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//         <button onClick={onClose}>Close</button>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;

//====================================================>>>Old popUpForm
// import React, { useState } from "react";
// import styled from "styled-components";

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

// const PopupFormContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const PopupForm = ({ onClose, farmerId, farmerFieldId }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);

//   const handleImage1Change = (e) => {
//     // Handle image upload for farmer_photo
//     const file = e.target.files[0];
//     setImage1(file);
//   };

//   const handleImage2Change = (e) => {
//     // Handle image upload for farmer_bank_passbook
//     const file = e.target.files[0];
//     setImage2(file);
//   };

//   const handleImage3Change = (e) => {
//     // Handle image upload for farmer_bank_challan_copy
//     const file = e.target.files[0];
//     setImage3(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("farmer_id", farmerId);
//       formData.append("farmer_field_id", farmerFieldId);
//       formData.append("farmer_photo", image1);
//       formData.append("farmer_bank_passbook", image2);
//       formData.append("farmer_bank_challan_copy", image3);

//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             device_uuid: "5c5fbbf6-3699-41c7-b8e5-106c2f1b3b69",
//             token: "622e35d1-52cf-4903-abab-09a5eda6f2bb",
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success, e.g., show a success message
//       console.log("Images uploaded successfully");
//       console.log("Send successfully");
//     } catch (error) {
//       // Handle errors, e.g., show an error message
//       console.error("Error uploading images:", error.message);
//     } finally {
//       onClose(); // Close the popup form regardless of success or failure
//     }
//   };

//   return (
//     <PopupFormContainer>
//       <PopupFormContent>
//         <h2>Upload Images for Farmer</h2>
//         <p>Farmer ID: {farmerId}</p>
//         <p>Farmer Field ID: {farmerFieldId}</p>
//         <label>
//           Farmer Photo:
//           <input type="file" accept="image/*" onChange={handleImage1Change} />
//         </label>
//         <label>
//           Farmer Bank Passbook:
//           <input type="file" accept="image/*" onChange={handleImage2Change} />
//         </label>
//         <label>
//           Farmer Bank Challan Copy:
//           <input type="file" accept="image/*" onChange={handleImage3Change} />
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//         <button onClick={onClose}>Close</button>
//       </PopupFormContent>
//     </PopupFormContainer>
//   );
// };

// export default PopupForm;
