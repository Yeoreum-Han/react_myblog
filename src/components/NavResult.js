import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

const NavResult = () => {
  const location = useLocation();
  const [word, setWord] = useState("");
  const [post, setPosts] = useState([]);

  const get = () => {
    setWord(location.word);
    setPosts(location.data);
    console.log('1.word :', word);
    console.log('2.data : ', post);
  }

  // const getPosts = () => {
  //   setWord(location.word);
  //   console.log('1.axios 전: ', word);
  //   axios.get("http://localhost:3001/posts", {params : {_sort: 'id', _order : 'desc', privatePost : false, title_like : word }}).then(res=>{
  //     setPosts(res.data);
  //     console.log('2.axios 후 : ', word);
  //   })
  // }
  useEffect(()=>{
    get();
  },[]);

  return (
    <div className="comp d-flex flex-column">
      <h3 className="reviewsTitle mb-5">검색결과</h3>
      <p>result 값이다</p>
      <p>{word}</p>
    </div>
  );
};
export default NavResult;
