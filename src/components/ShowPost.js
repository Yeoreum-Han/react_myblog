import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowPosts = () => {
  const { id } = useParams();

  const [post, setPost] = useState([]);

  const history = useHistory();

  const getPosts = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  const moveToEdit = (id) => {
    history.push(`/${id}/edit`);
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
      history.push('/private/admin');
    });
  }

  useEffect(() => {
    getPosts(id);
  }, [id]);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  return (
    <div className="comp d-flex flex-column">
      <div className="showForm">
        <div className="mb-3">
          <p className="showTitle fs-2">{post.title}</p>
          <div className="d-flex flex-row mb-3">
            <p className="fs-6">{post.category}</p>
            <p className="mx-3">|</p>
            <p className="showDate">
              {printDate(post.createdAt)}
            </p>
          </div>
          <div className="showContent fs-4 text-center">
            <img src={post.imageString} alt="..." className="showImgSize" />
            <p className="mt-5 fs-6">{post.content}</p>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between mt-4">
          <div className="form-check">
            <input
              className="form-check-input inputCheck"
              type="checkbox"
              id="inputCheckbox"
              checked={post.privatePost}
              disabled
            />
            <label className="form-check-label" htmlFor="inputCheckbox">
              비공개
            </label>
          </div>
          <div>
            <button type="button" className="btn btnEdit btn-outline-success ms-2" onClick={()=>{moveToEdit(post.id)}}>
              수정
            </button>
            <button type="button" className="btn btnCancel btn-danger ms-2"
            onClick={()=>{deletePost(post.id)}}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowPosts;
