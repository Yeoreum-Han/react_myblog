import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";
import CardForm from "./CardForm";
import Pagination from "./Pagination";

const ListForm = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const postLimit = 9;
  let params = {
    _limit : postLimit,
    _sort : 'id',
    _order : 'desc',
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostNum, setTotalPostNum] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const urlPageParams = new URLSearchParams(location.search);
  const pageParam = urlPageParams.get('page');


  const getPosts = useCallback ((page = 1) => {
    setCurrentPage(page);
    if (location.pathname === "/blogs") {
      axios
        .get("http://localhost:3001/posts", { params : {...params, _page : page, category : "blogs", privatePost : false}})
        .then((res) => {
          setPosts(res.data);
          setTotalPostNum(res.headers['x-total-count']);
        });
      return true;
    }
    if (location.pathname === "/reviews") {
      axios
        .get("http://localhost:3001/posts", { params: { ...params, _page : page, category: "reviews", privatePost : false } })
        .then((res) => {
          setPosts(res.data);
          setTotalPostNum(res.headers['x-total-count']);
        });
      return true;
    }
    if(isAdmin){
      axios
        .get("http://localhost:3001/posts", { params: { ...params, _page : page} })
        .then((res) => {
          setPosts(res.data);
          setTotalPostNum(res.headers['x-total-count']);
        });
      return true;
    }
  },[isAdmin, location.pathname]);

  useEffect(()=>{
    setTotalPage(Math.ceil(totalPostNum / postLimit))
  },[totalPostNum]);

  const onClickPageButton = (page) =>{
    history.push(`${location.pathname}?page=${page}`);
    getPosts(page);
  }

  useEffect(()=>{
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  },[getPosts, pageParam]);

  const renderCards = () => {
    return posts
      .map((post) => {
        return (
          <CardForm
            key={post.id}
            title={post.title}
            content={post.content}
            imgSrc={post.imageString}
            onClick={()=>{history.push(`/${post.id}`)}}
          />
        );
      });
  };


  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">{renderCards()}</div>
      <div className="d-flex justify-content-center mt-5 pt-5"> 
        {totalPage > 1 && <Pagination currentPage={currentPage} totalPage={totalPage} onClick={onClickPageButton}/>}
      </div>
    </div>

  );
};
export default ListForm;
