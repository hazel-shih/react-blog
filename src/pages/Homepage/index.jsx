import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import { getPosts } from "../../WebAPI";
import SectionWrapper from "../../components/SectionWrapper";
import Footer from "../../components/Footer";
import PagesContainer from "../../Pagination/PagesContainer";
import Page from "../../Pagination/Page";
import { useParams, Link } from "react-router-dom";
import { nanoid } from "nanoid";

const HomePageFooter = styled(Footer)`
  position: relative;
`;

const HomePageWrapper = styled(SectionWrapper)`
  padding: 40px 100px;
`;

function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}

function HomePage() {
  const { pageNum } = useParams();
  const [showPosts, setShowPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNum);
  const perPage = 5;

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    getPosts(perPage, pageNum).then((posts) => setShowPosts(posts));
    setCurrentPage(pageNum);
  }, [pageNum]);

  return (
    <>
      <HomePageWrapper>
        <SectionTitle title="最新文章" />
        {showPosts.map((post) => {
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
              edit={false}
            />
          );
        })}
        <PagesContainer>
          {new Array(Math.ceil(posts.length / perPage))
            .fill(null)
            .map((item, index) => (
              <Link key={nanoid()} to={`/page/${index + 1}`}>
                <Page>{index + 1}</Page>
              </Link>
            ))}
        </PagesContainer>
      </HomePageWrapper>
      <HomePageFooter />
    </>
  );
}

export default HomePage;
