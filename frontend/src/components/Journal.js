import { Link } from "react-router-dom";
import Wrapper from '../assets/wrappers/Paper'

const Journal = ({ journal }) => {
    const { journalID, name, introduction, organization, issn } = journal
    /*
        {
        "journalID": "2",
        "name": "Chemistry",
        "introduction": "this is the second chemistry",
        "organization": "HUS",
        "issn": "1234-124"
    */
    return (
      <Wrapper>
        <header>
          <div className="info">
            <Link to={"/journal/" + journalID}>
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