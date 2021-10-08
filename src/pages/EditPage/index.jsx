import React, { useState } from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/SectionWrapper";
import Footer from "../../components/Footer";

const EditFooter = styled(Footer)`
  position: relative;
`;

const EditWrapper = styled(SectionWrapper)`
  padding: 100px 200px;
`;

const EditContainer = styled.div`
  border: solid 1px #818285;
  padding: 30px 30px 70px 30px;
  position: relative;
`;

const EditTitle = styled.h1`
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  margin-bottom: 30px;
`;

const EditForm = styled.form``;

const EditInputBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const EditInputLabel = styled.label`
  font-weight: normal;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-size: 14px;
  white-space: nowrap;
  margin: 0;
`;

const EditInput = styled.input`
  border: solid 1px #818285;
  padding: 3px;
  height: 30px;
  width: 100%;
`;

const EditTextArea = styled.textarea`
  border: solid 1px #818285;
  padding: 3px;
  min-height: 400px;
  width: 100%;
`;

const EditSubmitBtn = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  background: white;
  border: solid 1px #818285;
  padding: 5px 25px;
  cursor: pointer;
  &:hover {
    background: #222831;
    color: white;
  }
`;

export default function ListPage() {
  return (
    <>
      <EditWrapper>
        <EditContainer>
          <EditTitle>發表文章</EditTitle>
          <EditForm>
            <EditInputBlock>
              {/* <EditInputLabel htmlFor="title">文章標題：</EditInputLabel> */}
              <EditInput id="title" name="title" placeholder="請輸入文章標題" />
            </EditInputBlock>
            <EditInputBlock>
              {/* <EditInputLabel htmlFor="content">文章內容：</EditInputLabel> */}
              <EditTextArea id="content" placeholder="請輸入文章內容" />
            </EditInputBlock>
          </EditForm>
          <EditSubmitBtn>送出文章</EditSubmitBtn>
        </EditContainer>
      </EditWrapper>
      <EditFooter>
        Copyright © {new Date().getFullYear()} Hazel's Blog All Rights Reserved.
      </EditFooter>
    </>
  );
}
