import axios from "axios";
import { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const CreateForm = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [privatePost, setPrivatePost] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageString, setImageString] = useState("");

  //유효성검사
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [cateError, setCateError] = useState(false);

  const history = useHistory();

  const { id } = useParams();
  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      let image = URL.createObjectURL(file);
      setImageUrl(image);
      saveImage(file);
    }
  };

  const saveImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      setImageString(base64);
    };
  };

  const validateCheck = () => {
    let validate = true;
    if (title === "") {
      setTitleError(true);
      validate = false;
    }
    if (content === "") {
      setContentError(true);
      validate = false;
    }
    if (category === "") {
      setCateError(true);
      validate = false;
    }
    return validate;
  };

  const onSubmit = () => {
    setTitleError(false);
    setContentError(false);
    setCateError(false);
    if (validateCheck()) {
      if (editing) {
        axios
          .patch(`http://localhost:3001/posts/${id}`, {
            category,
            title,
            content,
            imageString,
            privatePost,
          })
          .then(() => {
            history.push(`/${id}`);
          });
      } else {
        axios
          .post("http://localhost:3001/posts", {
            category,
            title,
            createdAt: Date.now(),
            content,
            imageString,
            privatePost,
          })
          .then(() => {
            history.push(`/${category}`);
            URL.revokeObjectURL(imageUrl);
          });
      }
    }
  };

  const goBack = () => {
    if (editing) {
      history.push(`/${id}`);
    } else {
      history.push("/private/admin");
    }
  };

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setCategory(res.data.category);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImageString(res.data.imageString);
        setPrivatePost(res.data.privatePost);
      });
    }
  }, [id, editing]);

  return (
    <div className="pageCreate d-flex flex-column">
      <h3 className="createTitle">{editing ? "글 수정" : "글쓰기"}</h3>
      <div className="inputForms mt-4">
        <form className="mb-3">
          <label htmlFor="inputTitle" className="form-label fs-4">
            제목
          </label>

          <div className="input-group input-group-sm formSelect mb-3">
            <label className="input-group-text" htmlFor="inputSelect">
              카테고리
            </label>
            <select
              className="form-select "
              id="inputSelect"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">카테고리</option>
              <option value="blogs">blogs</option>
              <option value="reviews">reviews</option>
              <option value="trip">여행</option>
            </select>
          </div>
          {cateError && <p style={{ color: "red" }}>카테고리를 선택해주세요</p>}
          <input
            type="text"
            className={`form-control formTitle mb-3 ${
              titleError && "errorBorder"
            }`}
            id="inputTitle"
            placeholder="제목"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {titleError && <p style={{ color: "red" }}>제목을 작성해주세요</p>}
          <label htmlFor="inputContent" className="form-label fs-4 mt-2">
            내용
          </label>
          <input
            className="form-control form-control-sm formFile"
            type="file"
            id="inputFile"
            name="fileImage"
            multiple
            onChange={updateImage}
          />
          <div className="imgCover my-3" style={{textAlign:'center'}}>
            {editing ? (
              <img
                src={imageString}
                alt="저장한이미지"
                style={{ maxWidth: "500px", maxHeight: "300px" }}
              />
            ) : (
              <img
                src={imageUrl && imageUrl}
                alt="저장한이미지"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
          </div>
          <textarea
            className={`form-control formContent mb-3 ${
              contentError && "errorBorder"
            }`}
            style={{textAlign:'center'}}
            id="inputContent"
            rows="10"
            placeholder="5줄로 작성"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          {contentError && <p style={{ color: "red" }}>내용을 채워주세요</p>}

          <div className="d-flex flex-row justify-content-between mt-4 checkAndBtn">
            <div className="form-check">
              <input
                className="form-check-input inputCheck"
                type="checkbox"
                id="inputCheckbox"
                checked={privatePost}
                onChange={(e) => {
                  setPrivatePost(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="inputCheckbox">
                비공개
              </label>
            </div>
            <div className="d-flex flex-row btnCreateForm">
              <button
                type="button"
                className="btn btnSubmit btn-outline-primary"
                onClick={onSubmit}
              >
                {editing ? "수정" : "저장"}
              </button>
              <button
                type="button"
                className="btn btnCancel btn-danger ms-2"
                onClick={goBack}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateForm;
