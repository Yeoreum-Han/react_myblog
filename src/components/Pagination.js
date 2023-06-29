import propTypes from "prop-types";

const Pagination = ({currentPage, totalPage, onClick, pageLimit}) => {
    const currentSet = Math.ceil(currentPage/pageLimit);
    const startPage = pageLimit * (currentSet - 1) + 1;
    const lastSet = Math.ceil(totalPage/pageLimit);
    let numberOfPageForSet = currentSet === lastSet ? totalPage%pageLimit : pageLimit;
    if(numberOfPageForSet===0) numberOfPageForSet=pageLimit;


  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {currentSet !==1 && <li className="page-item">
          <div className="page-link" aria-label="Previous" onClick={()=> onClick(startPage-pageLimit)}>
            <span aria-hidden="true">&laquo;</span>
          </div>
        </li>}
        {Array(numberOfPageForSet).fill(startPage)
        .map((value, index) => value + index).map(pageNumber => {
            return (
                <li key={pageNumber} 
                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                    <div className="page-link cursor-pointer" 
                    onClick={()=>{onClick(pageNumber)}}>{pageNumber}</div>
                </li>
            )
        })}
        {currentSet !== lastSet && <li className="page-item">
          <div className="page-link" aria-label="Next" onClick={()=> onClick(startPage+pageLimit)}>
            <span aria-hidden="true">&raquo;</span>
          </div>
        </li>}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
    currentPage : propTypes.number,
    totalPage : propTypes.number,
    onClick : propTypes.func.isRequired,
    pageLimit : propTypes.number
}

Pagination.defaultProps = {
    currentPage : 1,
    pageLimit : 3
}
export default Pagination;

