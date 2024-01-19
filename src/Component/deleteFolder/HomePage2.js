import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopupForm from "./PopupForm";

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
`;

const SearchInput = styled.input`
  padding: 5px;
  border: none;
  border-radius: 3px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const PopupButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const HomePage = ({ userData, device_uuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = () => {
    fetchData();
  };

  const openPopup = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const closePopup = () => {
    setSelectedFarmer(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const farmerData =
    data && data.items
      ? data.items.map((item) => ({
          farmer_id: item.farmer_id,
          farmer_name: item.farmer_name,
          farmer_survey_no: item.farmer_survey_no,
          farmer_name_title: item.farmer_name_title,
          farmer_father: item.farmer_father,
        }))
      : [];
  // console.log(farmerData);

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
        {/* <SearchButton onClick={handleSearch}>Search</SearchButton>*/}
        <CardContainer>
          {farmerData.map((farmer, index) => (
            <Card key={index}>
              <p>Farmer ID: {farmer.farmer_id}</p>
              <p>Farmer Name: {farmer.farmer_name}</p>
              <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
              <PopupButton onClick={() => openPopup(farmer)}>
                Upload Images
              </PopupButton>
              <hr />
            </Card>
          ))}
        </CardContainer>
        {selectedFarmer && (
          <PopupForm
            onClose={closePopup}
            farmerId={selectedFarmer.farmer_id}
            farmerFieldId={selectedFarmer.farmer_survey_no}
            device_uuid={device_uuid}
            token={token}
          />
        )}
      </HomePageContainer>
    </Body>
  );
};

export default HomePage;

//==================================>>fixing search blicking
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import PopupForm from "./PopupForm";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const SearchButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const PopupButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         {/* <SearchButton onClick={handleSearch}>Search</SearchButton>*/}
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <PopupButton onClick={() => openPopup(farmer)}>
//                 Upload Images
//               </PopupButton>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//         {selectedFarmer && (
//           <PopupForm
//             onClose={closePopup}
//             farmerId={selectedFarmer.farmer_id}
//             farmerFieldId={selectedFarmer.farmer_survey_no}
//             device_uuid={device_uuid}
//             token={token}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;
//====================================================>>>>Image upload working fine
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const SearchButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const PopupButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

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

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         <SearchButton onClick={handleSearch}>Search</SearchButton>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <PopupButton onClick={() => openPopup(farmer)}>
//                 Upload Images
//               </PopupButton>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//         {selectedFarmer && (
//           <PopupForm
//             onClose={closePopup}
//             farmerId={selectedFarmer.farmer_id}
//             farmerFieldId={selectedFarmer.farmer_survey_no}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;
//==========================================================>>>>
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const SearchButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const PopupButton = styled.button`
//   background-color: #3498db;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

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

//   const handleSubmit = async () => {
//     // Implement logic to send images to the server using the API
//     const formData = new FormData();
//     formData.append("farmer_id", farmerId);
//     formData.append("farmer_field_id", farmerFieldId);
//     formData.append("farmer_photo", image1);
//     formData.append("farmer_bank_passbook", image2);
//     formData.append("farmer_bank_challan_copy", image3);

//     try {
//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/farmer-doc/save",
//         {
//           method: "POST",
//           headers: {
//             // Include any necessary headers (e.g., authorization)
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload images");
//       }

//       // Handle success
//       console.log("Images uploaded successfully");
//     } catch (error) {
//       // Handle error
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

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         <SearchButton onClick={handleSearch}>Search</SearchButton>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <PopupButton onClick={() => openPopup(farmer)}>
//                 Upload Images
//               </PopupButton>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//         {selectedFarmer && (
//           <PopupForm
//             onClose={closePopup}
//             farmerId={selectedFarmer.farmer_id}
//             farmerFieldId={selectedFarmer.farmer_survey_no}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

// // ... (previous imports)  ==================================//popup along with id is coming
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Modal from "react-modal";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
//   position: relative;

//   // Add some styles for the button
//   .openPopupButton {
//     position: absolute;
//     bottom: 10px;
//     right: 10px;
//     padding: 8px 16px;
//     background-color: #4caf50;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const FilterButton = styled.button`
//   padding: 8px 16px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-left: 10px;
// `;

// // Styled component for the popup
// const PopupContainer = styled.div`
//   padding: 20px;
//   background-color: white;
//   color: black;
// `;

// Modal.setAppElement("#root");
// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const [selectedFarmer, setSelectedFarmer] = useState(null);

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();

//       // Sorting items by farmer_name
//       const sortedItems = result.items.sort((a, b) =>
//         a.farmer_name.localeCompare(b.farmer_name)
//       );

//       setData({ items: sortedItems });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleFilterClick = () => {
//     fetchData();
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleOpenPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setSelectedFarmer(null);
//     setPopupOpen(false);
//   };

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         {/*<FilterButton onClick={handleFilterClick}>Filter</FilterButton>*/}
//         <CardContainer>
//           {data.items &&
//             data.items.map((item, index) => (
//               <Card key={index}>
//                 <p>
//                   Farmer: {item.farmer_name} {item.farmer_code}
//                 </p>
//                 <p> Survey No: {item.farmer_survey_no}</p>
//                 <button
//                   className="openPopupButton"
//                   onClick={() => handleOpenPopup(item)}
//                 >
//                   Open Popup
//                 </button>
//                 <hr />
//               </Card>
//             ))}
//         </CardContainer>
//         <Modal
//           isOpen={isPopupOpen}
//           onRequestClose={handleClosePopup}
//           contentLabel="Popup Modal"
//         >
//           {selectedFarmer && (
//             <PopupContainer>
//               <h2>Farmer Details</h2>
//               <p>Farmer ID: {selectedFarmer.farmer_id}</p>
//               <p>Farmer Field ID: {selectedFarmer.farmer_field_id}</p>
//               {/* Add more details as needed */}
//               <button onClick={handleClosePopup}>Close Popup</button>
//             </PopupContainer>
//           )}
//         </Modal>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//=============================================================>>Popup is working
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Modal from "react-modal";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
//   position: relative;

//   // Add some styles for the button
//   .openPopupButton {
//     position: absolute;
//     bottom: 10px;
//     right: 10px;
//     padding: 8px 16px;
//     background-color: #4caf50;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const FilterButton = styled.button`
//   padding: 8px 16px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-left: 10px;
// `;

// // Styled component for the popup
// const PopupContainer = styled.div`
//   padding: 20px;
//   background-color: white;
//   color: black;
// `;

// Modal.setAppElement("#root");

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();

//       // Sorting items by farmer_name
//       const sortedItems = result.items.sort((a, b) =>
//         a.farmer_name.localeCompare(b.farmer_name)
//       );

//       setData({ items: sortedItems });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleFilterClick = () => {
//     fetchData();
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleOpenPopup = () => {
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//   };

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         {/* <FilterButton onClick={handleFilterClick}>Filter</FilterButton> */}
//         <CardContainer>
//           {data.items &&
//             data.items.map((item, index) => (
//               <Card key={index}>
//                 <p>Farmer ID: {item.farmer_id}</p>
//                 <p>Farmer Name: {item.farmer_name}</p>
//                 <p>Farmer Survey No: {item.farmer_survey_no}</p>
//                 <button className="openPopupButton" onClick={handleOpenPopup}>
//                   Open Popup
//                 </button>
//                 <Modal
//                   isOpen={isPopupOpen}
//                   onRequestClose={handleClosePopup}
//                   contentLabel="Popup Modal"
//                 >
//                   <PopupContainer>
//                     <h2>Popup Content</h2>
//                     <p>Details for {item.farmer_name}</p>
//                     <button onClick={handleClosePopup}>Close Popup</button>
//                   </PopupContainer>
//                 </Modal>
//                 <hr />
//               </Card>
//             ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//=======================================================>>>letters arranged
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
//   width: 300px;
// `;

// const SearchInput = styled.input`
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   margin-right: 10px;
// `;

// const FilterButton = styled.button`
//   padding: 10px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();

//       // Sorting items by farmer_name
//       const sortedItems = result.items.sort((a, b) =>
//         a.farmer_name.localeCompare(b.farmer_name)
//       );

//       setData({ items: sortedItems });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleFilterClick = () => {
//     fetchData();
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         <FilterButton onClick={handleFilterClick}>Filter</FilterButton>
//         <CardContainer>
//           {data.items &&
//             data.items.map((item, index) => (
//               <Card key={index}>
//                 <p>Farmer ID: {item.farmer_id}</p>
//                 <p>Farmer Name: {item.farmer_name}</p>
//                 <p>Farmer Survey No: {item.farmer_survey_no}</p>
//                 <hr />
//               </Card>
//             ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;
//=======================================================>>filter is working fine
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
//   width: 300px;
// `;

// const SearchInput = styled.input`
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   margin-right: 10px;
// `;

// const FilterButton = styled.button`
//   padding: 10px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleFilterClick = () => {
//     fetchData();
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         {/* <FilterButton onClick={handleFilterClick}>Filter</FilterButton>*/}
//         <CardContainer>
//           {data.items &&
//             data.items.map((item, index) => (
//               <Card key={index}>
//                 <p>Farmer ID: {item.farmer_id}</p>
//                 <p>Farmer Name: {item.farmer_name}</p>
//                 <p>Farmer Survey No: {item.farmer_survey_no}</p>
//                 <hr />
//               </Card>
//             ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//========================================================>>>responsive cards with filter
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
//   width: 300px;
// `;

// const SearchInput = styled.input`
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   margin-bottom: 20px;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//========================================================>>>>filetr is working
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//         headers: {
//           "Content-Type": "application/json",
//           device_uuid: device_uuid,
//           token: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleSearch = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     fetchData();
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <form onSubmit={handleSearch}>
//           <SearchInput
//             type="text"
//             placeholder="Search by name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </form>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//===================================================>>Search function working but having bug
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrlBase = "https://sfamsserver.in/api/admin/farmer-feild/0?q=";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//============================================>>>Search input added
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: none;
//   border-radius: 3px;
//   margin-right: 10px;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//         />
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//=============================================================>>> Cards are updated and added farms details
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <p>Farmer Survey No: {farmer.farmer_survey_no}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//======================================================>>>Card css applied
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #59d9cc;
//   color: white;
//   min-height: 100vh; /* Set minimum height to fill the viewport */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const CardContainer = styled.div``;

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgb(0 0 0 / 34%);
//   padding: 16px;
//   margin: 16px 0;
//   background-color: white;
//   color: black;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//         }))
//       : [];

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Data from API</h1>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p>Farmer ID: {farmer.farmer_id}</p>
//               <p>Farmer Name: {farmer.farmer_name}</p>
//               <hr />
//             </Card>
//           ))}
//         </CardContainer>
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

//=========================================================>>Basic card applied
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import "./Login.css"; // Import the CSS file
// import img from "./assets/vlogo.png";
// import { v4 as uuidv4 } from "uuid";

// import styled from "styled-components";

// const HomePageContainer = styled.div`
//   margin: 0 auto;

//   padding: 20px;
//   background-color: gray;
//   color: white;
//   height: 800px; /* Set the screen height */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   @media (max-width: 360px) {
//     /* Adjust styles for smaller screens */
//   }
// `;

// const CardContainer = styled.div`
//   background-color: red;
//   @media (max-width: 360px) {
//     /* Adjust styles for smaller screens */
//   }
// `;
// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   margin: 16px 0;
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Check if data.items is undefined before using map
//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//         }))
//       : [];

//   return (
//     <HomePageContainer>
//       <h1>Data from API</h1>
//       {/* Display the extracted farmer data in cards */}
//       <CardContainer>
//         {farmerData.map((farmer, index) => (
//           <Card key={index}>
//             <p>Farmer ID: {farmer.farmer_id}</p>
//             <p>Farmer Name: {farmer.farmer_name}</p>
//             <hr />
//           </Card>
//         ))}
//       </CardContainer>
//     </HomePageContainer>
//   );
// };

// export default HomePage;
//=======================================================>>Showing formername and id
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Login.css"; // Import the CSS file
// import img from "./assets/vlogo.png";
// import { v4 as uuidv4 } from "uuid";

// import styled from "styled-components";

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   text-align: center;
//   padding: 20px;
//   background-color: gray;
//   color: white;
//   height: 800px; /* Set the screen height */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   @media (max-width: 360px) {
//     /* Adjust styles for smaller screens */
//     margin-top: 20px;
//   }
// `;

// // ... (previous imports and styled components)

// // ... (previous imports and styled components)
// // ... (previous imports and styled components)

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Check if data.items is undefined before using map
//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//         }))
//       : [];

//   return (
//     <HomePageContainer className="login-container">
//       <div>
//         <h1>Data from API</h1>
//         {/* Display the extracted farmer data */}
//         {farmerData.map((farmer, index) => (
//           <div key={index}>
//             <p>Farmer ID: {farmer.farmer_id}</p>
//             <p>Farmer Name: {farmer.farmer_name}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//     </HomePageContainer>
//   );
// };

// export default HomePage;

//==========================================================>>Showing former_name
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Login.css"; // Import the CSS file
// import img from "./assets/vlogo.png";
// import { v4 as uuidv4 } from "uuid";

// import styled from "styled-components";

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   text-align: center;
//   padding: 20px;
//   background-color: gray;
//   color: white;
//   height: 800px; /* Set the screen height */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   @media (max-width: 360px) {
//     /* Adjust styles for smaller screens */
//     margin-top: 20px;
//   }
// `;

// // ... (previous imports and styled components)

// // ... (previous imports and styled components)
// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const token = userData.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [device_uuid, token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Check if data.items is undefined before using map
//   const farmerNames =
//     data && data.items ? data.items.map((item) => item.farmer_name) : [];

//   return (
//     <HomePageContainer className="login-container">
//       <div>
//         <h1>Data from API</h1>
//         {/* Display the extracted farmer names */}
//         {farmerNames.map((farmerName, index) => (
//           <div key={index}>
//             <p>Farmer Name: {farmerName}</p>
//             <hr />
//           </div>
//         ))}
//         {/* Display the data from the API in a more readable format */}
//       </div>
//     </HomePageContainer>
//   );
// };

// export default HomePage;

//=============================================================>>>All data getting
// // src/components/Login.js

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Login.css"; // Import the CSS file
// import img from "./assets/vlogo.png";
// import { v4 as uuidv4 } from "uuid";

// import styled from "styled-components";

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   text-align: center;
//   padding: 20px;
//   background-color: gray;
//   color: white;
//   height: 800px; /* Set the screen height */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   @media (max-width: 360px) {
//     /* Adjust styles for smaller screens */
//     margin-top: 20px;
//   }
// `;

// const HomePage = ({ userData, device_uuid }) => {
//   const [data, setData] = useState([]);
//   // State to store loading status
//   const [loading, setLoading] = useState(true);
//   // State to store error, if any
//   const [error, setError] = useState(null);

//   // API details
//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   // const device_uuid = "123456";
//   const token = userData.token;

//   useEffect(() => {
//     // Function to fetch data from the API
//     const fetchData = async () => {
//       try {
//         // Set loading to true while fetching data
//         setLoading(true);

//         // Make API request with headers including device_uuid and token
//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         // Check if the request was successful
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         // Parse the JSON response
//         const result = await response.json();

//         // Set the fetched data to the state
//         setData(result);

//         // Log the data to the console
//         console.log("Fetched Data:", result);
//       } catch (error) {
//         // Set error state if there is an error
//         setError(error.message);
//       } finally {
//         // Set loading to false after fetching data (whether successful or not)
//         setLoading(false);
//       }
//     };

//     // Call the fetchData function
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render error state
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render the fetched data
//   return (
//     <HomePageContainer className="login-container">
//       <div>
//         <h1>Data from API</h1>
//         {/* Display the data in a more readable format */}
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       </div>
//     </HomePageContainer>
//   );
// };

// export default HomePage;
//=========================================================>>>>>>Okay
// import React, { useState, useEffect } from "react";

// const HomePage = ({ userData, device_uuid }) => {
//   // State to store the fetched data
//   const [data, setData] = useState([]);
//   // State to store loading status
//   const [loading, setLoading] = useState(true);
//   // State to store error, if any
//   const [error, setError] = useState(null);

//   // API details
//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   // const device_uuid = "123456";
//   const token = userData.token;

//   useEffect(() => {
//     // Function to fetch data from the API
//     const fetchData = async () => {
//       try {
//         // Set loading to true while fetching data
//         setLoading(true);

//         // Make API request with headers including device_uuid and token
//         const response = await fetch(apiUrl, {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         });

//         // Check if the request was successful
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         // Parse the JSON response
//         const result = await response.json();

//         // Set the fetched data to the state
//         setData(result);

//         // Log the data to the console
//         console.log("Fetched Data:", result);
//       } catch (error) {
//         // Set error state if there is an error
//         setError(error.message);
//       } finally {
//         // Set loading to false after fetching data (whether successful or not)
//         setLoading(false);
//       }
//     };

//     // Call the fetchData function
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render error state
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render the fetched data
//   return (
//     <div>
//       <h1>Data from API</h1>
//       {/* Display the data in a more readable format */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default HomePage;

//==========================================================>>>>>
// // HomePage.jsx
// import React, { useEffect } from "react";

// const HomePage = () => {
//   const token = "ce53940c-5aa7-4081-9f6d-ff7cfb146df1";
//   const device_uuid = "123456";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const queryParams = new URLSearchParams({
//           q: "",
//           sort: "status",
//           agent_id: "",
//           page: "0",
//           limit: "60",
//         });

//         const url = `https://sfamsserver.in/api/admin/farmer-feild/0?${queryParams.toString()}`;

//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             "Device-UUID": device_uuid,
//           },
//         });

//         if (response.ok) {
//           const apiData = await response.json();
//           // Log the fetched data to the console
//           console.log("Data from API:", apiData);
//         } else {
//           console.error("Failed to fetch data from API");
//         }
//       } catch (error) {
//         console.error("API error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Welcome to the Home Page!</h2>
//       {/* You can display additional content or actions on the home page */}
//     </div>
//   );
// };

// export default HomePage;

//=============================================>>below getting both uuid and token
// // HomePage.jsx
// import React, { useEffect } from "react";

// const HomePage = ({ userData, device_uuid }) => {
//   useEffect(() => {
//     // Log device_uuid and token to the console when the component mounts
//     console.log("device_uuid", device_uuid);
//     console.log("token", userData.token);

//     // Fetch data or perform other actions as needed
//     // Example: fetchData();
//   }, [userData]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Welcome to the Home Page!</h2>
//       {/* You can display additional content or actions on the home page */}
//     </div>
//   );
// };

// export default HomePage;

//================================================>>>Not working axios
// // HomePage.jsx
// import React, { useEffect } from "react";
// import axios from "axios";

// const HomePage = ({ userData }) => {
//   useEffect(() => {
//     // Fetch data from the new API when the component mounts
//     const fetchData = async () => {
//       try {
//         const queryParams = {
//           q: "",
//           sort: "status",
//           agent_id: "",
//           page: "0",
//           limit: "60",
//           device_uuid: userData.device_uuid,
//         };

//         const response = await axios.get(
//           "https://sfamsserver.in/api/admin/farmer-feild/0",
//           {
//             params: queryParams,
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${userData.token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           // Log the fetched data to the console
//           console.log("Data from API:", response.data);
//         } else {
//           console.error("Failed to fetch data from API");
//         }
//       } catch (error) {
//         console.error("API error:", error);
//       }
//     };

//     fetchData();
//   }, [userData]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Welcome to the Home Page!</h2>
//       {/* You can display additional content or actions on the home page */}
//     </div>
//   );
// };

// export default HomePage;

//======================================================>>>>>> not working
// // HomePage.jsx
// import React, { useEffect } from "react";

// const HomePage = ({ userData }) => {
//   useEffect(() => {
//     // Fetch data from the new API when the component mounts
//     const fetchData = async () => {
//       try {
//         const queryParams = new URLSearchParams({
//           q: "",
//           sort: "status",
//           agent_id: "",
//           page: "0",
//           limit: "60",
//           device_uuid: userData.device_uuid,
//         });

//         const url = `https://sfamsserver.in/api/admin/farmer-feild/0?${queryParams.toString()}`;

//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${userData.token}`,
//           },
//         });

//         if (response.ok) {
//           const apiData = await response.json();
//           // Log the fetched data to the console
//           console.log("Data from API:", apiData);
//         } else {
//           console.error("Failed to fetch data from API");
//         }
//       } catch (error) {
//         console.error("API error:", error);
//       }
//     };

//     fetchData();
//   }, [userData]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Welcome to the Home Page!</h2>
//       {/* You can display additional content or actions on the home page */}
//     </div>
//   );
// };

// export default HomePage;

//=================================================================>>>>>
// // HomePage.jsx
// import React from "react";

// const HomePage = ({ userData }) => {
//   // Log user data to the console when the component mounts
//   React.useEffect(() => {
//     console.log("User Data in HomePage:", userData);
//   }, [userData]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Welcome to the Home Page!</h2>
//       {/* You can display additional content or actions on the home page */}
//     </div>
//   );
// };

// export default HomePage;
