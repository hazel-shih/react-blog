import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 40px;
  background: linear-gradient(35deg, #f8f18d, #e1f5c4);
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  font-size: 13px;
  letter-spacing: 1px;
  overflow-wrap: break-word;
  padding: 5px;
`;

function Footer() {
  return (
    <StyledFooter>
      Copyright © {new Date().getFullYear()} Hazel's Blog All Rights Reserved.
    </StyledFooter>
  );
}

export default Footer;
