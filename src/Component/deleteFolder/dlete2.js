import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";
import Camera from "react-html5-camera-photo"; // Import the camera component
import "react-html5-camera-photo/build/css/index.css"; // Import the camera CSS

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
  width: 400px; /* Adjust the width as needed */
`;

const Label = styled.label`
  margin-top: 10px;
  display: block;
  color: black;
`;

const Input = styled.input`
  margin-top: 5px;
  color: green;
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
  /* Add styles for the camera button */
  background-color: #2ecc71;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
`;

const PopupForm = ({
  onClose,
  farmerId,
  farmerFieldId,
  device_uuid,
  token,
}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    previewImage(file, setPreview);
  };

  const handleCameraButtonClick = () => {
    // Toggle the camera visibility
    setShowCamera(!showCamera);
  };

  const handleCameraCapture = (dataUri) => {
    // Set the captured image and close the camera
    setCapturedImage(dataUri);
    setShowCamera(false);
  };

  const handleRetake = () => {
    // Clear the captured image and reopen the camera
    setCapturedImage(null);
    setShowCamera(true);
  };

  const previewImage = (file, setPreview) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("farmer_id", farmerId);
      formData.append("farmer_field_id", farmerFieldId);
      formData.append("farmer_photo", image1);
      formData.append("farmer_bank_passbook", image2);
      formData.append("farmer_bank_challan_copy", image3);

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

      // Handle success, e.g., show a success message
      console.log("Images uploaded successfully");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error uploading images:", error.message);
    } finally {
      onClose(); // Close the popup form regardless of success or failure
    }
  };

  return (
    <PopupFormContainer>
      <PopupFormContent>
        <h2>Upload Images for Farmer</h2>
        <p>Farmer ID: {farmerId}</p>
        <p>Farmer Field ID: {farmerFieldId}</p>

        <Label>
          Farmer Photo:
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
          />
          <CameraButton onClick={handleCameraButtonClick}>
            <AiOutlineCamera /> Capture
          </CameraButton>
          {showCamera && (
            <Camera
              isFullscreen={false}
              idealResolution={{ width: 640, height: 480 }}
              onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
            />
          )}
          {capturedImage && (
            <>
              <ImagePreview src={capturedImage} alt="Captured Preview" />
              <Button onClick={handleRetake}>Retake</Button>
              <Button
                onClick={() =>
                  handleImageChangeFromCamera(
                    capturedImage,
                    setImage1,
                    setPreview1
                  )
                }
              >
                Save
              </Button>
            </>
          )}
          {preview1 && <ImagePreview src={preview1} alt="Preview" />}
        </Label>

        <Label>
          Farmer Photo:
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
          />
          <CameraButton onClick={handleCameraButtonClick}>
            <AiOutlineCamera /> Capture
          </CameraButton>
          {showCamera && (
            <Camera
              isFullscreen={false}
              idealResolution={{ width: 640, height: 480 }}
              onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
            />
          )}
          {capturedImage && (
            <>
              <ImagePreview src={capturedImage} alt="Captured Preview" />
              <Button onClick={handleRetake}>Retake</Button>
              <Button
                onClick={() =>
                  handleImageChangeFromCamera(
                    capturedImage,
                    setImage2,
                    setPreview2
                  )
                }
              >
                Save
              </Button>
            </>
          )}
          {preview2 && <ImagePreview src={preview2} alt="Preview" />}
        </Label>

        <Label>
          Farmer Photo:
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setImage3, setPreview3)}
          />
          <CameraButton onClick={handleCameraButtonClick}>
            <AiOutlineCamera /> Capture
          </CameraButton>
          {showCamera && (
            <Camera
              isFullscreen={false}
              idealResolution={{ width: 640, height: 480 }}
              onTakePhoto={(dataUri) => handleCameraCapture(dataUri)}
            />
          )}
          {capturedImage && (
            <>
              <ImagePreview src={capturedImage} alt="Captured Preview" />
              <Button onClick={handleRetake}>Retake</Button>
              <Button
                onClick={() =>
                  handleImageChangeFromCamera(
                    capturedImage,
                    setImage3,
                    setPreview3
                  )
                }
              >
                Save
              </Button>
            </>
          )}
          {preview3 && <ImagePreview src={preview3} alt="Preview" />}
        </Label>
        <Button onClick={handleSubmit}>Submit</Button>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupFormContent>
    </PopupFormContainer>
  );
};

export default PopupForm;
