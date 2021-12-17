import { useState, useRef, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context";

const NavContainer = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    width: 50px;
    height: 50px;
  }
`;

const Hamburger = styled.div`
  padding: 10 px;
  padding-right: 0;
  position: absolute;
  cursor: pointer;
  right: 5%;
  top: 50%;
  transform: translate(-5%, -50%);
`;

const Line = styled.div`
  padding: 15 px;
  padding-right: 0;
  width: 30px;
  height: 3px;
  background: #484e57;
  border-radius: 10px;
  :not(:last-child) {
    margin-bottom: 6px;
  }
`;

const LinkContainer = styled.div`
  position: absolute;
  top: 75px;
  right: 0;
  background: #484e57;
  width: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 0px 0px 10px 10px;
  opacity: 0.9;
  z-index: 10;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 10px;
  :hover {
    background: #f8f18d;
    color: #484e57;
  }
`;

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const menuRef = useRef();
  const burgerRef = useRef();
  const handleBurgerClick = () => setOpen(!open);
  const handleCloseMenu = () => setOpen(false);
  const checkIfClickOutside = useCallback(
    (e) => {
      if (
        open &&
        menuRef.current &&
        !burgerRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    },
    [open]
  );
  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [open, checkIfClickOutside]);

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", "");
    setOpen(false);
    history.push("/");
  };

  return (
    <>
      <NavContainer onClick={handleBurgerClick} ref={burgerRef}>
        <Hamburger>
          <Line />
          <Line />
          <Line />
        </Hamburger>
      </NavContainer>
      {open && (
        <LinkContainer ref={menuRef}>
          <NavLink onClick={handleCloseMenu} to="/about">
            關於我
          </NavLink>
          {!user && (
            <>
              <NavLink onClick={handleCloseMenu} to="/register">
                註冊
              </NavLink>
              <NavLink onClick={handleCloseMenu} to="/login">
                登入
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink onClick={handleCloseMenu} to="/list">
                管理我的文章
              </NavLink>
              <NavLink onClick={handleCloseMenu} to="/write">
                發布文章
              </NavLink>
              <NavLink to="/" onClick={handleLogout} children="登出" />
            </>
          )}
        </LinkContainer>
      )}
    </>
  );
}

export default HamburgerMenu;
