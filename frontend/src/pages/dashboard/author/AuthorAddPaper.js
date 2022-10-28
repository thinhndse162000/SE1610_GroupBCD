import {
  FormRow,
  FormTextArea,
  FormDropdown,
  Alert,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
import {
  createPaper,
  editPaper,
  clearPaperValues,
} from "../../../context/service/paperService";
import {
  handleChange,
} from "../../../context/service/utilService";
import { useNavigate } from "react-router-dom";
import authFetch from "../../../utils/authFetch";
import validateSubmitPaper from "../../../context/validator/validateSubmitPaper";
import FormRowFile from "../../../components/form/FormRowFile";

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
  } = author;

  const { isLoading, showAlert, fields } = base;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ notEmpty: true });
  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  const [selectValue, setSelectValue] = useState({
    label: paperJournal.journalName,
    value: paperJournal.journalId,
  });

  useEffect(() => {
    if (editPaperId === "") {
      paperJournal["journalId"] = "";
      paperJournal["journalName"] = "";
      setSelectValue("");
    }
    // eslint-disable-next-line
  }, [paperFields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(paperTitle, paperSummary, paperJournal, paperPdfFile);
    // if (
    //   !paperTitle ||
    //   !paperSummary ||
    //   !paperJournal.journalId ||
    //   !paperPdfFile
    // ) {
    //   dispatch(displayAlert());
    //   return;
    // }
    if (editPaperId) {
      const paper = {
        editPaperId,
        paperTitle,
        paperSummary,
        paperPdfFile,
      };
      dispatch(editPaper(paper));
      if (!paperTitle) {
        setSelectValue("");
        navigate("/author");
      }
      return;
    }
    const paper = {
      paperTitle,
      paperSummary,
      paperJournal,
      paperPdfFile,
      paperFields,
    };
    setErrors(validateSubmitPaper(paper))
  };

  useEffect(() => {
    const paper = {
      paperTitle,
      paperSummary,
      paperJournal,
      paperPdfFile,
      paperFields,
    };
    if (Object.getOwnPropertyNames(errors).length === 0) {
      dispatch(createPaper(paper))
    }

    console.log(paperPdfFile)

    // if (!paperTitle) {
    //   setSelectValue("");
    //   navigate("/author");
    // }
    // eslint-disable-next-line
  }, [dispatch, errors])

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clearPaperValues());
    setSelectValue("");
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "author" }));
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
  const loadJournalOptions = async (inputValue, callback) => {
    // {label: journalName, value: journalId}
    // FIXME: search without paging 
    let requestResults = "";
    try {
      const { data } = await authFetch.post("/journal/search", {
        name: inputValue,
      });
      requestResults = data.result.map((journal) => ({
        label: `${journal.name} (${journal.numberOfRound} ${journal.numberOfRound === 1 ? "round" : "rounds"}, ${journal.numberOfReviewer} reviews per round)`,
        value: journal.journalId,
      }));
    } catch (error) { }
    callback(requestResults);
  };

  return (
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
          />{errors.paperTitle && <p>{errors.paperTitle}</p>}
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
            options={selectFieldOptions}
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
            {/* Paper Journal Name */}
            <div>
            <FormDropdown
              labelText={
                "Journal" +
                (paperFields.length === 0 ? " (select fields first)" : "")
              }
              isDisabled={editPaperId || paperFields.length === 0}
              value={selectValue}
              loadOptions={loadJournalOptions}
              handleChange={({ label, value }) => {
                paperJournal["journalName"] = label;
                paperJournal["journalId"] = value;
                setSelectValue({ label, value });
              }}
              type="async"
            />
            {errors.paperJournal && <p>{errors.paperJournal}</p>}
            </div>
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
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {editPaperId ? "edit" : "submit"}
            </button>
            <button className="btn btn-block clear-btn" onClick={handleClear}>
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AuthorAddPaper;
