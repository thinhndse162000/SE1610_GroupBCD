import moment from 'moment'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Paper'
import { useAppContext } from '../context/appContext'

const Paper = ({ paper }) => {
    const { setEditPaper, deletePaper } = useAppContext()
    let date = moment(paper.submitTime).format('DD/MM/YYYY')
    return (
      <Wrapper>
        <header>
          <div className="info">
            <h5>{paper.title}</h5>
            <p>
              {paper.numberOfPage} {paper.numberOfPage > 1 ? "pages" : "page"} - Submit date: {date}
            </p>
            <p>Grade: 10 - <span className={`status ${paper.status}`}>{paper.status}</span></p>
          </div>
        </header>
        <div className="content">
          <div>
            <h5>Abstract</h5>
            <p>{paper.summary}</p>
          </div>
          <footer>
            <div className="actions">
              <Link
                to="submit-paper"
                className="btn edit-btn"
                onClick={() => setEditPaper(paper.paperId)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deletePaper(paper.paperId)}
              >
                Delete
              </button>
            </div>
          </footer>
        </div>
      </Wrapper>
    );
}

export default Paper