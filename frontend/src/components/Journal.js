import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";

const Journal = ({ journal, type = "compact" }) => {
  const { name, introduction, organization, issn, slug } = journal;
  /*
        {
        "journalId": "2",
        "name": "Chemistry",
        "introduction": "this is the second chemistry",
        "organization": "HUS",
        "issn": "1234-124"
    */
  return (
    <Wrapper>
      <header>
        <div className="info">
          <Link to={`/journal/${slug}`}>
            <h3>{name}</h3>
          </Link>
          <p>
            <strong>ISSN</strong>: {issn} - <strong>Organization</strong>:{" "}
            {organization}
          </p>
        </div>
      </header>
      {type === "full" && (
        <div className="content">
          <div className="content-center">
            <h5>Introduction</h5>
            <p>{introduction}</p>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Journal;
