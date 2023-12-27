import React, { useState, useEffect } from "react";

import { HomeContainer, List, ListItem } from "../styles";

const Home = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    // Update the filtered users when the 'users' or 'searchTerm' changes
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  return (
    <HomeContainer>
      <h2>Home Page</h2>

      <List>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <ListItem key={index}>{user.name}</ListItem>
          ))
        ) : (
          <ListItem>No matching users found.</ListItem>
        )}
      </List>
    </HomeContainer>
  );
};

export default Home;

// // Home.js=====================================================>>>Working
// import React, { useState, useEffect } from "react";

// import { HomeContainer, List, ListItem } from "../styles";

// const Home = ({ users }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   useEffect(() => {
//     // Update the filtered users when the 'users' or 'searchTerm' changes
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [users, searchTerm]);

//   return (
//     <HomeContainer>
//       <h2>Home Page</h2>

//       <List>
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <ListItem key={index}>{user.name}</ListItem>
//           ))
//         ) : (
//           <ListItem>No matching users found.</ListItem>
//         )}
//       </List>
//     </HomeContainer>
//   );
// };

// export default Home;

//============================================================>>
// // Home.js
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { HomeContainer, List, ListItem } from "../styles";

// const Home = ({ users }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   useEffect(() => {
//     // Update the filtered users when the 'users' or 'searchTerm' changes
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [users, searchTerm]);

//   const handleChange = (e) => {
//     const newSearchTerm = e.target.value;
//     setSearchTerm(newSearchTerm);
//   };

//   const handleKeyDown = (e) => {
//     // If backspace is pressed and the input is empty, show all users
//     if (e.key === "Backspace" && searchTerm.trim() === "") {
//       setFilteredUsers(users);
//     }
//   };

//   return (
//     <HomeContainer>
//       <h2>Home Page</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={() => setFilteredUsers(users)}>
//           <FaSearch />
//         </button>
//       </div>
//       <List>
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <ListItem key={index}>{user.name}</ListItem>
//           ))
//         ) : (
//           <ListItem>No matching users found.</ListItem>
//         )}
//       </List>
//     </HomeContainer>
//   );
// };

// export default Home;

//=====================================================>>>last one is working
// // Home.js
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { HomeContainer, List, ListItem } from "../styles";

// const Home = ({ users }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   useEffect(() => {
//     // Update the filtered users when the 'users' or 'searchTerm' changes
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [users, searchTerm]);

//   const handleSearch = () => {
//     // If the search term is empty, show all users
//     if (searchTerm.trim() === "") {
//       setFilteredUsers(users);
//     }
//   };

//   return (
//     <HomeContainer>
//       <h2>Home Page</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//           <FaSearch />
//         </button>
//       </div>
//       <List>
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <ListItem key={index}>{user.name}</ListItem>
//           ))
//         ) : (
//           <ListItem>No matching users found.</ListItem>
//         )}
//       </List>
//     </HomeContainer>
//   );
// };

// export default Home;

//===================================================>>>
// // Home.js
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { HomeContainer, List, ListItem } from "../styles";

// const Home = ({ users }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   useEffect(() => {
//     // Update the filtered users when the 'users' or 'searchTerm' changes
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [users, searchTerm]);

//   const handleSearch = () => {
//     // No need to do anything here, useEffect will handle it
//   };

//   return (
//     <HomeContainer>
//       <h2>Home Page</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//           <FaSearch />
//         </button>
//       </div>
//       <List>
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user, index) => (
//             <ListItem key={index}>{user.name}</ListItem>
//           ))
//         ) : (
//           <ListItem>No matching users found.</ListItem>
//         )}
//       </List>
//     </HomeContainer>
//   );
// };

// export default Home;
