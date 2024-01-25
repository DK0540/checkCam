import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import PopupForm from "./PopupForm";
import Cookies from "js-cookie"; // Import the js-cookie library
import "./HomePage.css";

const Body = styled.body`
  margin: 0;
  background-color: yellow;
`;

const LogoutButton = styled.button`
  background-color: #ff0000;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const HeadSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #38a196;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const ProfileIcon = styled(CgProfile)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

const DropdownContainer = styled.div`
  color: black;
  left: 0px;
  background-color: white;
  font-style: inherit;
  font-weight: 600;

  position: absolute;
  top: 87%;
  left: 0px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  box-shadow: 0 4px 8px rgb(0 0 0 / 38%);
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid gray;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HomePageContainer = styled.div`
  background-color: #38a196;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  margin-top: 80px;
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

const PopupButton = styled.button`
  font-weight: bold;
  background-color: #1f7d6f;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 46px;
  cursor: pointer;
`;

const UserPrName = styled.p`
  position: absolute;
  top: 43px;
  left: 5px;
`;

const HomePage = ({ device_uuid, username }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const apiUrlBase = "/api/pwa/list";
  const defaultParams = "&sort=status&page=0&limit=5";

  // Retrieve the token from cookies
  const token = Cookies.get("userToken");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${apiUrlBase}?q=${searchTerm}${defaultParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            device_uuid: device_uuid,
            token: token,
          },
        }
      );

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const farmerData =
    data && data.items
      ? data.items.map((item) => ({
          farmer_id: item.farmer_id,
          farmer_doc_id: item.farmer_doc_id,
          farmer_name: item.farmer_name,
          farmer_survey_no: item.farmer_survey_no,
          farmer_name_title: item.farmer_name_title,
          farmer_father: item.farmer_father,
          farmer_name: item.farmer_name,
        }))
      : [];

  return (
    <Body>
      <HeadSection>
        <ProfileIcon onClick={toggleDropdown} />
        <DropdownContainer isOpen={dropdownOpen}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownContainer>
        <UserPrName>{username}</UserPrName>
        <h1 style={{ fontSize: "23px" }}>Formers Data</h1>
        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </HeadSection>
      <HomePageContainer>
        <CardContainer>
          {farmerData.map((farmer, index) => (
            <Card key={index}>
              <p className="ftextname"> {farmer.farmer_name}</p>
              <p className="ftext">Farmer ID: {farmer.farmer_id}</p>

              <p className="ftext">
                Farmer Survey No: {farmer.farmer_survey_no}
              </p>
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
            farmerDocId={selectedFarmer.farmer_doc_id}
            device_uuid={device_uuid}
            token={token}
            farmerNameTitle={selectedFarmer.farmer_name_title}
            farmerFather={selectedFarmer.farmer_father}
            farmerName={selectedFarmer.farmer_name}
          />
        )}
      </HomePageContainer>
    </Body>
  );
};

export default HomePage;

///////////////////////////////////////////////////////////////////////old
// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { CgProfile } from "react-icons/cg";
// import PopupForm from "./PopupForm";
// import "./HomePage.css";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;
// const LogoutButton = styled.button`
//   background-color: #ff0000;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const HeadSection = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   background-color: #38a196;
//   padding: 20px;
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1000;
// `;

// const ProfileIcon = styled(CgProfile)`
//   font-size: 20px;
//   cursor: pointer;
//   margin-left: 10px;
// `;

// const DropdownContainer = styled.div`
//   color: black;
//   left: 0px;
//   background-color: white;
//   font-style: inherit;
//   font-weight: 600;

//   position: absolute;
//   top: 87%;
//   left: 0px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   box-shadow: 0 4px 8px rgb(0 0 0 / 38%);
// `;

// const DropdownItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   border-bottom: 1px solid gray;
//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const HomePageContainer = styled.div`
//   background-color: #38a196;
//   margin: 0 auto;
//   padding: 20px;
//   min-height: 100vh;
//   margin-top: 80px;
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

// const PopupButton = styled.button`
//   font-weight: bold;
//   background-color: #1f7d6f;
//   color: #ffffff;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 46px;
//   cursor: pointer;
// `;

// const UserPrName = styled.p`
//   position: absolute;
//   top: 43px;
//   left: 5px;
// `;

// const HomePage = ({ userData, device_uuid, username }) => {
//   const [isLoggedIn, setLoggedIn] = useState(true); // Set initial login status
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Add state for dropdown

//   // const apiUrlBase = "/api/pwa/list?q=&sort=status&page=0&limit=5";
//   // const apiUrlBase = "/api/pwa/list";
//   const apiUrlBase = "/api/pwa/list";
//   const defaultParams = "&sort=status&page=0&limit=5";

//   // const token = userData.token;
//   const token = localStorage.getItem("userToken");
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${apiUrlBase}?q=${searchTerm}${defaultParams}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
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

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//           farmer_name_title: item.farmer_name_title,
//           farmer_father: item.farmer_father,
//           farmer_name: item.farmer_name,
//         }))
//       : [];
//   // console.log(farmerData);

//   return (
//     <Body>
//       <HeadSection>
//         <ProfileIcon onClick={toggleDropdown} />
//         <DropdownContainer isOpen={dropdownOpen}>
//           <DropdownItem>Profile</DropdownItem>
//           <DropdownItem>Logout</DropdownItem>
//         </DropdownContainer>
//         <UserPrName>{username}</UserPrName>
//         <h1 style={{ fontSize: "23px" }}>Formers Data</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//       </HeadSection>
//       <HomePageContainer>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p className="ftextname"> {farmer.farmer_name}</p>
//               <p className="ftext">Farmer ID: {farmer.farmer_id}</p>

//               <p className="ftext">
//                 Farmer Survey No: {farmer.farmer_survey_no}
//               </p>
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
//             farmerNameTitle={selectedFarmer.farmer_name_title}
//             farmerFather={selectedFarmer.farmer_father}
//             farmerName={selectedFarmer.farmer_name}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

////////////////all are okay done with new api fetching along with seraching also working
// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { CgProfile } from "react-icons/cg";
// import PopupForm from "./PopupForm";
// import "./HomePage.css";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;
// const LogoutButton = styled.button`
//   background-color: #ff0000;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const HeadSection = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   background-color: #38a196;
//   padding: 20px;
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1000;
// `;

// const ProfileIcon = styled(CgProfile)`
//   font-size: 20px;
//   cursor: pointer;
//   margin-left: 10px;
// `;

// const DropdownContainer = styled.div`
//   color: black;
//   left: 0px;
//   background-color: white;
//   font-style: inherit;
//   font-weight: 600;

//   position: absolute;
//   top: 87%;
//   left: 0px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   box-shadow: 0 4px 8px rgb(0 0 0 / 38%);
// `;

// const DropdownItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   border-bottom: 1px solid gray;
//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const HomePageContainer = styled.div`
//   background-color: #38a196;
//   margin: 0 auto;
//   padding: 20px;
//   min-height: 100vh;
//   margin-top: 80px;
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

// const PopupButton = styled.button`
//   font-weight: bold;
//   background-color: #1f7d6f;
//   color: #ffffff;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 46px;
//   cursor: pointer;
// `;

// const UserPrName = styled.p`
//   position: absolute;
//   top: 43px;
//   left: 5px;
// `;

// const HomePage = ({ userData, device_uuid, username }) => {
//   const [isLoggedIn, setLoggedIn] = useState(true); // Set initial login status
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Add state for dropdown

//   // const apiUrlBase = "/api/pwa/list?q=&sort=status&page=0&limit=5";
//   // const apiUrlBase = "/api/pwa/list";
//   const apiUrlBase = "/api/pwa/list";
//   const defaultParams = "&sort=status&page=0&limit=5";

//   const token = userData.token;
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${apiUrlBase}?q=${searchTerm}${defaultParams}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             device_uuid: device_uuid,
//             token: token,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
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

//   ////////////////////fetch two
//   // const fetchData = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const response = await fetch(`${apiUrlBase}?q=${searchTerm}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         device_uuid: device_uuid,
//   //         token: token,
//   //       },
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch data");
//   //     }

//   //     const result = await response.json();
//   //     const sortedItems = result.items.sort((a, b) =>
//   //       a.farmer_name.localeCompare(b.farmer_name)
//   //     );
//   //     setData({ items: sortedItems });
//   //   } catch (error) {
//   //     setError(error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   //////////////////////////////////fetch one
//   // const fetchData = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const response = await fetch(`${apiUrlBase}${searchTerm}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         device_uuid: device_uuid,
//   //         token: token,
//   //       },
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch data");
//   //     }

//   //     const result = await response.json();
//   //     const sortedItems = result.items.sort((a, b) =>
//   //       a.farmer_name.localeCompare(b.farmer_name)
//   //     );
//   //     setData({ items: sortedItems });
//   //   } catch (error) {
//   //     setError(error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     fetchData();
//   }, [device_uuid, token, searchTerm]);

//   const handleFilterClick = () => {
//     fetchData();
//   };
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

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//           farmer_name_title: item.farmer_name_title,
//           farmer_father: item.farmer_father,
//           farmer_name: item.farmer_name,
//         }))
//       : [];
//   // console.log(farmerData);

//   return (
//     <Body>
//       <HeadSection>
//         <ProfileIcon onClick={toggleDropdown} />
//         <DropdownContainer isOpen={dropdownOpen}>
//           <DropdownItem>Profile</DropdownItem>
//           <DropdownItem>Logout</DropdownItem>
//         </DropdownContainer>
//         <UserPrName>{username}</UserPrName>
//         <h1 style={{ fontSize: "23px" }}>Formers Data</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//       </HeadSection>
//       <HomePageContainer>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p className="ftextname"> {farmer.farmer_name}</p>
//               <p className="ftext">Farmer ID: {farmer.farmer_id}</p>

//               <p className="ftext">
//                 Farmer Survey No: {farmer.farmer_survey_no}
//               </p>
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
//             farmerNameTitle={selectedFarmer.farmer_name_title}
//             farmerFather={selectedFarmer.farmer_father}
//             farmerName={selectedFarmer.farmer_name}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

////////////////////////////////////////////////////////////////////Api fetching but serach is not working
// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { CgProfile } from "react-icons/cg";
// import PopupForm from "./PopupForm";
// import "./HomePage.css";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow;
// `;
// const LogoutButton = styled.button`
//   background-color: #ff0000;
//   color: white;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const HeadSection = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   background-color: #38a196;
//   padding: 20px;
//   color: white;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1000;
// `;

// const ProfileIcon = styled(CgProfile)`
//   font-size: 20px;
//   cursor: pointer;
//   margin-left: 10px;
// `;

// const DropdownContainer = styled.div`
//   color: black;
//   left: 0px;
//   background-color: white;
//   font-style: inherit;
//   font-weight: 600;

//   position: absolute;
//   top: 87%;
//   left: 0px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   box-shadow: 0 4px 8px rgb(0 0 0 / 38%);
// `;

// const DropdownItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   border-bottom: 1px solid gray;
//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const HomePageContainer = styled.div`
//   background-color: #38a196;
//   margin: 0 auto;
//   padding: 20px;
//   min-height: 100vh;
//   margin-top: 80px;
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

// const PopupButton = styled.button`
//   font-weight: bold;
//   background-color: #1f7d6f;
//   color: #ffffff;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 46px;
//   cursor: pointer;
// `;

// const UserPrName = styled.p`
//   position: absolute;
//   top: 43px;
//   left: 5px;
// `;

// const HomePage = ({ userData, device_uuid, username }) => {
//   const [isLoggedIn, setLoggedIn] = useState(true); // Set initial login status
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFarmer, setSelectedFarmer] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Add state for dropdown

//   const apiUrlBase = "/api/pwa/list?q=&sort=status&page=0&limit=5";
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

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//           farmer_name_title: item.farmer_name_title,
//           farmer_father: item.farmer_father,
//           farmer_name: item.farmer_name,
//         }))
//       : [];
//   // console.log(farmerData);

//   return (
//     <Body>
//       <HeadSection>
//         <ProfileIcon onClick={toggleDropdown} />
//         <DropdownContainer isOpen={dropdownOpen}>
//           <DropdownItem>Profile</DropdownItem>
//           <DropdownItem>Logout</DropdownItem>
//         </DropdownContainer>
//         <UserPrName>{username}</UserPrName>
//         <h1 style={{ fontSize: "23px" }}>Formers Data</h1>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleInputChange}
//         />
//       </HeadSection>
//       <HomePageContainer>
//         <CardContainer>
//           {farmerData.map((farmer, index) => (
//             <Card key={index}>
//               <p className="ftextname"> {farmer.farmer_name}</p>
//               <p className="ftext">Farmer ID: {farmer.farmer_id}</p>

//               <p className="ftext">
//                 Farmer Survey No: {farmer.farmer_survey_no}
//               </p>
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
//             farmerNameTitle={selectedFarmer.farmer_name_title}
//             farmerFather={selectedFarmer.farmer_father}
//             farmerName={selectedFarmer.farmer_name}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;

///////////////////////////////////////////////////////////////css applying above code
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import PopupForm from "./PopupForm";
// import "./HomePage.css";

// const Body = styled.body`
//   margin: 0;
//   background-color: yellow; /* Set the background color for the entire page */
// `;

// const HomePageContainer = styled.div`
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #38a196;
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

// //new css

// const PopupButton = styled.button`
//   font-weight: bold;
//   background-color: #000000;
//   color: #5eff42;
//   padding: 5px 10px;
//   border: none;
//   border-radius: 46px;
//   cursor: pointer;
// `;

// //old css
// // const PopupButton = styled.button`
// //   background-color: #3498db;
// //   color: white;
// //   padding: 5px 10px;
// //   border: none;
// //   border-radius: 3px;
// //   cursor: pointer;
// // `;

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

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//           farmer_name_title: item.farmer_name_title,
//           farmer_father: item.farmer_father,
//           farmer_name: item.farmer_name,
//         }))
//       : [];
//   // console.log(farmerData);

//   return (
//     <Body>
//       <HomePageContainer>
//         <h1>Former Forms</h1>
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
//               <p className="ftextname"> {farmer.farmer_name}</p>
//               <p className="ftext">Farmer ID: {farmer.farmer_id}</p>

//               <p className="ftext">
//                 Farmer Survey No: {farmer.farmer_survey_no}
//               </p>
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
//             farmerNameTitle={selectedFarmer.farmer_name_title}
//             farmerFather={selectedFarmer.farmer_father}
//             farmerName={selectedFarmer.farmer_name}
//           />
//         )}
//       </HomePageContainer>
//     </Body>
//   );
// };

// export default HomePage;
//=============================================================>>>okay without father
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

//   const handleSearch = () => {
//     fetchData();
//   };

//   const openPopup = (farmer) => {
//     setSelectedFarmer(farmer);
//   };

//   const closePopup = () => {
//     setSelectedFarmer(null);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const farmerData =
//     data && data.items
//       ? data.items.map((item) => ({
//           farmer_id: item.farmer_id,
//           farmer_name: item.farmer_name,
//           farmer_survey_no: item.farmer_survey_no,
//           farmer_name_title: item.farmer_name_title,
//           farmer_father: item.farmer_father,
//         }))
//       : [];
//   // console.log(farmerData);

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
