import {
  FormRow,
  FormTextArea,
  FormDropdown,
  Alert,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import axios from "axios";
import { useState } from "react";
import {
  createPaper,
  editPaper,
  clearPaperValues,
} from "../../../context/service/paperService";
import {
  displayAlert,
  handleChange,
} from "../../../context/service/utilService";

const AddPaper = () => {
  const { base, author } = useSelector((state) => state);
  const {
    editPaperId,
    newPaper: { paperTitle, paperSummary, paperPdfFile, paperJournal },
  } = author;
  const { isLoading, showAlert } = base;
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState({
    label: paperJournal.journalName,
    value: paperJournal.journalId,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
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
      }
      dispatch(editPaper(paper));
      setSelectValue("");
      return;
    }
    const paper = {
      paperTitle,
      paperSummary,
      paperJournal,
      paperPdfFile,
    }
    dispatch(createPaper(paper));
    // buf if create paper fail
    setSelectValue("");
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clearPaperValues());
    setSelectValue("");
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: 'author' }));
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const fileName = e.target.value;
    const file = e.target.files[0];
    dispatch(handleChange({ name, value: { fileName: fileName, file }, type: 'author' }));
  };

  const loadJournalOptions = async (inputValue, callback) => {
    // {label: journalName, value: journalId}
    let requestResults = "";
    try {
      const { data } = await axios.get(
        `http://localhost:8080/journal/search?name=${inputValue}`
      );
      requestResults = data.map((journal) => ({
        label: journal.name,
        value: journal.journalID,
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

          <div className="btn-container">
            {/* Paper Journal Name */}
            <FormDropdown
              labelText="Journal"
              isDisabled={editPaperId}
              value={selectValue}
              loadOptions={loadJournalOptions}
              handleChange={({ label, value }) => {
                paperJournal["journalName"] = label;
                paperJournal["journalId"] = value;
                setSelectValue({ label, value });
              }}
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

export default AddPaper;
