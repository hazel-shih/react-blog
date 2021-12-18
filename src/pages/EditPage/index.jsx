import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { editPost, getOnePost } from "../../WebAPI";
import { useHistory, useParams } from "react-router";
import Footer from "../../components/Footer";
import { AuthContext, GetUserContext } from "../../context";
import {
  EditWrapper,
  EditContainer,
  EditTitle,
  EditInputBlock,
  EditInput,
  EditTextArea,
  EditSubmitBtn,
  AlertMsg,
} from "../WritePage";

const EditForm = styled.form``;

export default function EditPage() {
  const [post, setPost] = useState(null);
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const { isGettingUser } = useContext(GetUserContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isGettingUser && !user) {
      alert("登入後才能使用編輯文章功能喔！");
      history.push("/");
    }
  }, [history, isGettingUser, user]);

  useEffect(() => {
    getOnePost(id).then((previousPost) => {
      setPost(previousPost[0]);
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    if (post.title === "" || post.body === "") {
      setErrMsg("文章標題或文章內容未填寫，請再檢查一次");
      setIsLoading(false);
      return;
    }
    editPost(id, post.title, post.body).then((data) => {
      if (data.ok === 0) {
        setErrMsg(`發生了一點錯誤：${data.message}`);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      history.push(`/post/${post.id}`);
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
      {user && post && (
        <>
          <EditWrapper>
            <EditContainer>
              <EditTitle>編輯文章</EditTitle>
              <EditForm>
                <EditInputBlock>
                  <EditInput
                    defaultValue={post.title}
                    onChange={handleChange}
                    name="title"
                    placeholder="請輸入文章標題"
                  />
                </EditInputBlock>
                <EditInputBlock>
                  <EditTextArea
                    defaultValue={post.body}
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
