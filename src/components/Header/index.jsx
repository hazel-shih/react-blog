import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
import { GetUserContext } from "../../components/App";
import { MEDIA_QUERY_MD } from "../../constants";
import HamburgerMenu from "./HamburgerMenu";

const HeaderContainer = styled.header`
  height: 54px;
  padding: 35px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${MEDIA_QUERY_MD} {
    padding: 35px 30px;
  }
`;

const NavBarPartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  margin: 0;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-right: 45px;
  color: #222831;
  cursor: pointer;
  ${MEDIA_QUERY_MD} {
    margin-right: 0px;
    width: max-content;
  }
`;

const NavBarLink = styled(Link)`
  text-decoration: none;
  color: #484e57;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  border-bottom: 2px solid transparent;
  & + & {
    margin-left: 45px;
  }
  ${MEDIA_QUERY_MD} {
    display: none;
  }
  ${(props) => props.$isCurrentLink && `border-bottom: 2px solid #f8f18d;`}
`;

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { isGettingUser } = useContext(GetUserContext);
  const [nowPath, setNowPath] = useState("/");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setNowPath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", "");
    if (nowPath !== "/") {
      history.push("/");
    }
  };
  return (
    <HeaderContainer>
      <NavBarPartContainer>
        <Logo to="/">Hazel's Blog</Logo>
        <HamburgerMenu />
        <NavBarLink $isCurrentLink={nowPath === "/"} to="/">
          首頁
        </NavBarLink>
        <NavBarLink $isCurrentLink={nowPath === "/about"} to="/about">
          關於我
        </NavBarLink>
      </NavBarPartContainer>
      {!isGettingUser && (
        <NavBarPartContainer>
          {!user ? (
            <>
              <NavBarLink
                $isCurrentLink={nowPath === "/register"}
                to="/register"
              >
                註冊
              </NavBarLink>

              <NavBarLink $isCurrentLink={nowPath === "/login"} to="/login">
                登入
              </NavBarLink>
            </>
          ) : (
            <>
              <NavBarLink $isCurrentLink={nowPath === "/list"} to="/list">
                管理我的文章
              </NavBarLink>
              <NavBarLink $isCurrentLink={nowPath === "/write"} to="/write">
                發布文章
              </NavBarLink>
              <NavBarLink to="/" onClick={handleLogout}>
                登出
              </NavBarLink>
            </>
          )}
        </NavBarPartContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
