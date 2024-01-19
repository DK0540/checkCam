import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const Body = styled.body`
  margin: 0;
  background-color: yellow; /* Set the background color for the entire page */
`;

const HomePageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #59d9cc;
  color: white;
  min-height: 100vh; /* Set minimum height to fill the viewport */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardContainer = styled.div``;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
  padding: 16px;
  margin: 16px 0;
  background-color: white;
  color: black;
  position: relative;

  // Add some styles for the button
  .openPopupButton {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border: none;
  border-radius: 3px;
  margin-right: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

// Styled component for the popup
const PopupContainer = styled.div`
  padding: 20px;
  background-color: white;
  color: black;
`;

Modal.setAppElement("#root");

const HomePage = ({ userData, device_uuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
  const token = userData.token;

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrlBase}${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
          device_uuid: device_uuid,
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      // Sorting items by farmer_name
      const sortedItems = result.items.sort((a, b) =>
        a.farmer_name.localeCompare(b.farmer_name)
      );

      setData({ items: sortedItems });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [device_uuid, token, searchTerm]);

  const handleFilterClick = () => {
    fetchData();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenPopup = (farmer) => {
    setSelectedFarmer(farmer);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedFarmer(null);
    setPopupOpen(false);
  };

  return (
    <Body>
      <HomePageContainer>
        <h1>Data from API</h1>
        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {/*<FilterButton onClick={handleFilterClick}>Filter</FilterButton>*/}
        <CardContainer>
          {data.items &&
            data.items.map((item, index) => (
              <Card key={index}>
                <p>
                  Farmer: {item.farmer_name} {item.farmer_code}
                </p>
                <p> Survey No: {item.farmer_survey_no}</p>
                <button
                  className="openPopupButton"
                  onClick={() => handleOpenPopup(item)}
                >
                  Open Popup
                </button>
                <hr />
              </Card>
            ))}
        </CardContainer>
        <Modal
          isOpen={isPopupOpen}
          onRequestClose={handleClosePopup}
          contentLabel="Popup Modal"
        >
          {selectedFarmer && (
            <PopupContainer>
              <h2>Farmer Details</h2>
              <p>Farmer ID: {selectedFarmer.farmer_id}</p>
              <p>Farmer Field ID: {selectedFarmer.farmer_field_id}</p>
              {/* Add more details as needed */}
              <button onClick={handleClosePopup}>Close Popup</button>
            </PopupContainer>
          )}
        </Modal>
      </HomePageContainer>
    </Body>
  );
};

export default HomePage;
