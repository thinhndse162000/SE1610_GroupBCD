import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import {
  Loading,
  Paper,
  FormRow,
  FormRowSelect,
  PageBtnContainer,
} from "../../../components";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getJournalFromManager,
  getSentPaper,
} from "../../../context/service/journalService";
import { handleChange } from "../../../context/service/utilService";

const ManagerPaper = () => {
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    author: { paperStatusOptions },
    manager: {
      sentPapers: papers,
      journal,
      searchPaper: { keyword, startDate, status, page, numOfPage },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSentPaper({}));
    dispatch(getJournalFromManager());
  }, [dispatch]);

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "manager_searchPaper",
      })
    );
  };

  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "manager_searchPaper" })
    );
  };

  useEffect(() => {
    dispatch(
      getSentPaper({
        keyword,
        startDate,
        status: status === "ALL" ? null : status,
        page,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      getSentPaper({
        keyword,
        startDate,
        status: status === "ALL" ? null : status,
        page,
      })
    );
    // TODO: set page number to 1
  };

  return (
    <>
      {journal != null && (
        <ItemWrapper>
          <header>
            <div className="info">
              <h3>{journal.name}</h3>
            </div>
            <p>
              <strong>ISSN</strong>: {journal.issn} -{" "}
              <strong>Organization</strong>: {journal.organization}
            </p>
          </header>
        </ItemWrapper>
      )}

      <SearchWrapper>
        <form className="form">
          <div className="journal-form">
            <FormRow
              labelText="Keyword"
              type="text"
              name="keyword"
              value={keyword}
              handleChange={handleInputChange}
            />

            <FormRowSelect
              labelText="Status"
              name="status"
              value={status}
              handleChange={handleInputChange}
              list={[...paperStatusOptions, "ALL"]}
            />

            <button className="btn" disabled={isLoading} onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
      </SearchWrapper>
      <PageBtnContainer
        page={page}
        numOfPage={numOfPage}
        changePage={handlePageChange}
      />

      {isLoading ? (
        <Loading center />
      ) : papers.length > 0 ? (
        <>
          <ContainerWrapper>
            <div className="container">
              {papers.map((paper, index) => {
                let action = [];
                if (paper.status === "PENDING") {
                  action.push({
                    type: "link",
                    to: `send-invitation/${paper.paperId}`,
                    className: "btn edit-btn",
                    label: "Send invitation",
                  });
                }
                return (
                  <Paper
                    key={index}
                    paper={paper}
                    link={`paper-detail/${paper.paperId}`}
                    action={action}
                  />
                );
              })}
            </div>
          </ContainerWrapper>

          <PageBtnContainer
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />
        </>
      ) : (
        <p>No paper found</p>
      )}
    </>
  );
};

export default ManagerPaper;
