import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../../assets/wrappers/PageBtnContainer'

const PageBtnContainer = ({ page, numOfPage, changePage }) => {

  const pages = Array.from({ length: numOfPage }, (_, index) => {
    return index + 1
  })
  // TODO: remove cycle page
  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPage) {
      newPage = 1
    }
    changePage(newPage)
  }
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPage
    }
    changePage(newPage)
  }

  return (
    <Wrapper>
    <button className={`prev-btn ${numOfPage === 1 && "disabled"}`} onClick={prevPage} disabled={numOfPage === 1}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              disabled={numOfPage === 1}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className={`next-btn ${numOfPage === 1 && "disabled"}`} onClick={nextPage} disabled={numOfPage === 1}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
