import React from "react";
import styled from "styled-components";
import { Button } from "../EditButton";

const ButtonStyle = styled(Button)`
  background: #fe8f8f;
  &:hover {
    background: #ff6b6b;
  }
`;

function DeleteButton({ handleDeletePost }) {
  return <ButtonStyle onClick={handleDeletePost}>刪除文章</ButtonStyle>;
}

export default DeleteButton;
