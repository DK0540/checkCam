// UserPage.js
import React from "react";
import { UserPageContainer, List, ListItem } from "../styles";

const UserPage = ({ users }) => {
  return (
    <UserPageContainer>
      <h2>User Page</h2>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>{user.name}</ListItem>
        ))}
      </List>
    </UserPageContainer>
  );
};

export default UserPage;
