// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [deviceUUID, setDeviceUUID] = useState(null);

  const setUserContext = (userData, deviceUUID) => {
    setUserData(userData);
    setDeviceUUID(deviceUUID);
  };

  return (
    <UserContext.Provider value={{ userData, deviceUUID, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

// import React, { createContext, useContext, useState } from "react";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [details, setDetails] = useState({
//     farmerId: null,
//     farmerFieldId: null,
//     device_uuid: null,
//     token: null,
//   });

//   const setDetailsContext = (newDetails) => {
//     setDetails(newDetails);
//   };

//   return (
//     <AppContext.Provider value={{ details, setDetailsContext }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
