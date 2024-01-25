import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import img from "./assets/vlogo.png";
import { v4 as uuidv4 } from "uuid";
import HomePage from "./HomePage";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deviceUUID, setDeviceUUID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data after login
  const [isLoggedIn, setLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Automatically generate and set the device UUID when the component mounts
    const uuid = uuidv4();
    setDeviceUUID(uuid);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://sfamsserver.in/api/admin/adminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: username,
            user_password: password,
            device_uuid: deviceUUID,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();

        // Set user data in state
        setUserData(userData);

        // Set login status to true
        setLoggedIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  // Render the HomePage component if logged in
  if (isLoggedIn) {
    return (
      <HomePage
        username={username}
        userData={userData}
        device_uuid={deviceUUID}
      />
    );
  }

  return (
    <div className="login-container">
      <img src={img} alt="Logo" className="logo" />

      <h6 style={{ fontSize: "20px", fontWeight: "200", color: "green" }}>
        Srinidhi Innovative InfoSoft Pvt Ltd
      </h6>
      <div className="input-container">
        <input
          placeholder="User name"
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Password:"
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <button className="login-button" onClick={handleLogin}>
        <Link className="button-link">Login</Link>
      </button>

      <Link to="/forgotPassword" className="forgot-password-link">
        Forgot Password?
      </Link>
    </div>
  );
};

export default LoginPage;

//====================================================== login withot css
// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import styled from "styled-components";
// import HomePage from "./HomePage"; // Adjust the path based on your project structure

// const LoginPageWrapper = styled.div`
//   text-align: center;
//   margin-top: 50px;
//   padding: 20px;

//   @media (max-width: 768px) {
//     /* Adjust styles for smaller screens */
//     margin-top: 20px;
//   }
// `;

// const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 5px;
// `;

// const InputField = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 10px;
//   box-sizing: border-box;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin: 10px;
// `;

// const LoginButton = styled.button`
//   padding: 10px;
//   margin-top: 10px;
//   cursor: pointer;
// `;

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [deviceUUID, setDeviceUUID] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userData, setUserData] = useState(null); // State to store user data after login
//   const [isLoggedIn, setLoggedIn] = useState(false); // State to track login status

//   useEffect(() => {
//     // Automatically generate and set the device UUID when the component mounts
//     const uuid = uuidv4();
//     setDeviceUUID(uuid);
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/adminLogin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_name: username,
//             user_password: password,
//             device_uuid: deviceUUID,
//           }),
//         }
//       );

//       if (response.ok) {
//         const userData = await response.json();

//         // Set user data in state
//         setUserData(userData);

//         // Set login status to true
//         setLoggedIn(true);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("An error occurred during login");
//     }
//   };

//   // Render the HomePage component if logged in
//   if (isLoggedIn) {
//     return <HomePage userData={userData} device_uuid={deviceUUID} />;
//   }

//   return (
//     <LoginPageWrapper>
//       <h2>Login</h2>
//       <FormLabel>Username:</FormLabel>
//       <InputField
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <FormLabel>Password:</FormLabel>
//       <InputField
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {/* Disable the input for device UUID as it is automatically filled */}
//       <FormLabel>Device UUID:</FormLabel>
//       <InputField type="text" value={deviceUUID} readOnly />
//       {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
//       <LoginButton onClick={handleLogin}>Login</LoginButton>
//     </LoginPageWrapper>
//   );
// };

// export default LoginPage;

//===========================================================>>>>
// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import HomePage from "./HomePage"; // Adjust the path based on your project structure

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [deviceUUID, setDeviceUUID] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userData, setUserData] = useState(null); // State to store user data after login
//   const [isLoggedIn, setLoggedIn] = useState(false); // State to track login status

//   useEffect(() => {
//     // Automatically generate and set the device UUID when the component mounts
//     const uuid = uuidv4();
//     setDeviceUUID(uuid);
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         "https://sfamsserver.in/api/admin/adminLogin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_name: username,
//             user_password: password,
//             device_uuid: deviceUUID,
//           }),
//         }
//       );

//       if (response.ok) {
//         const userData = await response.json();

//         // Set user data in state
//         setUserData(userData);

//         // Set login status to true
//         setLoggedIn(true);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("An error occurred during login");
//     }
//   };

//   // Render the HomePage component if logged in
//   if (isLoggedIn) {
//     return <HomePage userData={userData} device_uuid={deviceUUID} />;
//   }

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Login</h2>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       {/* Disable the input for device UUID as it is automatically filled */}
//       <div>
//         <label>Device UUID:</label>
//         <input type="text" value={deviceUUID} readOnly />
//       </div>
//       {errorMessage && (
//         <div style={{ color: "red", margin: "10px" }}>{errorMessage}</div>
//       )}
//       <button
//         style={{ padding: "10px", marginTop: "10px" }}
//         onClick={handleLogin}
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;
