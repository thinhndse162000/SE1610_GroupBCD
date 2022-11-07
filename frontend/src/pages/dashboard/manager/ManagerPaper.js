import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import {
  Loading,
  Paper,
  FormRow,
  FormRowSelect,
  PageBtnContainer,
  Alert,
} from "../../../components";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getJournalFromManager,
  getSentPaper,
} from "../../../context/service/journalService";
import { handleChange } from "../../../context/service/utilService";
import { useState } from "react";
import {
  updatePaperStatus,
  updatePaperStatusBulk,
} from "../../../context/service/paperService";

const ManagerPaper = () => {
  const dispatch = useDispatch();
  const {
    base: { isLoading, showAlert },
    author: { paperStatusOptions },
    manager: {
      journal,
      selectedPaper,
      searchPaper: {
        keyword,
        startDate,
        status,
        page,
        numOfPage,
        result: papers,
      },
    },
  } = useSelector((state) => state);
  const [selectMode, setSelectMode] = useState(false);

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

  const handleSelectMode = (e) => {
    e.preventDefault();
    setSelectMode(!selectMode);

    dispatch(
      handleChange({
        name: "status",
        value: "EVALUATING",
        type: "manager_searchPaper",
      })
    );
    if (page === 1) {
      dispatch(
        getSentPaper({
          keyword,
          startDate,
          status: "EVALUATING",
          page,
        })
      );
    } else {
      handlePageChange(1);
    }
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
    if (page === 1) {
      dispatch(
        getSentPaper({
          keyword,
          startDate,
          status: status === "ALL" ? null : status,
          page,
        })
      );
    } else {
      handlePageChange(1);
    }
  };

  const handleSelect = (paper) => {
    var checkbox = document.getElementById(`paper-${paper.paperId}`);
    let newPapers = selectedPaper;
    if (checkbox.checked) {
      newPapers.push({ paperId: paper.paperId });
    } else {
      newPapers = newPapers.filter(
        (tmpPaper) => tmpPaper.paperId !== paper.paperId
      );
    }
    dispatch(
      handleChange({
        name: "selectedPaper",
        value: newPapers,
        type: "manager",
      })
    );
  };

  const handleButtonUpdate = (e, status) => {
    e.preventDefault();
    dispatch(
      updatePaperStatusBulk(
        selectedPaper.map((paper) => paper.paperId),
        status
      )
    );

    setSelectMode(!selectMode);
    dispatch(
      handleChange({
        name: "status",
        value: "ALL",
        type: "manager_searchPaper",
      })
    );
    if (page === 1) {
      dispatch(
        getSentPaper({
          keyword,
          startDate,
          status: null,
          page,
        })
      );
    } else {
      handlePageChange(1);
    }
  };

  const checkObject = (paperId) => {
    for (let i = 0; i < selectedPaper.length; i++) {
      if (selectedPaper[i].paperId === paperId) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      {showAlert && <Alert />}
      {Object.getOwnPropertyNames(journal).length !== 0 && (
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
              disabled={selectMode}
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
      {papers.length > 0 && (
        <span className="flex">
          <div className="center">
            <button className="btn pageBtnAlign" onClick={handleSelectMode}>
              Select mode
            </button>
          </div>
          <PageBtnContainer
            className="flex-end"
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />
        </span>
      )}

      {selectMode && (
        <div>
          <button
            className="btn"
            onClick={(e) => handleButtonUpdate(e, "ACCEPTED")}
          >
            Accept
          </button>
          <button
            className="btn"
            onClick={(e) => handleButtonUpdate(e, "REJECTED")}
          >
            Reject
          </button>
        </div>
      )}

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
                } else if (paper.status === "EVALUATING" && !selectMode) {
                  action.push({
                    type: "button",
                    className: "btn accept-btn",
                    label: "Accept",
                    onClick: () =>
                      dispatch(updatePaperStatus(paper.paperId, "ACCEPTED")),
                  });
                  action.push({
                    type: "button",
                    className: "btn reject-btn",
                    label: "Reject",
                    onClick: () =>
                      dispatch(updatePaperStatus(paper.paperId, "REJECTED")),
                  });
                }
                if (selectMode) {
                  let checkboxId = `paper-${paper.paperId}`;
                  let onClick = (e) => {
                    e.preventDefault();
                    var checkbox = document.getElementById(
                      `paper-${paper.paperId}`
                    );
                    checkbox.click();
                  };

                  return (
                    <Paper
                      key={index}
                      paper={paper}
                      checkbox={true}
                      checked={checkObject(paper.paperId)}
                      checkboxId={checkboxId}
                      handleCheck={() => handleSelect(paper)}
                      onClick={onClick}
                      action={action}
                    />
                  );
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
