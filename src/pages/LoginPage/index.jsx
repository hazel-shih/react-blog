import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebAPI";
import { AuthContext } from "../../context";
import SectionWrapper from "../../components/SectionWrapper";
import Footer from "../../components/Footer";

export const LoginWrapper = styled(SectionWrapper)`
  padding: 100px 100px 150px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.form`
  border: solid 1px #222831;
  min-width: 300px;
  padding: 30px 40px 40px 40px;
  text-align: center;
`;

export const LoginTitle = styled.h1`
  color: #222831;
`;

export const LoginInputContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const LoginLabel = styled.label`
  color: #222831;
  margin-bottom: 3px;
`;

export const LoginInput = styled.input`
  height: 25px;
  padding: 3px;
`;

export const LoginBtn = styled.button`
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

export const AlertMsg = styled.div`
  word-break: break-word;
  font-size: 14px;
  color: darkred;
  font-weight: bold;
  margin-top: 20px;
`;

export default function LoginPage() {
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
    login(username, password).then((data) => {
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
        setIsloading(false);
        history.push("/");
      });
    });
  }

  return (
    <>
      <LoginWrapper>
        <LoginContainer onSubmit={handleSubmit}>
          <LoginTitle>Log In</LoginTitle>
          <LoginInputContainer>
            <LoginLabel htmlFor="username">USERNAME</LoginLabel>
            <LoginInput
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <LoginLabel htmlFor="password">PASSWORD</LoginLabel>
            <LoginInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </LoginInputContainer>
          <LoginBtn>Log in</LoginBtn>
          {errorMsg && <AlertMsg>哎呀！發生了一點錯誤：{errorMsg}</AlertMsg>}
        </LoginContainer>
      </LoginWrapper>
      <Footer />
    </>
  );
}
