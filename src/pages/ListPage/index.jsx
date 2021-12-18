import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import SectionTitle from "../../components/SectionTitle";
import SectionWrapper from "../../components/SectionWrapper";
import { getMyPosts } from "../../WebAPI";
import { AuthContext, GetUserContext } from "../../context";
import { useHistory } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../components/Loading/loading";
import Footer from "../../components/Footer";
import { getPreText } from "../../utils";
import { POST_PER_PAGE as perPage } from "../../constants";

const ListPageWrapper = styled(SectionWrapper)`
  padding-bottom: 110px;
`;

function ListPage() {
  window.scrollTo(0, 0);
  const { user } = useContext(AuthContext);
  const { isGettingUser } = useContext(GetUserContext);
  const [showPosts, setShowPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const history = useHistory();
  useEffect(() => {
    if (!isGettingUser && !user) {
      alert("登入後才能使用管理文章功能喔！");
      history.push("/");
    }
  }, [history, isGettingUser, user]);

  const getPosts = useCallback(
    (pageNum) => {
      getMyPosts(user.id, perPage, pageNum)
        .then((res) => {
          setTotalPostCount(res.headers.get("x-total-count"));
          return res.json();
        })
        .then((posts) => {
          setShowPosts(posts);
          setIsLoadingPosts(false);
        });
    },
    [user]
  );

  useEffect(() => {
    if (user) getPosts(pageNum);
  }, [getPosts, pageNum, user]);

  return (
    <>
      {user && (
        <>
          <ListPageWrapper>
            <SectionTitle title="我的文章列表" />
            {isLoadingPosts ? (
              <Loading />
            ) : (
              <>
                {showPosts.length !== 0 &&
                  showPosts.map((post) => {
                    return (
                      <Post
                        key={post.id}
                        imgSrc="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                        title={post.title}
                        linkPath={post.id}
                        category="單純mur-mur"
                        author={post.user.nickname}
                        createdAt={new Date(post.createdAt).toLocaleString()}
                        preText={`${getPreText(post.body)} ...`}
                        edit={true}
                        showPosts={showPosts}
                        getPosts={getPosts}
                        pageNum={pageNum}
                        setPageNum={setPageNum}
                      />
                    );
                  })}
                {totalPostCount > perPage && (
                  <Pagination
                    totalPostCount={totalPostCount}
                    pageNum={Number(pageNum)}
                    perPage={perPage}
                    setPageNum={setPageNum}
                    route="/list/page"
                  />
                )}
                {Number(totalPostCount) === 0 && (
                  <div>尚無發表任何文章，快來寫新文章吧！</div>
                )}
              </>
            )}
          </ListPageWrapper>
          <Footer />
        </>
      )}
    </>
  );
}

export default ListPage;
