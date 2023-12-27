// styles.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

export const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px;
`;

export const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
  }

  ul li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export const HomeContainer = styled.div`
  h2 {
    margin-bottom: 10px;
  }

  .search-container {
    display: flex;
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    flex-grow: 1;
  }

  button {
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export const UserPageContainer = styled.div`
  h2 {
    margin-bottom: 10px;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 5px;
`;
