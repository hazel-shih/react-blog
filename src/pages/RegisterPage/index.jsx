import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { register } from "../../WebAPI";
import { AuthContext } from "../../context";
import { getMe } from "../../WebAPI";
import Footer from "../../components/Footer";
import {
  LoginWrapper,
  LoginContainer,
  LoginTitle,
  LoginInputContainer,
  LoginLabel,
  LoginInput,
  LoginBtn,
  AlertMsg,
} from "../LoginPage";

const RegisterWrapper = styled(LoginWrapper)``;

const RegisterContainer = styled(LoginContainer)``;

const RegisterTitle = styled(LoginTitle)``;

const RegisterInputContainer = styled(LoginInputContainer)``;

const RegisterLabel = styled(LoginLabel)``;

const RegisterInput = styled(LoginInput)``;

const RegisterBtn = styled(LoginBtn)``;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { setUser } = useContext(AuthContext);

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    if (isLoading) return;
    setIsloading(true);
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        setErrorMsg(data.message);
        setIsloading(false);
        return;
      }
      const token = data.token;
      localStorage.setItem("token", token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setErrorMsg(res.toString());
          setIsloading(false);
          return;
        }
        setUser(res.data);
        history.push("/");
        setIsloading(false);
      });
    });
  }

  return (
    <>
      <RegisterWrapper>
        <RegisterContainer onSubmit={handleSubmit}>
          <RegisterTitle>Register</RegisterTitle>
          <RegisterInputContainer>
            <RegisterLabel htmlFor="nickname">NICKNAME</RegisterLabel>
            <RegisterInput
              onChange={(e) => setNickname(e.target.value)}
              id="nickname"
            />
          </RegisterInputContainer>
          <RegisterInputContainer>
            <RegisterLabel htmlFor="username">USERNAME</RegisterLabel>
            <RegisterInput
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
          </RegisterInputContainer>
          <RegisterInputContainer>
            <RegisterLabel htmlFor="password">PASSWORD</RegisterLabel>
            <RegisterInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </RegisterInputContainer>
          <RegisterBtn>Register</RegisterBtn>
          {errorMsg && <AlertMsg>哎呀！發生了一點錯誤：{errorMsg}</AlertMsg>}
        </RegisterContainer>
      </RegisterWrapper>
      <Footer />
    </>
  );
}
