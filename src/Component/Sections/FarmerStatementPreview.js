import React from "react";
import styled from "styled-components";

const FarmerStatementPreviewContainer = styled.div`
  max-width: 150px;
  height: 130px;
  background-color: #2ecc71;
  position: relative;
  border-radius: 8px;
  margin-top: -81px;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const FarmerStatementPreview = ({ videoUrl }) => {
  return (
    <FarmerStatementPreviewContainer>
      {videoUrl && <VideoPreview controls src={videoUrl} />}
    </FarmerStatementPreviewContainer>
  );
};

export default FarmerStatementPreview;
