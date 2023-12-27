import React, { useRef, useState } from "react";
import Camera from "react-camera";

function App() {
  const cameraRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const takePicture = () => {
    const imageData = cameraRef.current.capture();
    setImageSrc(imageData);
  };

  const handleUpload = () => {
    // Implement your image upload logic here
    alert("Image uploaded successfully!");
  };

  return (
    <div className="App">
      <h1>Photo Uploader</h1>
      <Camera ref={cameraRef} />
      <br />
      <button onClick={takePicture}>Take Picture</button>
      {imageSrc && (
        <div>
          <h2>Preview:</h2>
          <img src={imageSrc} alt="Preview" width="200" />
          <br />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default App;

// // App.js========================================>>.All are working working on userpage above code
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./Component/Header";
// import Home from "./Component/Home";
// import UserPage from "./Component/UserPage";
// import { Container } from "./styles";

// const usersData = [
//   { name: "Kanthraj" },
//   { name: "Vishwa" },
//   { name: "Harry" },
//   { name: "Jackk" },
//   { name: "Peeter" },
// ];

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(usersData);

//   //function for filter
//   const handleSearch = () => {
//     const filtered = usersData.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   };

//   return (
//     <Router>
//       <Container>
//         <Header
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           handleSearch={handleSearch}
//         />
//         <Routes>
//           <Route path="/" element={<Home users={filteredUsers} />} />
//           <Route path="/user" element={<UserPage />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;

//============================================================>>>
// // App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./Component/Header";
// import Home from "./Component/Home";
// import UserPage from "./Component/UserPage";
// import { Container } from "./styles";

// const users = [
//   { name: "Kanthraj" },
//   { name: "Vishwa" },
//   { name: "Harry" },
//   { name: "Jackk" },
//   { name: "Peeter" },
// ];

// const App = () => {
//   return (
//     <Router>
//       <Container>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home users={users} />} />
//           <Route path="/user" element={<UserPage />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;
