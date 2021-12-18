import { useRef } from "react";
import Page from "./Page";
import { Link } from "react-router-dom";
import PagesContainer from "./PagesContainer";
import { nanoid } from "nanoid";

function Pagination({ totalPostCount, pageNum, perPage, setPageNum, route }) {
  const totalPage = useRef(
    Array.apply(null, Array(Math.ceil(totalPostCount.current / perPage))).map(
      (x, i) => i + 1
    )
  );
  return (
    <PagesContainer>
      {pageNum > 1 && (
        <Link
          key={nanoid()}
          to={`${route}/${pageNum - 1}`}
          onClick={() => setPageNum(pageNum - 1)}
        >
          <Page isCurrentPage={pageNum === pageNum - 1}>◀</Page>
        </Link>
      )}
      {pageNum <= 4 &&
        totalPage.current.slice(0, 7).map((page) => (
          <Link
            key={nanoid()}
            to={`${route}/${page}`}
            onClick={() => setPageNum(page)}
          >
            <Page isCurrentPage={pageNum === page}>{page}</Page>
          </Link>
        ))}
      {pageNum > 4 &&
        totalPage.current.slice(pageNum - 4, pageNum + 3).map((page) => (
          <Link
            key={nanoid()}
            to={`${route}/${page}`}
            onClick={() => setPageNum(page)}
          >
            <Page isCurrentPage={pageNum === page}>{page}</Page>
          </Link>
        ))}
      {pageNum < Math.ceil(totalPostCount.current / perPage) && (
        <Link
          key={nanoid()}
          to={`${route}/${pageNum + 1}`}
          onClick={() => setPageNum(pageNum + 1)}
        >
          <Page isCurrentPage={pageNum === pageNum + 1}>▶</Page>
        </Link>
      )}
    </PagesContainer>
  );
}

export default Pagination;
