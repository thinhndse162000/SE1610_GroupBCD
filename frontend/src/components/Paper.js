import moment from 'moment'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Item'

const Paper = ({ paper, action=[] }) => {
    let date = moment(paper.submitTime).format('DD/MM/YYYY')
    return (
      <Wrapper>
        <header>
          <div className="info">
            <h5>{paper.title}</h5>
            <p>
              {paper.numberOfPage} {paper.numberOfPage > 1 ? "pages" : "page"} - Submit date: {date}
            </p>
            <p>Grade: {paper.grade} - <span className={`status ${paper.status.toLowerCase()}`}>{paper.status}</span></p>
          </div>
        </header>
        <div className="content">
          <div>
            <h5>Abstract</h5>
            <p>{paper.summary}</p>
          </div>
          <footer>
            <div className="actions">
              {action.map((act, index) => {
                return act.type === "link" ? (
                  <Link
                    key={index}
                    to={act.to}
                    className={act.className}
                    onClick={act.onClick}
                  >
                    {act.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    type="button"
                    className={act.className}
                    onClick={act.onClick}
                  >
                    {act.label}
                  </button>
                );
              })}
            </div>
          </footer>
        </div>
      </Wrapper>
    );
}

export default Paper