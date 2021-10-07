import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: #fef24c;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  padding: 6px 0px;
  border: solid 1px #222831;
  font-size: 14px;
  cursor: pointer;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #faf6b1;
  }
`;

function ReadMoreButton() {
  return <Button children="閱讀更多" />;
}

export default ReadMoreButton;
