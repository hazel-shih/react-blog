import React, { useContext } from "react";
import styled from "styled-components";
import "./style.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";

const HeaderContainer = styled.header`
  height: 54px;
  padding: 35px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBarPartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  margin: 0;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 40px;
  font-weight: bold;
  margin-right: 45px;
  color: #222831;
  cursor: pointer;
`;

const NavBarLink = styled(Link)`
  text-decoration: none;
  color: #484e57;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  & + & {
    margin-left: 45px;
  }
`;

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  function handleLogout() {
    setUser(null);
    localStorage.setItem("token", "");
    if (location.pathname !== "/") {
      history.push("/");
    }
  }
  return (
    <HeaderContainer>
      <NavBarPartContainer>
        <Logo to="/">Hazel's Blog</Logo>
        <NavBarLink to="/" children="首頁" />
        <NavBarLink to="/about" children="關於我" />
      </NavBarPartContainer>
      <NavBarPartContainer>
        {!user ? (
          <>
            <NavBarLink to="/register" children="註冊" />
            <NavBarLink to="/login" children="登入" />
          </>
        ) : (
          <>
            <NavBarLink to="/list" children="管理我的文章" />
            <NavBarLink to="/write" children="發布文章" />
            <NavBarLink to="/" onClick={handleLogout} children="登出" />
          </>
        )}
      </NavBarPartContainer>
    </HeaderContainer>
  );
}

export default Header;
