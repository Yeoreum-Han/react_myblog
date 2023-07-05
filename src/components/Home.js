import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [recents, setRecents] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecents();
  }, []);

  const getRecents = () => {
    axios
      .get("https://majestic-smiling-timer.glitch.me/posts", {
        params: {
          _limit: "6",
          _sort: "createdAt",
          _order: "desc",
          privatePost: false,
        },
      })
      .then((res) => {
        setRecents(res.data);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const renderRecents = () => {
    return recents.map((recent) => {
      return (
        <div className="row py-3" key={recent.id}>
          <div className="col-1"></div>
          <div className="col-1">{recent.category}</div>
          <div
            className="col-7 recentPostTitle"
            onClick={() => {
              history.push(`/${recent.id}`);
            }}
          >
            {recent.title}
          </div>
          <div className="col-2">{printDate(recent.createdAt)}</div>
        </div>
      );
    });
  };

  return (
    <div className="comp d-flex flex-column">
      <h3 className="homeTitle mb-3">일상기록 블로그</h3>
      <div className="homeProf mb-2 shadow">
        <div className="row">
          <div className="col col-3"></div>
          <img
            className="homeProfImg col col-2 mt-4"
            src="/images/coffee.jpg"
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
        <div className="col">
          <div className=" recentsHeader py-3 fs-5 row">
            <div className="col-1" />
            <div className="col-1 py-2">분류</div>
            <div className="col-7 py-2">제목</div>
            <div className="col-2 py-2">날짜</div>
            <div className="col-1" />
          </div>
          {renderRecents()}
        </div>
      </div>
    </div>
  );
};
export default Home;
