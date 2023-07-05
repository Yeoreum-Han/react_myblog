import ListForm from "./ListForm";

const SearchResult = () => {
    return (
        <div className="comp d-flex flex-column">
          <h3 className="compTitle mb-5">검색 결과</h3>
            <ListForm />
        </div>
      );
    }

export default SearchResult;