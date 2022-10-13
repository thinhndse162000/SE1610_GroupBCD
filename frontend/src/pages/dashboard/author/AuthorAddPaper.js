import {
  FormRow,
  FormTextArea,
  FormDropdown,
  Alert,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  createPaper,
  editPaper,
  clearPaperValues,
} from "../../../context/service/paperService";
import {
  displayAlert,
  handleChange,
} from "../../../context/service/utilService";
import { useNavigate } from "react-router-dom";
import authFetch from "../../../utils/authFetch";

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

  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  const [selectValue, setSelectValue] = useState({
    label: paperJournal.journalName,
    value: paperJournal.journalId,
  });

  useEffect(() => {
    paperJournal["journalName"] = "";
    paperJournal["journalId"] = "";
    setSelectValue("");
    // eslint-disable-next-line
  }, [paperFields]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(paperTitle, paperSummary, paperJournal, paperPdfFile);
    if (
      !paperTitle ||
      !paperSummary ||
      !paperJournal.journalId ||
      !paperPdfFile
    ) {
      dispatch(displayAlert());
      return;
    }
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
    dispatch(createPaper(paper));
    if (!paperTitle) {
      setSelectValue("");
      navigate("/author");
    }
  };

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
    const fileName = e.target.value;
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
    let requestResults = "";
    try {
      const { data } = await authFetch.post("/journal/search", {
        name: inputValue,
      });
      console.log(data);
      requestResults = data.map((journal) => ({
        label: journal.name,
        value: journal.journalId,
      }));
    } catch (error) {}
    callback(requestResults);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{editPaperId ? "edit paper" : "add paper"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* Paper Title */}
          <FormRow
            type="text"
            name="paperTitle"
            value={paperTitle}
            labelText="title"
            handleChange={handleInput}
          />
          {/* Paper Summary */}
          <FormTextArea
            type="text"
            name="paperSummary"
            value={paperSummary}
            labelText="abstract"
            handleChange={handleInput}
          />

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

          <div className="btn-container">
            {/* Paper Journal Name */}
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
            {/*Pdf file*/}
            <FormRow
              type="file"
              labelText="PDF file"
              name="paperPdfFile"
              handleChange={handleFileInput}
            />
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
