import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import {
  FormRow,
  FormTextArea,
  FormRowSelect,
  Paper,
  Alert,
} from "../../../components";
import {
  handleChange,
  displayAlert,
  displayAlertMessage,
} from "../../../context/service/utilService";
import { editReview } from "../../../context/service/reviewReportService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateSubmitReview from "../../../context/validator/validateSubmitReview";
const AddReview = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ notEmpty: true });
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
      setTimeout(() => {
        navigate("/reviewer");
      }, 1000);
    }
  }, [editReviewId, navigate]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "newreview" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   !reviewNote ||
    //   !reviewGrade ||
    //   !reviewConfidentiality ||
    //   !reviewVerdict
    // ) {
    //   dispatch(displayAlert());
    //   return;
    // }
    const review = {
      editReviewId,
      reviewNote,
      reviewGrade,
      reviewConfidentiality,
      reviewVerdict,
    };
    setErrors(validateSubmitReview(review))
    // dispatch(editReview(review));
    return;
  };

  if (editReviewId) {
    return (
      <>
        <Paper paper={reviewPaper} type="full" />
        <Wrapper>
          <form className="form">
            <h3>Submit Review</h3>
            <div className="form-center">
              <div>
                <FormTextArea
                  type="text"
                  name="reviewNote"
                  value={reviewNote}
                  labelText="note"
                  handleChange={handleInput}
                />
                {errors.reviewNote && <p>{errors.reviewNote}</p>}
              </div>
              <div className="container-3">
                <div>
                  <FormRow
                    type="number"
                    name="reviewGrade"
                    value={reviewGrade}
                    labelText="grade"
                    handleChange={handleInput}
                  />{" "}
                  {errors.reviewGrade && <p>{errors.reviewGrade}</p>}
                </div>
                <div>
                  <FormRow
                    type="number"
                    name="reviewConfidentiality"
                    value={reviewConfidentiality}
                    labelText="confidentiality"
                    handleChange={handleInput}
                  />
                  {errors.reviewConfidentiality && <p>{errors.reviewConfidentiality}</p>}
                </div>
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
              </div>
            </div>
          </form>
        </Wrapper>
      </>
    );
  } else {
    return (<>{showAlert && <Alert />}</>)
  }
};

export default AddReview;
