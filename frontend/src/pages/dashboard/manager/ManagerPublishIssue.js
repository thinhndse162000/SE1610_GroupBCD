import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Alert,
  FormRow,
  FormRowSelect,
  Loading,
  PageBtnContainer,
  Paper,
  ReviewReport,
} from "../../../components";
import {
  createIssue,
  getAcceptedPaper,
  getLatestIssue,
} from "../../../context/service/journalService";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as PageButtonWrapper } from "../../../assets/wrappers/PageBtnContainer";
import { handleChange } from "../../../context/service/utilService";
import { getPaperDetail } from "../../../context/service/paperService";
import { useNavigate } from "react-router-dom";

const ManagerPublishIssue = () => {
  const {
    base: { isLoading, alertType, showAlert },
    manager: {
      publishIssue: {
        result: papers,
        publishes,
        startDate,
        endDate,
        latestIssue,
        confirm,
        page,
        numOfPage,
      },
    },
    author: { paperDetail },
  } = useSelector((state) => state);
  const [paperDetailId, setPaperDetailId] = useState();
  const [currentRound, setCurrentRound] = useState();
  const [errors, setErrors] = useState({ noError: true });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLatestIssue());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAcceptedPaper({ page: page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (paperDetailId != null) {
      dispatch(getPaperDetail(paperDetailId));
    }
  }, [dispatch, paperDetailId]);

  useEffect(() => {
    if (paperDetail.paper != null) {
      setCurrentRound(paperDetail.paper.round);
    }
  }, [paperDetail]);

  useEffect(() => {
    if (alertType === "success") {
      dispatch({ type: "CLEAN_PUBLISHISSUE" });
      dispatch(getLatestIssue());
      dispatch(getAcceptedPaper({ page: page }));
      navigate("/manager/publish");
    }
  }, [dispatch, alertType]);

  const handleSelect = (paper) => {
    var checkbox = document.getElementById(`paper-${paper.paperId}`);
    let newPublishes = publishes;
    if (checkbox.checked) {
      newPublishes.push({ paper, accessLevel: "OPEN" });
    } else {
      newPublishes = newPublishes.filter(
        (tmpPaper) => tmpPaper.paper.paperId !== paper.paperId
      );
    }

    dispatch(
      handleChange({
        name: "publishes",
        value: newPublishes,
        type: "manager_publishissue",
      })
    );
  };

  const handleDateChange = (e) => {
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "manager_publishissue",
      })
    );
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(publishes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(
      handleChange({
        name: "publishes",
        value: items,
        type: "manager_publishissue",
      })
    );
  };

  const handleButtonChange = (e) => {
    e.preventDefault();

    if (!confirm) {
      let startDateMoment = moment(startDate);
      let endDateMoment = moment(endDate);
      let currentMoment = moment();
      let latestIssueEndDate = moment(latestIssue.endDate);

      let checkErrors = {};
      if (!startDateMoment.isValid()) {
        checkErrors.startDate = "Please select start date";
      } else if (startDateMoment.isBefore(latestIssueEndDate)) {
        checkErrors.startDate = "Next issue must be later than last issue";
      } else if (startDateMoment.year() !== currentMoment.year()) {
        checkErrors.startDate = "Issue must be in year " + currentMoment.year();
      }

      if (!endDateMoment.isValid()) {
        checkErrors.endDate = "Please select end date";
      } else if (startDateMoment.isAfter(endDateMoment)) {
        checkErrors.endDate = "End date must be later than start date";
      } else if (endDateMoment.year() !== currentMoment.year()) {
        checkErrors.endDate("Issue must be in year " + currentMoment.year());
      }

      setErrors(checkErrors);
      if (Object.getOwnPropertyNames(checkErrors).length !== 0) {
        return;
      }
    }

    dispatch(
      handleChange({
        name: "confirm",
        value: !confirm,
        type: "manager_publishissue",
      })
    );
  };

  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "manager_publishissue" })
    );
  };

  const checkObject = (paperId) => {
    for (let i = 0; i < publishes.length; i++) {
      if (publishes[i].paper.paperId === paperId) {
        return true;
      }
    }
    return false;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(createIssue({ startDate, endDate, publishes }));
  };

  let nextIssue = 1;
  let nextVolume = 1;
  if (latestIssue != null) {
    const currentYear = new Date().getFullYear();
    if (latestIssue.year !== currentYear) {
      nextVolume = latestIssue.volume + 1;
    } else {
      nextIssue = latestIssue.issue + 1;
      nextVolume = latestIssue.volume;
    }
  }

  if (paperDetailId != null) {
    if (Object.keys(paperDetail).length !== 0) {
      return (
        <>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setPaperDetailId();
            }}
          >
            Back
          </button>
          <ContainerWrapper>
            <div className="container">
              <h3>Paper</h3>
              <Paper type="full" paper={paperDetail.paper} />
            </div>
          </ContainerWrapper>
          <PageButtonWrapper>
            <h3>Select round</h3>
            <div className="btn-container">
              {(() => {
                let buttons = [];
                for (var i = 0; i < paperDetail.paper.round; i++) {
                  const index = i;
                  buttons.push(
                    <button
                      key={index}
                      type="button"
                      className={
                        currentRound === index + 1
                          ? "pageBtn active"
                          : "pageBtn"
                      }
                      onClick={() => {
                        setCurrentRound(index + 1);
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return buttons;
              })()}
            </div>
          </PageButtonWrapper>
          <ContainerWrapper>
            <div className="container">
              <h3>Reviews for round: {currentRound}</h3>
              {paperDetail.reviews.length === 0 && <p>No review found</p>}
              {paperDetail.reviews.map((review, index) => {
                if (review.round === currentRound) {
                  return <ReviewReport key={index} review={review} />;
                }
              })}
            </div>
          </ContainerWrapper>
        </>
      );
    }
    return <Loading />;
  }

  if (confirm) {
    const handleAccessLevelChange = (paperId, value) => {
      let newPublishes = publishes;

      for (let i = 0; i < newPublishes.length; i++) {
        if (newPublishes[i].paper.paperId === paperId) {
          newPublishes[i].accessLevel = value;
        }
      }

      dispatch(
        handleChange({
          name: "publishes",
          value: newPublishes,
          type: "manager_publishissue",
        })
      );
    };

    return (
      <>
        <button
          className="btn"
          disabled={isLoading}
          onClick={handleButtonChange}
        >
          Back
        </button>

        <ItemWrapper>
          <header>
            <div className="info">
              <h5>
                Publish for next issue: Volume {nextVolume} Issue {nextIssue}
              </h5>
              <p>
                End date of current issue:{" "}
                {moment(latestIssue.endDate).format("DD/MM/YYYY")}
              </p>
            </div>
          </header>
        </ItemWrapper>

        <ContainerWrapper>
          <h3>Selected papers (drag to reorder)</h3>
          <div className="container">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="issue">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {publishes.map((tmpPub, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided) => {
                            return (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ItemWrapper key={index}>
                                  <header>
                                    <div className="info">
                                      <h5>
                                        {index + 1}. {tmpPub.paper.title}
                                      </h5>
                                    </div>
                                    <FormRowSelect
                                      labelText="Access level"
                                      name="accessLevel"
                                      value={tmpPub.accessLevel}
                                      handleChange={(e) =>
                                        handleAccessLevelChange(
                                          tmpPub.paper.paperId,
                                          e.target.value
                                        )
                                      }
                                      list={["OPEN", "PRIVATE"]}
                                    />
                                  </header>
                                </ItemWrapper>
                              </li>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </ContainerWrapper>
        <button className="btn" disabled={isLoading} onClick={handleConfirm}>
          Confirm Publish
        </button>
      </>
    );
  }

  return (
    <>
      {showAlert && <Alert />}
      <ItemWrapper>
        <header>
          <div className="info">
            <h5>
              Publish for next issue: Volume {nextVolume} Issue {nextIssue}
            </h5>
            <p>
              End date of current issue:{" "}
              {moment(latestIssue.endDate).format("DD/MM/YYYY")}
            </p>
          </div>
        </header>
      </ItemWrapper>

      <SearchWrapper>
        <form className="form">
          <div className="form-center">
            <div>
              <FormRow
                labelText="Start date"
                type="date"
                name="startDate"
                value={startDate}
                handleChange={handleDateChange}
              />

              {errors.startDate && <p>{errors.startDate}</p>}
            </div>

            <div>
              <FormRow
                labelText="End date"
                type="date"
                name="endDate"
                value={endDate}
                handleChange={handleDateChange}
              />

              {errors.endDate && <p>{errors.endDate}</p>}
            </div>
            <button
              className={
                isLoading || publishes.length === 0 ? "btn disabled" : "btn"
              }
              disabled={isLoading || publishes.length === 0}
              onClick={handleButtonChange}
            >
              Next
            </button>
          </div>
        </form>
      </SearchWrapper>

      {papers.length > 0 && (
        <PageBtnContainer
          page={page}
          numOfPage={numOfPage}
          changePage={handlePageChange}
        />
      )}

      <h3>Accepted Paper - {publishes.length} papers selected</h3>
      {isLoading ? (
        <Loading center />
      ) : papers.length > 0 ? (
        <>
          <ContainerWrapper>
            <div className="container">
              {papers.map((paper, index) => {
                return (
                  <ItemWrapper
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      var checkbox = document.getElementById(
                        `paper-${paper.paperId}`
                      );
                      checkbox.click();
                    }}
                  >
                    <header>
                      <div className="info">
                        <h5>
                          <input
                            type="checkbox"
                            id={`paper-${paper.paperId}`}
                            value={paper.paperId}
                            checked={checkObject(paper.paperId)}
                            onChange={(e) => {
                              e.preventDefault();
                              handleSelect(paper);
                            }}
                          />
                          <label htmlFor={`paper-${paper.paperId}`}>
                            {paper.title}
                          </label>
                        </h5>

                        <p>Author: {paper.authors.fullName}</p>
                        <p>
                          {paper.numberOfPage}{" "}
                          {paper.numberOfPage > 1 ? "pages" : "page"}
                        </p>
                        <p>
                          Fields:{" "}
                          {paper.fields.map((field, index) => (
                            <span key={index}>
                              {field.fieldName}
                              {index !== paper.fields.length - 1 && ","}{" "}
                            </span>
                          ))}
                        </p>
                      </div>
                    </header>
                    <div className="content">
                      <footer>
                        <div className="actions">
                          <button
                            className="btn edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPaperDetailId(paper.paperId);
                            }}
                          >
                            View detail
                          </button>
                        </div>
                      </footer>
                    </div>
                  </ItemWrapper>
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
        <p>No accepted paper yet</p>
      )}
    </>
  );
};

export default ManagerPublishIssue;
