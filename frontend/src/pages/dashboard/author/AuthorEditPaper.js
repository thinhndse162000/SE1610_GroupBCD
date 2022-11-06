import {
  FormRow,
  FormTextArea,
  FormDropdown,
  Alert,
  Journal,
  Loading,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import { useEffect, useState } from "react";
import { editPaper, getEditPaper } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
import { useNavigate, useParams } from "react-router-dom";
import validateSubmitPaper from "../../../context/validator/validateSubmitPaper";
import FormRowFile from "../../../components/form/FormRowFile";
import validateEditPaper from "../../../context/validator/validateEditPaper";

const AuthorEditPaper = () => {
  const { paperId } = useParams();
  const { base, author } = useSelector((state) => state);
  const {
    editPaper: {
      title: paperTitle,
      summary: paperSummary,
      paperPdfFile,
      journal: paperJournal,
      fields: paperFields,
    },
  } = author;

  const { isLoading, showAlert, fields, alertType } = base;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ notEmpty: true });
  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  useEffect(() => {
    dispatch(getEditPaper(paperId));
  }, [dispatch, paperId]);

  const handleEdit = (e) => {
    e.preventDefault();
    const paper = {
      paperId,
      paperTitle,
      paperSummary,
      paperPdfFile,
    };

    let checkErrors = validateEditPaper(paper);
    setErrors(checkErrors);

    if (Object.getOwnPropertyNames(checkErrors).length === 0) {
      dispatch(editPaper(paper));
    }
  };

  useEffect(() => {
    if (alertType === "success") {
      navigate("/author");
    }
  }, [navigate, alertType]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "author_edit" }));
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const fileName = e.target.files[0].name;
    const file = e.target.files[0];
    dispatch(
      handleChange({
        name,
        value: { fileName: fileName, file },
        type: "author_edit",
      })
    );
  };

  if (paperTitle == null || isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <h3>Submitted to Journal</h3>
      <Journal journal={paperJournal} />
      <h3>Paper</h3>
      <Wrapper>
        {showAlert && <Alert />}
        <div>
          <FormRow
            type="text"
            name="title"
            value={paperTitle}
            labelText="title"
            handleChange={handleInput}
          />
          {errors.paperTitle && <p>{errors.paperTitle}</p>}
        </div>

        <div>
          <FormTextArea
            type="text"
            name="summary"
            value={paperSummary}
            labelText="abstract"
            handleChange={handleInput}
          />
          {errors.paperSummary && <p>{errors.paperSummary}</p>}
        </div>

        <FormDropdown
          labelText="Field"
          isDisabled={true}
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
                name: "fields",
                value: tmp,
                type: "author_edit",
              })
            );
          }}
          type="select"
        />
        {errors.paperFields && <p>{errors.paperFields}</p>}

        <div>
          <FormRowFile
            labelText="PDF file"
            value={paperPdfFile.fileName}
            name="paperPdfFile"
            handleChange={handleFileInput}
          />
          {errors.paperPdfFile && <p>{errors.paperPdfFile}</p>}
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleEdit}
            disabled={isLoading}
          >
            Edit
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default AuthorEditPaper;
