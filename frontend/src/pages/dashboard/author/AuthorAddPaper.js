import {
  FormRow,
  FormTextArea,
  FormDropdown,
  Alert,
  Loading,
  PageBtnContainer,
  Journal,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { createPaper } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
import { useNavigate } from "react-router-dom";
import validateSubmitPaper from "../../../context/validator/validateSubmitPaper";
import FormRowFile from "../../../components/form/FormRowFile";
import { searchJournal } from "../../../context/service/journalService";

const AuthorAddPaper = () => {
  const { base, author } = useSelector((state) => state);
  const {
    editPaperId,
    newPaper: {
      paperTitle,
      paperSummary,
      paperPdfFile,
      paperJournal,
      paperFields,
    },
    searchJournal: { keyword, fields: journalFields, result, page, numOfPage },
  } = author;

  const { isLoading, showAlert, fields, alertType } = base;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ notEmpty: true });
  const [step, setStep] = useState(0);

  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  const handleNextState = (e) => {
    e.preventDefault();
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const paper = {
        paperTitle,
        paperSummary,
        paperPdfFile,
        paperFields,
      };
      let checkErrors = validateSubmitPaper(paper);
      setErrors(checkErrors);

      if (Object.getOwnPropertyNames(checkErrors).length === 0) {
        setStep(2);
        dispatch(searchJournal({ keyword, fields: paperFields, page }));
      }
    }
  };

  const handlePrevState = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(0);
    } else if (step === 2) {
      setStep(0);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const paper = {
      paperTitle,
      paperSummary,
      paperFields,
      paperPdfFile,
      paperJournal,
    };
    dispatch(createPaper(paper));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (page === 1) {
      dispatch(searchJournal({ keyword, fields: journalFields, page }));
    } else {
      handlePageChange(1);
    }
  };

  const handleSelect = (e, journal) => {
    e.preventDefault();
    dispatch(
      handleChange({ name: "paperJournal", value: journal, type: "author" })
    );
    handleNextState(e);
  };

  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "author_journal" })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const paper = {
      paperTitle,
      paperSummary,
      paperJournal,
      paperPdfFile,
      paperFields,
    };
    let checkErrors = validateSubmitPaper(paper);
    setErrors(checkErrors);

    if (Object.getOwnPropertyNames(checkErrors).length === 0) {
      dispatch(createPaper(paper));
    }
  };

  useEffect(() => {
      dispatch(searchJournal({ keyword, fields: journalFields, page }));
  }, [dispatch, page])

  useEffect(() => {
    if (alertType === "success") {
      navigate("/author");
    }
  }, [navigate, alertType]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "author" }));
  };

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "author_journal",
      })
    );
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const file = e.target.files[0];
    dispatch(
      handleChange({
        name,
        value: { fileName: fileName, file },
        type: "author",
      })
    );
  };

  if (step === 1) {
    const selectPaperFieldOptions = paperJournal.fields.map((field) => ({
      label: field.fieldName,
      value: field.fieldId,
    }));
    return (
      <>
        <button className="btn edit-btn" onClick={handlePrevState}>
          Back
        </button>
      <h3>Submit paper</h3>
        <Wrapper>
          <form className="form">
            <h3>{editPaperId ? "edit paper" : "add paper"}</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              <div>
                {/* Paper Title */}
                <FormRow
                  type="text"
                  name="paperTitle"
                  value={paperTitle}
                  labelText="title"
                  handleChange={handleInput}
                />
                {errors.paperTitle && <p>{errors.paperTitle}</p>}
                {/* Paper Summary */}
              </div>
              <div>
                <FormTextArea
                  type="text"
                  name="paperSummary"
                  value={paperSummary}
                  labelText="abstract"
                  handleChange={handleInput}
                />
                {errors.paperSummary && <p>{errors.paperSummary}</p>}
              </div>
              <FormDropdown
                labelText="Field"
                isDisabled={editPaperId}
                value={paperFields.map((field) => ({
                  label: field.fieldName,
                  value: field.fieldId,
                }))}
                isMulti={true}
                options={selectPaperFieldOptions}
                handleChange={(e) => {
                  const tmp = e.map((x) => ({
                    fieldId: x.value,
                    fieldName: x.label,
                  }));

                  dispatch(
                    handleChange({
                      name: "paperFields",
                      value: tmp,
                      type: "author",
                    })
                  );
                }}
                type="select"
              />
              {errors.paperFields && <p>{errors.paperFields}</p>}
              <div className="btn-container">
                {/*Pdf file*/}
                <div>
                  <FormRowFile
                    labelText="PDF file"
                    value={paperPdfFile.fileName}
                    name="paperPdfFile"
                    handleChange={handleFileInput}
                  />
                  {errors.paperPdfFile && <p>{errors.paperPdfFile}</p>}
                </div>
              </div>
              {/* btn container */}
              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  onClick={handleNextState}
                  disabled={isLoading}
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </Wrapper>
      </>
    );
  } else if (step === 0) {
    return (
      <>
        <div>
          <h3>Submit paper</h3>
          <SearchWrapper>
            <form className="form">
            <h5>Select journal</h5>
              <div className="journal-form">
                <FormRow
                  labelText="Keyword"
                  type="text"
                  name="keyword"
                  value={keyword}
                  handleChange={handleInputChange}
                />

                <FormDropdown
                  labelText="Field"
                  value={journalFields.map((field) => ({
                    label: field.fieldName,
                    value: field.fieldId,
                  }))}
                  isMulti={true}
                  options={selectFieldOptions}
                  handleChange={(e) => {
                    const tmp = e.map((x) => ({
                      fieldId: x.value,
                      fieldName: x.label,
                    }));
                    dispatch(
                      handleChange({
                        name: "fields",
                        value: tmp,
                        type: "author_journal",
                      })
                    );
                  }}
                  type="select"
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

          {result.length > 0 && (
            <PageBtnContainer
              page={page}
              numOfPage={numOfPage}
              changePage={handlePageChange}
            />
          )}
          {isLoading ? (
            <Loading center />
          ) : result.length > 0 ? (
            <>
              <ContainerWrapper>
                <div className="container">
                  {result.map((journal, index) => {
                    let action = [];
                    action.push({
                      type: "button",
                      label: "Select",
                      className: "btn edit-btn",
                      onClick: (e) => handleSelect(e, journal),
                    });
                    return (
                      <Journal key={index} journal={journal} action={action} />
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
            <p>No result found</p>
          )}
        </div>
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <button className="btn edit-btn" onClick={handlePrevState}>
          Back
        </button>
        <h3>Confirm</h3>
        <Journal journal={paperJournal} />
        <h3>Paper</h3>
        <ItemWrapper>
          <header>
            <div className="info">
              <h5>{paperTitle}</h5>
            </div>

            <p>
              Fields:{" "}
              {paperFields.map((field, index) => (
                <span key={index}>
                  {field.fieldName}
                  {index !== paperFields.length - 1 && ","}{" "}
                </span>
              ))}
            </p>
          </header>

          <div className="content">
            <div className="content-center">
              <h5>Abstract</h5>
              <p>{paperSummary}</p>
              <h5>PDF</h5>
              <p>{paperPdfFile.fileName}</p>
            </div>
          </div>
        </ItemWrapper>
        <button type="button" className="btn edit-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </>
    );
  }
  return <></>;
};

export default AuthorAddPaper;
