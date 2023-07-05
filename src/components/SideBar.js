import {Link, NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const activeStyle = {
    fontWeight : 'bold'
  }
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  return (
    <div className="sideBg d-flex flex-column align-items-center">
      <div className="prof d-flex flex-column align-items-center mt-5 mb-3 pt-5">
        <img
            src='/images/coffee.jpg'
            className="profImg rounded-circle mb-1"
          alt="프로필사진"
        />
        <p className="profP text-center mt-4"><em>2023 삶의 기록, 좋았던 것들 리뷰 적어서 담아두기</em></p>
      </div>
      <div>
        <ul className="navbar-nav my-4 text-center">
          <li className="nav-item mb-4 sideLi">
            <Link to="/" className="nav-link fs-4 sideText" >
              Home
            </Link>
          </li>
          <li className="nav-item mb-4 sideLi">
            <NavLink to="/reviews" activeStyle={activeStyle} className="nav-link fs-5 sideText" >
              Reviews
            </NavLink>
          </li>
          <li className="nav-item mb-4 sideLi">
            <NavLink to="/blogs" activeStyle={activeStyle} className="nav-link fs-5 sideText">
              Blogs
            </NavLink>
          </li>
          {isLoggedIn && <li className="nav-item mb-4 sideLi">
            <NavLink to="/private/admin" activeStyle={activeStyle} className="nav-link fs-5 sideText">
              Admin
            </NavLink>
          </li>}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
