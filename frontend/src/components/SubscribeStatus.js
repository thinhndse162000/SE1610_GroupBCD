import moment from "moment";
import Wrapper from "../assets/wrappers/Item";
import { Link } from "react-router-dom";

const SubscribeStatus = ({ journalSubscribe, action = [] }) => {
  let date = "";
  try {
    date = moment(journalSubscribe.endDate).format("DD/MM/YYYY");
  } catch {
    date = "";
  }

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>Subscribe Status</h5>
        </div>
      </header>
      <div className="content">
        <footer>
          <p>End date: {date}</p>
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
};

export default SubscribeStatus;
