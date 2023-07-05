import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";
import CardForm from "./CardForm";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const ListForm = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const postLimit = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostNum, setTotalPostNum] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const urlPageParams = new URLSearchParams(location.search);
  const pageParam = urlPageParams.get("page");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const keyword = useSelector((state) => state.search.keyword);

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, [keyword]);

  useEffect(() => {
    setTotalPage(Math.ceil(totalPostNum / postLimit));
  }, [totalPostNum]);

  const getSearch = (params) => {
    setLoading(true);
    if (!isLoggedIn) {
      if (keyword !== "") {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: {
              ...params,
              title_like: keyword,
              content_like: keyword,
              privatePost: false,
            },
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
      }
      return true;
    } else {
      if (keyword !== "") {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: {
              ...params,
              title_like: keyword,
              content_like: keyword,
            },
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
      }
      return true;
    }
  };

  const getPosts = useCallback(
    (page = 1) => {
      let params = {
        _limit: postLimit,
        _sort: "id",
        _order: "desc",
        _page: page,
      };

      setCurrentPage(page);
      if (location.pathname === "/blogs") {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: {
              ...params,
              category: "blogs",
              privatePost: false,
            },
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
        return true;
      }
      if (location.pathname === "/reviews") {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: {
              ...params,
              category: "reviews",
              privatePost: false,
            },
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
        return true;
      }
      if (location.pathname === "/search/result") {
        getSearch(params);
      }
      if (isLoggedIn) {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params,
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
        return true;
      }
    },
    [isLoggedIn, location.pathname, keyword]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`);
    getPosts(page);
  };

  const renderCards = () => {
    return posts.map((post) => {
      return (
        <CardForm
          key={post.id}
          title={post.title}
          content={post.content}
          imgSrc={post.imageString}
          onClick={() => {
            history.push(`/${post.id}`);
          }}
        />
      );
    });
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-1 px-5">
        {posts.length > 0 ? renderCards() : "글이 없습니다."}
      </div>
      {isLoggedIn && (
        <div className="d-flex flex-row justify-content-between me-5 mt-3">
          <div />
          <div
            onClick={() => {
              history.push("/create");
            }}
            className="writeBtn"
            style={{
              textDecoration: "none",
              color: "#333",
              cursor: "pointer",
              marginRight: "5%",
            }}
          >
            글쓰기
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center mt-4 pe-5">
        {totalPage > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onClick={onClickPageButton}
          />
        )}
      </div>
    </div>
  );
};
export default ListForm;
