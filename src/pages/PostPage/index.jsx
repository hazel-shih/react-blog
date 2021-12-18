import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostTitle from "../../components/PostTitle";
import PostInfo from "../../components/PostInfo";
import { getOnePost } from "../../WebAPI";
import { useParams } from "react-router";
import Footer from "../../components/Footer";
import { MEDIA_QUERY_MD } from "../../constants";

const PostWrapper = styled.section`
  padding: 80px 100px 180px 100px;
  ${MEDIA_QUERY_MD} {
    padding: 80px 30px 180px 30px;
  }
`;

const PostContent = styled.div`
  color: #222831;
  font-family: "Noto Sans TC", sans-serif;
  font-size: 15px;
  white-space: pre-wrap;
`;

const PostTitleInPostPage = styled(PostTitle)`
  display: block;
  font-size: 36px;
  margin-bottom: 20px;
  line-height: 40px;
`;

const PostContentInPostPage = styled(PostContent)`
  font-size: 20px;
  margin-top: 20px;
`;

function PostPage() {
  const [post, setPost] = useState();
  const { id } = useParams();
  useEffect(() => {
    getOnePost(id).then((post) => setPost(post));
  }, [id]);
  return (
    <>
      {post && (
        <>
          <PostWrapper>
            <PostTitleInPostPage>{post[0].title}</PostTitleInPostPage>
            <PostInfo
              category={post[0].category ? post[0].category : "單純mur-mur"}
              author={post[0].user.nickname}
              createdAt={new Date(post[0].createdAt).toLocaleString()}
            />
            <PostContentInPostPage>{post[0].body}</PostContentInPostPage>
          </PostWrapper>
        </>
      )}
      <Footer />
    </>
  );
}

export default PostPage;
