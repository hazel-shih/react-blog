import React from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/SectionWrapper";
import SectionTitle from "../../components/SectionTitle";
import hazel from "../../img/hazel.jpg";
import Footer from "../../components/Footer";
import { MEDIA_QUERY_MD } from "../../constants";

const AboutMeWrapper = styled(SectionWrapper)``;

const AboutMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 40px;
  ${MEDIA_QUERY_MD} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
`;

const TalkBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #222831;
  width: fix-content;
  border-radius: 50px;
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  font-size: 30px;
  padding: 30px;
  ${MEDIA_QUERY_MD} {
    border: none;
    font-size: 25px;
    padding: 0px;
    text-align: center;
    margin-bottom: 50px;
  }
`;

export default function AboutPage() {
  return (
    <>
      <AboutMeWrapper>
        <SectionTitle title="關於我" />
        <AboutMeContainer>
          <Avatar src={hazel} />
          <TalkBubble>
            哈囉我是 Hazel！
            <br />
            恭喜你已被好運小鵝拜訪～
            <br />
            接下來的幾天內會有好事降臨呦 ✧*｡٩(ˊᗜˋ*)و✧*｡
          </TalkBubble>
        </AboutMeContainer>
      </AboutMeWrapper>
      <Footer />
    </>
  );
}
