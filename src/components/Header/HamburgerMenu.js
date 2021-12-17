import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <NavLink onClick={handleCloseMenu} to="/filter">
            註冊
          </NavLink>
          <NavLink onClick={handleCloseMenu} to="/read/list">
            登入
          </NavLink>
          <NavLink onClick={handleCloseMenu} to="/post/list">
            管理我的文章
          </NavLink>
          <NavLink onClick={handleCloseMenu} to="/post/list">
            發布文章
          </NavLink>
          <NavLink onClick={handleCloseMenu} to="/post/list">
            關於我
          </NavLink>
          <NavLink onClick={handleCloseMenu} to="/post/list">
            登出
          </NavLink>
        </LinkContainer>
      )}
    </>
  );
}

export default HamburgerMenu;
