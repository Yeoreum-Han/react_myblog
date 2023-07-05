import { Link, NavLink } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { saveKeyword } from "../store/searchSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";


const NavBar = () => {
  const activeStyle = {
    fontWeight: "bold",
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const keyword = useSelector((state) => state.search.keyword);

  const [word, setWord] = useState(keyword)


  const toSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(saveKeyword(word));
      history.push("/search/result");
      setWord("");
    }
  };

  return (
    <nav className="navbar navBg">
      <div className="container">
        <Link className="navbar-brand navHome" to="/">
          일상기록 블로그
        </Link>
        <div className="d-flex">
          <div
            className="d-flex justify-content-end"
            style={{
              width: "30vw",
            }}
          >
            <div className="d-flex flex-row mt-2 me-3">
              <input
                className="search form-control"
                type="search"
                placeholder="포스트 검색"
                aria-label="Search"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyUp={toSearch}
              />
            </div>
            <ul
              className="navbar-nav flex-row justify-content-around"
              style={{
                width: "50%",
              }}
            >
              <li className="nav-item navLi">
                <NavLink
                  to="/reviews"
                  activeStyle={activeStyle}
                  className="navbar navText"
                >
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item navLi ms-1">
                <NavLink
                  to="/blogs"
                  activeStyle={activeStyle}
                  className="navbar navText"
                  style={{ width: "55px" }}
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item navLi">
                <button
                  className="navbar navBtn navText"
                  onClick={() => {
                    if (isLoggedIn) {
                      dispatch(logout());
                    } else {
                      dispatch(login());
                    }
                  }}
                >
                  {isLoggedIn ? "로그아웃" : "로그인"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
