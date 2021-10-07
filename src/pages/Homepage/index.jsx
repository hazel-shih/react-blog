import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import { getPosts } from "../../WebAPI";
import SectionWrapper from "../../components/SectionWrapper";
import Footer from "../../components/Footer";

function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}

function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);
  return (
    <>
      <Banner />
      <SectionWrapper>
        <SectionTitle title="最新文章" />
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
            />
          );
        })}
      </SectionWrapper>
      <Footer />
    </>
  );
}

export default HomePage;
