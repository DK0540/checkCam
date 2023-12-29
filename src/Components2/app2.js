// import React, { useState, useEffect } from "react";

// const App = () => {
//   // State to store the fetched data
//   const [data, setData] = useState([]);
//   // State to store loading status
//   const [loading, setLoading] = useState(true);
//   // State to store error, if any
//   const [error, setError] = useState(null);

//   // API details
//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const device_uuid = "123456";
//   const token = "ce53940c-5aa7-4081-9f6d-ff7cfb146df1";

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

// export default App;

//======================================================>>Second api working
// import React, { useState, useEffect } from "react";

// const App = () => {
//   // State to store the fetched data
//   const [data, setData] = useState([]);
//   // State to store loading status
//   const [loading, setLoading] = useState(true);
//   // State to store error, if any
//   const [error, setError] = useState(null);

//   // API details
//   const apiUrl =
//     "https://sfamsserver.in/api/admin/farmer-feild/0?q=&sort=status&agent_id=&page=0&limit=60";
//   const device_uuid = "123456";
//   const token = "ce53940c-5aa7-4081-9f6d-ff7cfb146df1";

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
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default App;

//================================================>>>>All are good
// LoginPage.jsx
// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import HomePage from "./Component/HomePage"; // Adjust the path based on your project structure

// const App = () => {
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

// export default App;

//===========================================================>>>LOgin done using automatice device uuid
// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [deviceUUID, setDeviceUUID] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

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

//         // Log the user data to the console
//         console.log("User Data:", userData);

//         // Handle successful login, e.g., redirect to the home page
//         console.log("Login successful");
//         // You can use a routing library like react-router-dom to navigate to the home page
//         // Example: history.push('/home');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("An error occurred during login");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Login</h2>
// <div>
//   <label>Username:</label>
//   <input
//     type="text"
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//   />
// </div>
// <div>
//   <label>Password:</label>
//   <input
//     type="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
// </div>
// {/* Disable the input for device UUID as it is automatically filled */}
// <div>
//   <label>Device UUID:</label>
//   <input type="text" value={deviceUUID} readOnly />
// </div>
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

// export default App;
//================================>>login done with manual uuid
// import React, { useState } from "react";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [deviceUUID, setDeviceUUID] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

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

//         // Log the user data to the console
//         console.log("User Data:", userData);

//         // Handle successful login, e.g., redirect to the home page
//         console.log("Login successful");
//         // You can use a routing library like react-router-dom to navigate to the home page
//         // Example: history.push('/home');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrorMessage("An error occurred during login");
//     }
//   };

//   // const handleLogin = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://sfamsserver.in/api/admin/adminLogin",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           user_name: username,
//   //           user_password: password,
//   //           device_uuid: deviceUUID,
//   //         }),
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       // Handle successful login, e.g., redirect to the home page
//   //       console.log("Login successful");
//   //       // You can use a routing library like react-router-dom to navigate to the home page
//   //       // Example: history.push('/home');
//   //     } else {
//   //       const errorData = await response.json();
//   //       setErrorMessage(errorData.message || "Login failed");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     setErrorMessage("An error occurred during login");
//   //   }
//   // };

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
//       <div>
//         <label>Device UUID:</label>
//         <input
//           type="text"
//           value={deviceUUID}
//           onChange={(e) => setDeviceUUID(e.target.value)}
//         />
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

// export default App;

//==============================================>>>>Below is the camera work for image and video capture.
// import React, { useRef, useState } from "react";
// import styled from "styled-components";
// import Compressor from "compressorjs";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);
//   const [recording, setRecording] = useState(false);

//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(chunks, { type: "video/webm" });

//         // Compress video if it exceeds 20MB
//         if (blob.size > 20 * 1024 * 1024) {
//           const compressedBlob = await compressVideo(blob);
//           setCapturedVideo(URL.createObjectURL(compressedBlob));
//           setFileSize((compressedBlob.size / (1024 * 1024)).toFixed(2) + " MB");
//         } else {
//           setCapturedVideo(URL.createObjectURL(blob));
//           setFileSize((blob.size / (1024 * 1024)).toFixed(2) + " MB");
//         }

//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const compressVideo = async (videoBlob) => {
//     return new Promise((resolve) => {
//       new Compressor(videoBlob, {
//         quality: 0.7, // Adjust quality as needed
//         success: (result) => {
//           resolve(result);
//         },
//       });
//     });
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setRecording(true);

//       setTimeout(() => {
//         stopRecording();
//       }, 60000); // Stop recording after 1 minute
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     setFileSize(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideoToFile = () => {
//     if (capturedVideo) {
//       // Create a link element and trigger a download
//       const link = document.createElement("a");
//       link.href = capturedVideo;
//       link.download = "captured_video.mp4"; // Adjust the file name as needed
//       link.click();
//     }
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       {!capturedVideo ? (
//         <>
//           <button onClick={() => openCamera("user")}>Open Front Camera</button>
//           <button onClick={() => openCamera("environment")}>
//             Open Rear Camera
//           </button>
//         </>
//       ) : null}
//       <CaptureSection>
//         {!capturedVideo ? (
//           <Button onClick={startRecording} disabled={recording}>
//             Record Video
//           </Button>
//         ) : null}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       {capturedVideo && (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <div>
//             <span>File Size: {fileSize}</span>
//           </div>
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideoToFile}>Save</Button>
//         </CaptureSection>
//       )}
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default App;
//===========================================================>>> Camera Work
//============================================================>>facing some issues wit below cod
// import React, { useRef, useState } from "react";
// import styled from "styled-components";
// import VideoCompressor from "video-compressor";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);
//   const [recording, setRecording] = useState(false);

//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(chunks, { type: "video/webm" });

//         // Compress video if it exceeds 20MB
//         if (blob.size > 20 * 1024 * 1024) {
//           const compressedBlob = await VideoCompressor(blob, { quality: 0.7 }); // Adjust quality as needed
//           setCapturedVideo(URL.createObjectURL(compressedBlob));
//           setFileSize((compressedBlob.size / (1024 * 1024)).toFixed(2) + " MB");
//         } else {
//           setCapturedVideo(URL.createObjectURL(blob));
//           setFileSize((blob.size / (1024 * 1024)).toFixed(2) + " MB");
//         }

//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setRecording(true);

//       setTimeout(() => {
//         stopRecording();
//       }, 60000); // Stop recording after 1 minute
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     setFileSize(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideoToFile = () => {
//     if (capturedVideo) {
//       // Create a link element and trigger a download
//       const link = document.createElement("a");
//       link.href = capturedVideo;
//       link.download = "captured_video.mp4"; // Adjust the file name as needed
//       link.click();
//     }
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       {!capturedVideo ? (
//         <>
//           <button onClick={() => openCamera("user")}>Open Front Camera</button>
//           <button onClick={() => openCamera("environment")}>
//             Open Rear Camera
//           </button>
//         </>
//       ) : null}
//       <CaptureSection>
//         {!capturedVideo ? (
//           <Button onClick={startRecording} disabled={recording}>
//             Record Video
//           </Button>
//         ) : null}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       {capturedVideo && (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <div>
//             <span>File Size: {fileSize}</span>
//           </div>
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideoToFile}>Save</Button>
//         </CaptureSection>
//       )}
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default App;

//===============================================================>>>>video recording and showing size
// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);
//   const [recording, setRecording] = useState(false);

//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         setFileSize((blob.size / (1024 * 1024)).toFixed(2) + " MB");
//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setRecording(true);

//       setTimeout(() => {
//         stopRecording();
//       }, 60000); // Stop recording after 1 minute
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     setFileSize(null);
//     startRecording(); // Automatically start recording again
//   };

//   const saveVideoToFile = () => {
//     // Implement logic to save video to gallery or a file
//     alert("Video saved to gallery or file!");
//     setCapturedVideo(null);
//     setFileSize(null);
//     stopCamera();
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       {!capturedVideo ? (
//         <>
//           <button onClick={() => openCamera("user")}>Open Front Camera</button>
//           <button onClick={() => openCamera("environment")}>
//             Open Rear Camera
//           </button>
//         </>
//       ) : null}
//       <CaptureSection>
//         {!capturedVideo ? (
//           <Button onClick={startRecording} disabled={recording}>
//             Record Video
//           </Button>
//         ) : null}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       {capturedVideo && (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <div>
//             <span>File Size: {fileSize}</span>
//           </div>
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideoToFile}>Save</Button>
//         </CaptureSection>
//       )}
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default App;

//========================================================>>retake not working
// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [fileSize, setFileSize] = useState(null);
//   const [recording, setRecording] = useState(false);

//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         setFileSize((blob.size / (1024 * 1024)).toFixed(2) + " MB");
//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setRecording(true);
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const retakeVideo = () => {
//     setCapturedVideo(null);
//     setFileSize(null);
//     openCamera("user");
//   };

//   const saveVideoToFile = () => {
//     // Implement logic to save video to gallery or file
//     alert("Video saved to gallery or file!");
//     setCapturedVideo(null);
//     setFileSize(null);
//     stopCamera();
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       {!capturedVideo ? (
//         <>
//           <button onClick={() => openCamera("user")}>Open Front Camera</button>
//           <button onClick={() => openCamera("environment")}>
//             Open Rear Camera
//           </button>
//         </>
//       ) : null}
//       <CaptureSection>
//         {!capturedVideo ? (
//           <Button onClick={startRecording} disabled={recording}>
//             Record Video
//           </Button>
//         ) : null}
//         {recording && <span>Recording...</span>}
//       </CaptureSection>
//       {capturedVideo && (
//         <CaptureSection>
//           <VideoPreview controls src={capturedVideo} />
//           <div>
//             <span>File Size: {fileSize}</span>
//           </div>
//           <Button onClick={retakeVideo}>Retake</Button>
//           <Button onClick={saveVideoToFile}>Save</Button>
//         </CaptureSection>
//       )}
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default App;

//==============================================================>>Below is working for image with condition
// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   const [imageCount, setImageCount] = useState(0);
//   let mediaRecorder;

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           const blob = new Blob([event.data], { type: "video/webm" });
//           setCapturedVideo(URL.createObjectURL(blob));
//         }
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const takePicture = () => {
//     if (imageCount < 7) {
//       const canvas = document.createElement("canvas");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const imageDataUrl = canvas.toDataURL("image/png");
//       setCapturedImages((prevImages) => [...prevImages, imageDataUrl]);
//       setImageCount((count) => count + 1);
//     }

//     if (imageCount === 9) {
//       stopCamera();
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//     }
//   };

//   const stopCamera = () => {
//     // Stop the camera
//     const tracks = videoRef.current.srcObject.getTracks();
//     tracks.forEach((track) => track.stop());
//   };

//   const saveToGallery = () => {
//     // Implement logic to save images and video to gallery
//     alert("Images and Video saved to gallery!");
//     setCapturedImages([]);
//     setCapturedVideo(null);
//     setImageCount(0);
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <CaptureSection>
//         <Button onClick={takePicture} disabled={imageCount >= 10}>
//           Take Picture ({10 - imageCount} remaining)
//         </Button>
//       </CaptureSection>
//       <CaptureSection>
//         <Button onClick={startRecording} disabled={capturedVideo}>
//           Start Recording
//         </Button>
//         <Button onClick={stopRecording} disabled={!capturedVideo}>
//           Stop Recording
//         </Button>
//         {capturedVideo && <VideoPreview controls src={capturedVideo} />}
//       </CaptureSection>
//       <CaptureSection>
//         <Button
//           onClick={saveToGallery}
//           disabled={!capturedImages.length || !capturedVideo}
//         >
//           Save to Gallery
//         </Button>
//       </CaptureSection>
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default App;

//==================================================================>>>Ui applied
// import React, { useRef, useState } from "react";
// import styled from "styled-components";

// const CameraContainer = styled.div`
//   text-align: center;
// `;

// const CaptureSection = styled.div`
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   margin: 5px;
//   padding: 10px;
//   background-color: #3498db;
//   color: #fff;
//   border: none;
//   cursor: pointer;
// `;

// const VideoPreview = styled.video`
//   margin-top: 10px;
// `;

// const CameraComponent = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   let mediaRecorder;
//   let imageCount = 0;

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           const blob = new Blob([event.data], { type: "video/webm" });
//           setCapturedVideo(URL.createObjectURL(blob));
//         }
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const takePicture = () => {
//     if (imageCount < 10) {
//       const canvas = document.createElement("canvas");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const imageDataUrl = canvas.toDataURL("image/png");
//       setCapturedImages((prevImages) => [...prevImages, imageDataUrl]);
//       imageCount += 1;
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//     }
//   };

//   const saveToGallery = () => {
//     // Implement logic to save images and video to gallery
//     alert("Images and Video saved to gallery!");
//     setCapturedImages([]);
//     setCapturedVideo(null);
//     imageCount = 0;
//   };

//   return (
//     <CameraContainer>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <CaptureSection>
//         <Button onClick={takePicture} disabled={imageCount >= 10}>
//           Take Picture ({10 - imageCount} remaining)
//         </Button>
//       </CaptureSection>
//       <CaptureSection>
//         <Button onClick={startRecording} disabled={capturedVideo}>
//           Start Recording
//         </Button>
//         <Button onClick={stopRecording} disabled={!capturedVideo}>
//           Stop Recording
//         </Button>
//         {capturedVideo && <VideoPreview controls src={capturedVideo} />}
//       </CaptureSection>
//       <CaptureSection>
//         <Button
//           onClick={saveToGallery}
//           disabled={!capturedImages.length || !capturedVideo}
//         >
//           Save to Gallery
//         </Button>
//       </CaptureSection>
//       {capturedImages.map((image, index) => (
//         <img
//           key={index}
//           src={image}
//           alt={`Image ${index}`}
//           width="100"
//           style={{ margin: "5px" }}
//         />
//       ))}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </CameraContainer>
//   );
// };

// export default CameraComponent;

//====================================================>>>multiple image taking
// import React, { useRef, useState } from 'react';

// const CameraComponent = () => {
//   const videoRef = useRef(null);
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [capturedVideos, setCapturedVideos] = useState([]);
//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/webm' });
//         setCapturedVideos((prevVideos) => [...prevVideos, URL.createObjectURL(blob)]);
//         chunks = [];
//       };
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };

//   const takePicture = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageDataUrl = canvas.toDataURL('image/png');
//     setCapturedImages((prevImages) => [...prevImages, imageDataUrl]);
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== 'inactive') {
//       mediaRecorder.stop();
//     }
//   };

//   const saveImagesToGallery = () => {
//     // Implement logic to save images to gallery
//     alert('Images saved to gallery!');
//   };

//   const saveVideosToGallery = () => {
//     // Implement logic to save videos to gallery
//     alert('Videos saved to gallery!');
//   };

//   return (
//     <div>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera('user')}>Open Front Camera</button>
//       <button onClick={() => openCamera('environment')}>Open Rear Camera</button>
//       <div>
//         <h2>Image Capture</h2>
//         <button onClick={takePicture}>Take Picture</button>
//         <button onClick={saveImagesToGallery}>Save Images to Gallery</button>
//         {capturedImages.map((image, index) => (
//           <img key={index} src={image} alt={`Image ${index}`} width="100" style={{ margin: '5px' }} />
//         ))}
//       </div>
//       <div>
//         <h2>Video Recording</h2>
//         <button onClick={startRecording}>Start Recording</button>
//         <button onClick={stopRecording}>Stop Recording</button>
//         <button onClick={saveVideosToGallery}>Save Videos to Gallery</button>
//         {capturedVideos.map((video, index) => (
//           <video key={index} controls width="100" style={{ margin: '5px' }}>
//             <source src={video} type="video/webm" />
//             Your browser does not support the video tag.
//           </video>
//         ))}
//       </div>
//       <br />
//       <video ref={videoRef} width="300" height="200" autoPlay playsInline muted />
//     </div>
//   );
// };

// export default CameraComponent;

////////////////////////////////======================================>>Image taking check it
// import React, { useRef, useState } from "react";

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//     }
//   };

//   const saveVideoToFile = () => {
//     if (capturedVideo) {
//       // Create a link element and trigger a download
//       const link = document.createElement("a");
//       link.href = capturedVideo;
//       link.download = "captured_video.webm";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <br />
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       <button onClick={saveVideoToFile}>Save Video to File</button>
//       <br />
//       {capturedImage && (
//         <div>
//           <h2>Image Preview:</h2>
//           <img src={capturedImage} alt="Preview" width="300" />
//         </div>
//       )}
//       {capturedVideo && (
//         <div>
//           <h2>Video Preview:</h2>
//           <video controls width="300">
//             <source src={capturedVideo} type="video/webm" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </div>
//   );
// };

// export default App;

// //======================================================>>>Image is taking[]]]]]]}}}}}}}}}}}}}}}}}}}}
// import React, { useRef, useState } from "react";

// const CameraComponent = () => {
//   const videoRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [capturedVideo, setCapturedVideo] = useState(null);
//   let mediaRecorder;
//   let chunks = [];

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setCapturedVideo(URL.createObjectURL(blob));
//         chunks = [];
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const takePicture = () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageDataUrl = canvas.toDataURL("image/png");
//     setCapturedImage(imageDataUrl);
//   };

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setTimeout(() => {
//         stopRecording();
//       }, 10000); // Stop recording after 10 seconds
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//     }
//   };

//   const saveVideoToFile = () => {
//     if (capturedVideo) {
//       // Create a link element and trigger a download
//       const link = document.createElement("a");
//       link.href = capturedVideo;
//       link.download = "captured_video.webm";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <br />
//       <button onClick={takePicture}>Take Picture</button>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       <button onClick={saveVideoToFile}>Save Video to File</button>
//       <br />
//       {capturedImage && (
//         <div>
//           <h2>Image Preview:</h2>
//           <img src={capturedImage} alt="Image Preview" width="300" />
//         </div>
//       )}
//       {capturedVideo && (
//         <div>
//           <h2>Video Preview:</h2>
//           <video controls width="300">
//             <source src={capturedVideo} type="video/webm" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </div>
//   );
// };

// export default CameraComponent;

//========================================================>>Image taking 2
// import React, { useRef, useState } from "react";

// const App = () => {
//   const videoRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const takePicture = () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageDataUrl = canvas.toDataURL("image/png");
//     setCapturedImage(imageDataUrl);
//   };

//   const saveToGallery = () => {
//     // Create a link element and trigger a download
//     const link = document.createElement("a");
//     link.href = capturedImage;
//     link.download = "captured_image.png";
//     link.click();
//   };

//   return (
//     <div>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <br />
//       <button onClick={takePicture}>Take Picture</button>
//       {capturedImage && (
//         <div>
//           <h2>Preview:</h2>
//           <img src={capturedImage} alt="Preview" width="300" />
//           <br />
//           <button onClick={saveToGallery}>Save to Gallery</button>
//         </div>
//       )}
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </div>
//   );
// };

// export default App;

//=================================================>>>This is for image both buttons working
// import React, { useRef } from "react";

// const App = () => {
//   const videoRef = useRef(null);

//   const openCamera = async (facingMode) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode },
//       });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Camera Example</h1>
//       <button onClick={() => openCamera("user")}>Open Front Camera</button>
//       <button onClick={() => openCamera("environment")}>
//         Open Rear Camera
//       </button>
//       <br />
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//         playsInline
//         muted
//       />
//     </div>
//   );
// };

// export default App;

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
