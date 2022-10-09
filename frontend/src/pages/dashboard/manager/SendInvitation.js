import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FormRow,
  Paper,
  ReviewerResultContainer,
  SentInvitationContainer,
} from "../../../components";
import { getPaper } from "../../../context/service/paperService";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { searchAvailableReviewer } from "../../../context/service/reviewerService";

const SendInvitation = () => {
  const { paperId } = useParams();
  const { isLoading } = useSelector((state) => state.base);
  const { paper: paperDetail } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    dispatch(getPaper(paperId));
  }, [paperId, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchAvailableReviewer({ paperId, keyword }));
  };
  if (Object.keys(paperDetail).length !== 0) {
    return (
      <>
        <Paper paper={paperDetail.paper} />
        <SentInvitationContainer />
        <SearchWrapper>
          <form className="form">
            <h5>Search Reviewer</h5>
            <div className="journal-form">
              <FormRow
                labelText="Name"
                type="text"
                name="keyword"
                value={keyword}
                handleChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="btn"
                disabled={isLoading}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </SearchWrapper>
        <ReviewerResultContainer />
      </>
    );
  }

  return (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default SendInvitation;
