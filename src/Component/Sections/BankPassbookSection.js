import React from "react";
import styled from "styled-components";

import BankPassbookCameraView from "../CamStore/BankPassbookCameraView";
import { FaCamera, FaFile } from "react-icons/fa";

const BankPassbookContainer = styled.div`
  background-color: #dfdfdf;
  padding: 10px;
  border-bottom: 2px solid gray;
`;

const FarmerBankPassbookPreview = styled.div`
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

const BankPassbookPhotoText = styled.p`
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

const BankPassbookSection = ({
  handleBankPassbookOpenCamera,
  handleBankPassbookFileUpload,
  handleBankPassbookCapture,
  bankPassbookLocation,
  showBankPassbookCamera,
  handleBankPassbookCameraClose,

  bankPassbookImage,

  TableContainer,
}) => {
  return (
    <BankPassbookContainer id="bankPassbookContainer">
      <Headp>Bank Passbook</Headp>
      <ButtonContainer>
        <CameraButton onClick={handleBankPassbookOpenCamera}>
          <FaCamera />
        </CameraButton>
        <FileUploadButton>
          <FaFile />
          <input
            type="file"
            accept="image/*"
            onChange={handleBankPassbookFileUpload}
            style={{ display: "none" }}
          />
        </FileUploadButton>
      </ButtonContainer>

      {showBankPassbookCamera && (
        <BankPassbookCameraView
          onCapture={handleBankPassbookCapture}
          onClose={handleBankPassbookCameraClose}
        />
      )}
      {bankPassbookImage && bankPassbookLocation && (
        <FarmerBankPassbookPreview
          imageUrl={bankPassbookImage}
        ></FarmerBankPassbookPreview>
      )}
      {bankPassbookImage ? null : (
        <BankPassbookPhotoText>Empty</BankPassbookPhotoText>
      )}
    </BankPassbookContainer>
  );
};

export default BankPassbookSection;
