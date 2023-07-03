import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";
import CardForm from "./CardForm";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
// import whiteBg from "../images/whiteBg.jpg";


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

  const [word, setWord] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(totalPostNum / postLimit));
  }, [totalPostNum]);

  const getPosts = useCallback(
    (page = 1) => {
      let params = {
        _limit: postLimit,
        _sort: "id",
        _order: "desc",
        title_like: word,
        content_like: word,
      };

      setCurrentPage(page);
      if (location.pathname === "/blogs") {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: {
              ...params,
              _page: page,
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
              _page: page,
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
      if (isLoggedIn) {
        axios
          .get("https://majestic-smiling-timer.glitch.me/posts", {
            params: { ...params, _page: page },
          })
          .then((res) => {
            setPosts(res.data);
            setTotalPostNum(res.headers["x-total-count"]);
            setLoading(false);
          });
        return true;
      }
    },
    [isLoggedIn, location.pathname, word]
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

  const onSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-1 px-5">
        {renderCards()}
      </div>
      {isLoggedIn && (
        <div className="d-flex flex-row justify-content-between me-5 mt-3">
          <div />
          <div
            onClick={() => {
              history.push("/create");
            }}
            className="writeBtn"
            style={{ textDecoration: "none", color: "#333", cursor: "pointer", marginRight:"5%" }}
          >
            글쓰기
          </div>
        </div>
      )}
      <div className="container mt-3">
        <div className="row grid">
          <div className="col col-4 me-2" />
          <div className="searchCover col col-3 ms-4">
            <span className="searchImg me-2" />
            <input
              className="search mt-1 mx-1 "
              type="search"
              aria-label="Search"
              onChange={(e) => {
                setWord(e.target.value);
              }}
              onKeyUp={onSearch}
              style={{width: "87%"}}
            />
          </div>
        </div>
      </div>
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
