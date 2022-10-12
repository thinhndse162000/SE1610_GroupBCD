import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import {
  FormRow,
  FormTextArea,
  FormRowSelect,
  Alert,
  Paper,
} from "../../../components";
import {
  handleChange,
  displayAlert,
} from "../../../context/service/utilService";
import { editReview } from "../../../context/service/reviewReportService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const navigate = useNavigate();
  const { base, reviewer } = useSelector((state) => state);
  const { isLoading, showAlert } = base;
  const {
    editReviewId,
    newReview: {
      reviewPaper,
      reviewNote,
      reviewGrade,
      reviewConfidentiality,
      reviewVerdict,
    },
  } = reviewer;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!editReviewId) {
      navigate("/reviewer");
    }
  }, [editReviewId, navigate]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "reviewer" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      editReviewId,
      reviewNote,
      reviewGrade,
      reviewConfidentiality,
      reviewVerdict,
    };
    console.log(review);
    if (
      !reviewNote ||
      !reviewGrade ||
      !reviewConfidentiality ||
      !reviewVerdict
    ) {
      dispatch(displayAlert());
      return;
    }

    // TODO: only edit
    dispatch(editReview(review));
    return;
  };

  // TODO: add Paper component
  if (editReviewId) {
    return (
      <>
        <Paper paper={reviewPaper} />
        <Wrapper>
          <form className="form">
            <h3>Submit Review</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              {/* Paper Summary */}
              <FormTextArea
                type="text"
                name="reviewNote"
                value={reviewNote}
                labelText="note"
                handleChange={handleInput}
              />
  
              <div className="container-3">
                <FormRow
                  type="number"
                  name="reviewGrade"
                  value={reviewGrade}
                  labelText="grade"
                  handleChange={handleInput}
                />{" "}
                <FormRow
                  type="number"
                  name="reviewConfidentiality"
                  value={reviewConfidentiality}
                  labelText="confidentiality"
                  handleChange={handleInput}
                />
                <FormRowSelect
                  name="reviewVerdict"
                  value={reviewVerdict}
                  labelText="verdict"
                  handleChange={handleInput}
                  list={["ACCEPTED", "REJECTED"]}
                />
              </div>
  
              {/* btn container */}
              <div>
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                </button>
                {/* <button className="btn btn-block clear-btn" onClick={handleClear}>
                clear
              </button> */}
              </div>
            </div>
          </form>
        </Wrapper>
      </>
    );
  } else {
    return (<></>)
  }
  
};

export default AddReview;
