import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import { register } from "../../WebAPI";
import { AuthContext } from "../../context";
import { getMe } from "../../WebAPI";
import SectionWrapper from "../../components/SectionWrapper";

const RegisterWrapper = styled(SectionWrapper)`
  padding: 5% 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterContainer = styled.form`
  border: solid 1px #222831;
  width: 30%;
  padding: 30px 40px 40px 40px;
  text-align: center;
`;

const RegisterTitle = styled.h1`
  color: #222831;
`;

const RegisterInputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const RegisterLabel = styled.label`
  color: #222831;
  margin-bottom: 3px;
`;

const RegisterInput = styled.input``;

const RegisterBtn = styled.button`
  margin-top: 40px;
  color: white;
  background: #222831;
  border: solid 1px #222831;
  padding: 10px 20px;
  font-weight: bold;
  &:hover {
    color: white;
    background: #4d5a6e;
    border: solid 1px #4d5a6e;
    cursor: pointer;
  }
`;

const AlertMsg = styled.div`
  word-break: break-word;
  font-size: 14px;
  color: darkred;
  font-weight: bold;
  margin-top: 20px;
`;

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
