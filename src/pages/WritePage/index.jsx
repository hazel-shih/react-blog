import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import SectionWrapper from "../../components/SectionWrapper";
import { publishPost } from "../../WebAPI";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import { AuthContext, GetUserContext } from "../../context";
import { MEDIA_QUERY_MD } from "../../constants";

export const EditWrapper = styled(SectionWrapper)`
  padding: 80px 100px 150px 100px;
  ${MEDIA_QUERY_MD} {
    padding: 80px 30px 150px 30px;
  }
`;

export const EditContainer = styled.div`
  border: solid 1px #818285;
  padding: 30px 30px 70px 30px;
  position: relative;
`;

export const EditTitle = styled.h1`
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: bold;
  margin-bottom: 30px;
`;

const EditForm = styled.form``;

export const EditInputBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const EditInput = styled.input`
  border: solid 1px #818285;
  padding: 3px;
  height: 30px;
  width: 100%;
`;

export const EditTextArea = styled.textarea`
  border: solid 1px #818285;
  padding: 3px;
  min-height: 400px;
  width: 100%;
`;

export const EditSubmitBtn = styled.button`
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

export const AlertMsg = styled.div`
  word-break: break-word;
  font-size: 14px;
  color: darkred;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: right;
`;

export default function WritePage() {
  const { user } = useContext(AuthContext);
  const { isGettingUser } = useContext(GetUserContext);
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isGettingUser && !user) {
      alert("登入後才能使用發布文章功能喔！");
      history.push("/");
    }
  }, [history, isGettingUser, user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    if (post.title === "" || post.body === "") {
      setErrMsg("文章標題或文章內容未填寫，請再檢查一次");
      setIsLoading(false);
      return;
    }
    publishPost(post.title, post.body).then((data) => {
      if (data.ok === 0) {
        setErrMsg(`發生了一點錯誤：${data.message}`);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      history.push("/");
    });
  }

  function handleChange(e) {
    errMsg && setErrMsg();
    const { value, name } = e.target;
    if (name === "title") {
      setPost({
        ...post,
        title: value,
      });
      return;
    }
    setPost({
      ...post,
      body: value,
    });
  }

  return (
    <>
      {user && (
        <>
          <EditWrapper>
            <EditContainer>
              <EditTitle>發表文章</EditTitle>
              <EditForm>
                <EditInputBlock>
                  <EditInput
                    onChange={handleChange}
                    name="title"
                    placeholder="請輸入文章標題"
                  />
                </EditInputBlock>
                <EditInputBlock>
                  <EditTextArea
                    onChange={handleChange}
                    name="content"
                    placeholder="請輸入文章內容"
                  />
                </EditInputBlock>
              </EditForm>
              {errMsg && <AlertMsg>{errMsg}</AlertMsg>}
              <EditSubmitBtn onClick={handleSubmit}>送出文章</EditSubmitBtn>
            </EditContainer>
          </EditWrapper>
          <Footer />
        </>
      )}
    </>
  );
}
