import React, { useState, useContext } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import SectionWrapper from "../../components/SectionWrapper";
import Footer from "../../components/Footer";
import { getMyPosts } from "../../WebAPI";
import { AuthContext } from "../../context";

const ListPageWrapper = styled(SectionWrapper)`
  padding: 40px 100px;
`;

function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}

function ListPage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  if (user) {
    getMyPosts(user.id).then((posts) => setPosts(posts));
  }

  return (
    <>
      <ListPageWrapper>
        <SectionTitle title="我的文章列表" />
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              imgSrc="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
              title={post.title}
              linkPath={post.id}
              category="單純mur-mur"
              author={post.userId.toString()}
              createdAt={new Date(post.createdAt).toLocaleString()}
              preText={`${getPreText(post.body)} ...`}
              edit={true}
            />
          );
        })}
      </ListPageWrapper>
      <Footer />
    </>
  );
}

export default ListPage;
