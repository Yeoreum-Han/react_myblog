# myBlog - 짧은 일기 블로그

## 소개
![md_myblog03](https://github.com/Yeoreum-Han/portfolio_sogong/assets/127937169/0fa47552-ecd4-46be-b61f-14def5388637)   
일상에서 기록하고 싶은 순간들을 사진과 함께 짧은 글로 남길 수 있는 블로그입니다.   
Reviews와 Blogs로 카테고리를 나누어 글을 주제에 따라 모아볼 수 있습니다.   
상단 네비게이션 바에서 게시글을 검색할 수 있습니다.

## 기술스택
 * html5
 * css3
 * react 
 * Bootstrap v5.2
 * json-server

## 핵심기능
**1. 로그인상태**   
![md_myblog02](https://github.com/Yeoreum-Han/react_myblog/assets/127937169/22a02aa8-276e-4e16-8a67-095d031a830d)   
로컬스토리지와 리덕스 스토어를 이용해 로그인 상태일 때만 Admin 페이지가 활성화되고 게시글 수정 및 삭제가 가능합니다.   
또한 Reviews와 Blogs 페이지에서 비공개 글을 볼 수 있습니다.   
NavBar에서 검색 할 때도 로그인 상태에 따라 비공개 글이 검색결과로 보여집니다.   
```js
//authSlice.js
//여기서 export한 isLoggedIn은 다른 컴포넌트에서 useSelector를 이용해  리턴값으로 받아와서 사용.

import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn : false
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state) => {                            /* 로그인일 때 */
            localStorage.setItem('isLoggedIn','yes');   /*로컬스토리지에 저장하고*/
            state.isLoggedIn = true;                    /*상태값을 true로 변경*/
        },
        logout : (state) => {                           /* 로그아웃일 때*/
            localStorage.removeItem('isLoggedIn');      /* 로컬스토리지에서 삭제하고*/
            state.isLoggedIn = false;                   /* 상태값을 false로 변경 */
        } 
    }
})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
   
   
//다른 컴포넌트에서 사용할 때
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

```


      
**2. 유효성 검사**   
![md_myblog01](https://github.com/Yeoreum-Han/react_myblog/assets/127937169/6500b894-0923-4ea8-bac5-b328fa158e24)   
글을 작성하거나 수정할 때 빈 부분이 있는지 확인하고, 있다면 저장으로 넘어가지 않고 작성하도록 알려줍니다. 
```js
//유효성검사

//변수 ...Error의 기본값은 false
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [cateError, setCateError] = useState(false);

/*저장버튼 클릭시 onSubmit함수 실행
  validateCheck함수가 true일때만 axios 동작*/
  const onSubmit = () => {
    setTitleError(false);
    setContentError(false);
    setCateError(false);
    if (validateCheck()) {
        ...
    }
  }
/*
 validateCheck함수
 기본값이 true인 변수 validate을 return한다. 
 title, content, category 중 하나라도 빈칸이면 
 ...Error를 true로 설정하고 validate도 false로 한다.
*/
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
```
```xml
<!--jsx코드-->   
<div className="input-group input-group-sm formSelect mb-3">
    <label className="input-group-text" htmlFor="inputSelect">
        카테고리
    </label>
    <select>
        ...
    </select>
</div>
{cateError && <p style={{ color: "red" }}>카테고리를 선택해주세요</p>}
<input
    ...
    className={`form-control formTitle mb-3 
    ${titleError && "errorBorder"
        }`}
    ...
/>
{titleError && <p style={{ color: "red" }}>제목을 작성해주세요</p>}
<textarea
    className={`form-control formContent mb-3 ${contentError && "errorBorder"
    }`}
    ...
>
</textarea>
{contentError && <p style={{ color: "red" }}>내용을 채워주세요</p>}

```
## 트러블슈팅
**1. nav검색**   
NavBar에 검색기능을 넣고 하단 ListForm에서 결과를 표시하고 싶었는데 컴포넌트간 데이터 직접 전달이 불가능하므로 구현이 어려웠습니다.   
이는 **리덕스 스토어**를 사용해 reducer로 **keyword** 상태를 업데이트하고 useSelector로 값을 받아와 axios로 get하는 방식으로 해결했습니다.   
검색어를 다 작성한 후 **엔터를 눌렀을 때만 검색**이 되도록 NavBar에서 **word라는 state로 입력값을 업데이트** 하도록 했습니다.   
```js
//searchSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  keyword: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    saveKeyword : (state, action) => {
      state.keyword = action.payload;
    },
  },
});
export const { saveKeyword } = searchSlice.actions;
export default searchSlice.reducer;

//NavBar와 ListForm 컴포넌트에서 useSelector로 keyword를 사용
const keyword = useSelector((state) => state.search.keyword);
```
   
```js
<!--검색창 요소-->
<div className="d-flex flex-row mt-2 me-3">
    <input
        className="search form-control"
        type="search"
        placeholder="포스트 검색"
        aria-label="Search" 
        value={word}        
        onChange={(e) => setWord(e.target.value)}   /*값이 입력될 때마다 word 상태 업데이트*/
        onKeyUp={toSearch}                          /*toSearch함수로 엔터키가 up일때만 검색실행*/
    />
</div>
```
```js
//NavBar.js
  const [word, setWord] = useState(keyword)

  const toSearch = (e) => {             
    if (e.key === "Enter") {            /*엔터키 일때만*/
      dispatch(saveKeyword(word));      /*word 값으로 keyword 상태 업데이트*/
      history.push("/search/result");   /*해당 주소로 이동시키고*/
      setWord("");                      /*word 값 초기화*/
    }
  };
```
**2. 이미지 업로드와 불러오기**   
이미지를 미리 보기까지는 됐는데 db에 저장 되지 않는 문제가 있었습니다.   
실행시 단계별로 확인해보고 검색한 결과, 이 프로젝트는 **json-server를 사용**하기 때문에 이미지파일을 저장하려면   
**객체를 string으로 변환** 해야 했습니다. 그래서 이를 FileReader를 사용해 해결했습니다.   
```js
  const updateImage = (e) => {                 /*이미지 미리보기*/
    const file = e.target.files[0];         
    if (file) { 
      let image = URL.createObjectURL(file);   /*파일의 데이터를 임시로 참조하는 주소 생성*/    
      setImageUrl(image);                      /*imageUrl 상태 업데이트하면 이미지 미리보기 가능*/
      saveImage(file);                         /*saveImage함수로 파일저장*/
    }
  };

  const saveImage = (file) => {               /*파일을 base64로 변환해  저장하는 함수*/
    const reader = new FileReader();          /*변환을 위한 객체 FileReader*/
    reader.readAsDataURL(file);               /*파일을 읽어서 객체 url로 반환*/
    reader.onloadend = () => {                /*읽기 완료 되면 앍은 내용을 ImageString에 업데이트*/
      const base64 = reader.result;
      setImageString(base64);
    };
  };
```
