import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReadMoreButton from "../ReadMoreButton";
import { Link, useHistory } from "react-router-dom";
import PostInfo from "../PostInfo";
import PostTitle from "../PostTitle";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import { MEDIA_QUERY_MD } from "../../constants";
import { deletePost } from "../../WebAPI";

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-top: 50px;
  height: auto;
`;

const PostImgContainer = styled.div`
  max-width: 350px;
  height: auto;
  ${MEDIA_QUERY_MD} {
    display: none;
  }
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
`;

const PostPartContainer = styled.div`
  width: 60%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  ${MEDIA_QUERY_MD} {
    width: 100%;
    margin-left: 0px;
  }
`;

const PostContent = styled.div`
  color: #818285;
  margin-top: 9px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: lighter;
  font-size: 16px;
  line-height: 24px;
  overflow: hidden;
  height: auto;
  margin-bottom: 15px;
  word-break: break-all;
`;
const FlexBox = styled.div`
  display: flex;
`;

function Post({
  imgSrc,
  title,
  category,
  author,
  createdAt,
  preText,
  linkPath,
  edit,
  showPosts,
  setShowPosts,
  currentPage,
}) {
  let history = useHistory();
  const deleteMyPost = async (postId) => {
    let confirm = window.confirm("Hey! 確定要刪除文章嗎？刪除後就不可回復囉！");
    if (!confirm) return;
    await deletePost(postId);
    let newShowPosts = showPosts.filter((post) => post.id !== postId);
    if (newShowPosts.length === 0 && currentPage !== 1) {
      history.push(`/list/page/${currentPage - 1}`);
    } else {
      setShowPosts(newShowPosts);
    }
  };
  return (
    <PostContainer>
      <PostImgContainer>
        <PostImg src={imgSrc} />
      </PostImgContainer>
      <PostPartContainer>
        <PostTitle as={Link} to={`/post/${linkPath}`} children={title} />
        <PostInfo category={category} author={author} createdAt={createdAt} />
        <PostContent children={preText} />
        {edit ? (
          <FlexBox>
            <Link to={`/edit/${linkPath}`}>
              <EditButton />
            </Link>
            <DeleteButton handleDeletePost={() => deleteMyPost(linkPath)} />
          </FlexBox>
        ) : (
          <Link to={`/post/${linkPath}`}>
            <ReadMoreButton />
          </Link>
        )}
      </PostPartContainer>
    </PostContainer>
  );
}

Post.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  author: PropTypes.string,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  edit: PropTypes.bool,
};

export default Post;
