import axios from "axios";
import profile from "../images/coffee.jpg";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const [recents, setRecents] = useState([]);
  const history = useHistory();

  const getRecents = () => {
    axios
      .get("http://localhost:3001/posts", {
        params: { _limit: "6", _sort: "createdAt", _order: "desc" },
      })
      .then((res) => {
        setRecents(res.data);
      });
  };

  useEffect(() => {
    getRecents();
  }, []);

  const printDate = (timestamp) =>{
    return new Date(timestamp).toLocaleDateString();
  }

  const renderRecents = () => {
    return recents.map((recent) => {
      return (
        <div className="row py-3">
          <div className="col-1"></div>
          <div className="col-1">{recent.category}</div>
          <div className="col-7 recentPostTitle"
          onClick={()=>{history.push(`/${recent.id}`)}}
          >{recent.title}</div>
          <div className="col-2">
            {printDate(recent.createdAt)}
          </div>
        </div>
      );
    });
  };

  
  return (
    <div className="compHome d-flex flex-column">
      <h3 className="homeTitle mb-3">일상기록 블로그</h3>
      <div className="homeProf mb-2 shadow">
        <div className="row">
          <div className="col col-3"></div>
          <img
            className="homeProfImg col col-2 mt-4"
            src={profile}
            alt="블로그소개 이미지"
          />
          <div className="col col-1"></div>
          <p className="homeProfP col col-3 mt-4 text-center">
            이것저것 하루하루 있었던 일들을 <br /> 적어보는 블로그 <br />
            여행도 기억에 남기고 <br />
            써보고 좋았던 것들도 기록에 남김
          </p>
          <div className="col col-3"></div>
        </div>
      </div>
      <h3 className="recentTitle mt-5">최근 게시물</h3>
      <div className="recentsCover text-center mt-2 pb-2 shadow">
        <div className=" col">
          <div className=" recentsHeader py-3 fs-5 row">
            <div className="col-1"/>
            <div className="col-1 py-2">게시판</div>
            <div className="col-7 py-2">제목</div>
            <div className="col-2 py-2">날짜</div>
            <div className="col-1"/>
          </div>
          {renderRecents()}
        </div>
      </div>
    </div>
  );
};
export default Home;
