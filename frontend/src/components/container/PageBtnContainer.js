import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../../assets/wrappers/PageBtnContainer";

const PageBtnContainer = ({ page, numOfPage, changePage }) => {
  let pages = [1];
  if (page >= 6) {
    pages.push(-1);
    for (let i = 3; i >= 0; i--) {
      pages.push(page - i);
    }
  } else {
    for (let i = 2; i <= page; i++) {
      pages.push(i);
    }
  }

  if (page + 4 < numOfPage) {
    for (let i = 1; i < 4; i++) {
      pages.push(i + page);
    }
    pages.push(-1);
    pages.push(numOfPage);
  } else {
    for (let i = page+1; i <= numOfPage; i++) {
      pages.push(i);
    }
  }
  // TODO: remove cycle page
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPage) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPage;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button
        className={`prev-btn ${numOfPage === 1 && "disabled"}`}
        onClick={prevPage}
        disabled={numOfPage === 1}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber, index) => {
          if (pageNumber === -1) {
            return (
              <button
                key={index}
                type="button"
                className={"pageBtn disabled"}
                disabled={true}
              >
              ...
              </button>
            );
          }
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={index}
              onClick={() => changePage(pageNumber)}
              disabled={numOfPage === 1}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className={`next-btn ${numOfPage === 1 && "disabled"}`}
        onClick={nextPage}
        disabled={numOfPage === 1}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
