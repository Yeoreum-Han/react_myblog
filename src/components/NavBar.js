import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const NavBar = () => {
  const activeStyle = {
    fontWeight: "bold",
  };
  const [word, setWord] = useState("");
  const history = useHistory();
  const [post, setPosts] = useState([]);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      console.log("1.axios 전: ", word);
      axios
        .get("http://localhost:3001/posts", {
          params: {
            _sort: "id",
            _order: "desc",
            privatePost: false,
            title_like: word,
          },
        })
        .then((res) => {
          setPosts(res.data);
          console.log("2.axios 후 : ", word);
          console.log(post);
          history.push({
            pathname: "/search/navResult",
            word : word,
            data: post,
          });
          console.log(word);
        });
      
    }
  };

  return (
    <nav className="navbar navBg">
      <div className="container">
        <Link className="navbar-brand navHome ms-4" to="/">
          일상기록 블로그
        </Link>
        <div className="d-flex">
          <div className="d-flex" role="search">
            <input
              className="form-control navSearch form-control-sm h-25 mt-1 me-2"
              type="search"
              aria-label="Search"
              onChange={(e) => setWord(e.target.value)}
              onKeyUp={onSearch}
            />
            <button
              className="btn navSearchBtn btn-sm btn-outline-secondary h-75 mt-1 me-3"
              type="submit"
            >
              Search
            </button>
          </div>
          <div className="d-flex text-center ms-3">
            <ul className="navbar-nav flex-row">
              <li className="nav-item navLi me-2">
                <NavLink
                  to="/reviews"
                  activeStyle={activeStyle}
                  className="navbar navText"
                >
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item navLi">
                <NavLink
                  to="/blogs"
                  activeStyle={activeStyle}
                  className="navbar navText"
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item navLi">
                <Link className="navbar navText" to="/">
                  로그인
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
