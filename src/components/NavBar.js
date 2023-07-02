import { Link, NavLink } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const activeStyle = {
    fontWeight: "bold",
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  
  return (
    <nav className="navbar navBg">
      <div className="container">
        <Link className="navbar-brand navHome" to="/">
          일상기록 블로그
        </Link>
        <div className="d-flex">
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
                <button className="navbar navBtn navText"
                  onClick={()=>{
                    if(isLoggedIn){
                      dispatch(logout());
                    } else {
                      dispatch(login());
                    }
                  }}
                >
                  {isLoggedIn ? '로그아웃' : '로그인'}
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
