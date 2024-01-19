//====================================================>>>
import React from "react";
import styled from "styled-components";
import { FaCamera, FaFile } from "react-icons/fa";

const FarmerPhotoContainer = styled.div`
  background-color: #f3f3f3ed; /* Set red background color */
  padding: 10px;
  border-bottom: 2px solid gray;
  border-top: 2px solid gray;
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
  background-color: green; /* Set green button color */
  color: white;
  padding: 3px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  width: 70px;
  font-size: 17px;
  margin-bottom: 0; /* Remove bottom margin */
`;

const FileUploadButton = styled.label`
  background-color: blue; /* Set blue button color */
  color: white;
  padding: 3px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  width: 64px;
  text-align: center;
  font-size: 18px;
`;

const FarmerPhotoPrview = styled.div`
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

const FarmerPhotoText = styled.p`
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

const FarmerPhotoSection = ({
  handleOpenCamera,
  handleFileUpload,
  showCamera,
  capturedImage,
  location,
  farmerPhoto,
  CameraView,
  handleCapture,
  handleCameraClose,
}) => {
  return (
    <FarmerPhotoContainer id="farmerPhotoContainer">
      <Headp>Farmer Photo</Headp>
      <ButtonContainer>
        {/* Camera button */}
        <CameraButton onClick={handleOpenCamera}>
          <FaCamera />
        </CameraButton>

        {/* File upload button */}
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {/* Farmer Photo Preview or Empty Text */}
      {showCamera && (
        <CameraView onCapture={handleCapture} onClose={handleCameraClose} />
      )}
      {capturedImage && location && (
        <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>
      )}
      {farmerPhoto ? null : <FarmerPhotoText>Empty</FarmerPhotoText>}
    </FarmerPhotoContainer>
  );
};

export default FarmerPhotoSection;

//===================================================>>working good css
// import React from "react";
// import styled from "styled-components";
// import { FaCamera, FaFile } from "react-icons/fa";

// const FarmerPhotoContainer = styled.div`
//   background-color: red; /* Set red background color */
//   padding: 10px;
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
//   background-color: green; /* Set green button color */
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;

//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0; /* Remove bottom margin */
// `;

// const FileUploadButton = styled.label`
//   background-color: blue; /* Set blue button color */
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;

//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const FarmerPhotoPrview = styled.div`
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

// const FarmerPhotoText = styled.p`
//   max-width: 150px;
//   height: 130px;

//   margin-top: -81px;

//   color: white;
//   font-size: 16px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dashed white;
//   border-radius: 8px;
// `;

// const FarmerPhotoSection = ({
//   handleOpenCamera,
//   handleFileUpload,
//   showCamera,
//   capturedImage,
//   location,
//   farmerPhoto,
//   CameraView,
//   handleCapture,
//   handleCameraClose,
// }) => {
//   return (
//     <FarmerPhotoContainer>
//       <ButtonContainer>
//         {/* Camera button */}
//         <CameraButton onClick={handleOpenCamera}>
//           <FaCamera />
//         </CameraButton>

//         {/* File upload button */}
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {/* Farmer Photo Preview */}
//       {showCamera && (
//         <CameraView onCapture={handleCapture} onClose={handleCameraClose} />
//       )}
//       {(capturedImage && location) || farmerPhoto ? (
//         <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>
//       ) : (
//         <FarmerPhotoText>Empty</FarmerPhotoText>
//       )}
//     </FarmerPhotoContainer>
//   );
// };

// export default FarmerPhotoSection;

//=================================>>All set
// import React from "react";
// import styled from "styled-components";
// import { FaCamera, FaFile } from "react-icons/fa";

// const FarmerPhotoContainer = styled.div`
//   background-color: red; /* Set red background color */
//   padding: 10px;
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
//   background-color: green; /* Set green button color */
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;

//   width: 70px;
//   font-size: 17px;
//   margin-bottom: 0; /* Remove bottom margin */
// `;

// const FileUploadButton = styled.label`
//   background-color: blue; /* Set blue button color */
//   color: white;
//   padding: 3px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;

//   width: 64px;
//   text-align: center;
//   font-size: 18px;
// `;

// const FarmerPhotoPrview = styled.div`
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

// const FarmerPhotoSection = ({
//   handleOpenCamera,
//   handleFileUpload,
//   showCamera,
//   capturedImage,
//   location,
//   farmerPhoto,
//   CameraView,
//   handleCapture,
//   handleCameraClose,
// }) => {
//   return (
//     <FarmerPhotoContainer>
//       <ButtonContainer>
//         {/* Camera button */}
//         <CameraButton onClick={handleOpenCamera}>
//           <FaCamera />
//         </CameraButton>

//         {/* File upload button */}
//         <FileUploadButton>
//           <FaFile />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//         </FileUploadButton>
//       </ButtonContainer>

//       {/* Farmer Photo Preview */}
//       {showCamera && (
//         <CameraView onCapture={handleCapture} onClose={handleCameraClose} />
//       )}
//       {capturedImage && location && (
//         <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>
//       )}
//     </FarmerPhotoContainer>
//   );
// };

// export default FarmerPhotoSection;

/////////////////////////css okay
// import React from "react";
// import styled from "styled-components";
// import { FaCamera, FaFile } from "react-icons/fa";

// const FarmerPhotoContainer = styled.div`
//   background-color: red; /* Set red background color */
//   padding: 10px;
// `;

// const CameraButton = styled.button`
//   background-color: green; /* Set green button color */
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   font-size: 12px;
//   margin-right: 10px;
// `;

// const FileUploadButton = styled.label`
//   background-color: blue; /* Set blue button color */
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   font-size: 12px;
// `;

// const FarmerPhotoPrview = styled.div`
//   max-width: 150px;
//   height: 130px;
//   background-color: #2ecc71;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin-top: 10px;
// `;

// const FarmerPhotoSection = ({
//   handleOpenCamera,
//   handleFileUpload,
//   showCamera,
//   capturedImage,
//   location,
//   farmerPhoto,
//   CameraView,
//   handleCapture,
//   handleCameraClose,
// }) => {
//   return (
//     <FarmerPhotoContainer>
//       {/* Camera button */}
//       <CameraButton onClick={handleOpenCamera}>
//         <FaCamera />
//       </CameraButton>

//       {/* File upload button */}
//       <FileUploadButton>
//         <FaFile />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           style={{ display: "none" }}
//         />
//       </FileUploadButton>

//       {/* Farmer Photo Preview */}
//       {showCamera && (
//         <CameraView onCapture={handleCapture} onClose={handleCameraClose} />
//       )}
//       {capturedImage && location && (
//         <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>
//       )}
//     </FarmerPhotoContainer>
//   );
// };

// export default FarmerPhotoSection;

//====================once css applied
// // Import necessary React and styled-components
// import React from "react";
// import styled from "styled-components";
// import { FaCamera, FaFile } from "react-icons/fa";

// // Styled components for the Farmer Photo section
// const FarmerPhotoContainer = styled.div`
//   background-color: red;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
// `;

// const CameraButton = styled.button`
//   background-color: #2ecc71;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

// const FileUploadButton = styled.label`
//   background-color: #3498db;
//   color: white;
//   padding: 8px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

// const FileInput = styled.input`
//   display: none;
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
//   margin-top: 20px;
// `;

// // JSX for the Farmer Photo section
// const FarmerPhotoSection = ({
//   handleOpenCamera,
//   handleFileUpload,
//   showCamera,
//   capturedImage,
//   location,
//   farmerPhoto,
// CameraView,
// handleCapture,
// handleCameraClose,
//   TableContainer,
// }) => {
//   return (
//     <FarmerPhotoContainer>
//       <ButtonContainer>
//         <CameraButton onClick={handleOpenCamera}>
//           <FaCamera />
//         </CameraButton>
//         <FileUploadButton>
//           <FaFile />

//           <FileInput type="file" accept="image/*" onChange={handleFileUpload} />
//         </FileUploadButton>
//       </ButtonContainer>
//       {showCamera && (
//         <CameraView onCapture={handleCapture} onClose={handleCameraClose} />
//       )}
//       <TableContainer>
//         {capturedImage && location && (
//           <FarmerPhotoPrview imageUrl={farmerPhoto}></FarmerPhotoPrview>
//         )}
//       </TableContainer>
//     </FarmerPhotoContainer>
//   );
// };

// export default FarmerPhotoSection;
