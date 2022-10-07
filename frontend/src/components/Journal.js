import { Link } from "react-router-dom";
import Wrapper from '../assets/wrappers/Item'

const Journal = ({ journal }) => {
    const { journalId, name, introduction, organization, issn } = journal
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
            <Link to={"/journal/" + journalId}>
              <h3>{name}</h3>
            </Link>
          </div>
        </header>
        <div className="content">
          <p>
            <strong>ISSN</strong>: {issn} - <strong>Organization</strong>: {organization}
          </p>
          <p>{introduction}</p>
        </div>
      </Wrapper>
    );
}

export default Journal;