// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HeaderContainer, Nav } from "../styles";

const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // If the new search term is empty, trigger search immediately
    if (newSearchTerm.trim() === "") {
      handleSearch();
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">User Page</Link>
          </li>
        </ul>
      </Nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </HeaderContainer>
  );
};

export default Header;

//========================================================>>>
// // Header.js
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { HeaderContainer, Nav } from "../styles";

// const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
//   return (
//     <HeaderContainer>
//       <Nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/user">User Page</Link>
//           </li>
//         </ul>
//       </Nav>
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
//     </HeaderContainer>
//   );
// };

// export default Header;

// // Header.js //=========================================>>
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaUser } from "react-icons/fa";
// import { HeaderContainer, Nav } from "../styles";

// const Header = () => {
//   return (
//     <HeaderContainer>
//       <Nav>
//         <ul>
//           <li>
//             <Link to="/">
//               <FaHome /> Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/user">
//               <FaUser /> User Page
//             </Link>
//           </li>
//         </ul>
//       </Nav>
//     </HeaderContainer>
//   );
// };

// export default Header;
