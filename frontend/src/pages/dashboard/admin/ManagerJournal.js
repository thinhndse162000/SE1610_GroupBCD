import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, FormDropdown, FormRow } from "../../../components";
import {
  createJournal,
  editJournal,
} from "../../../context/service/adminService";
import { clearAlert, handleChange } from "../../../context/service/utilService";
import validateCreateJournal from "../../../context/validator/validateCreateJournal";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const ManagerJournal = () => {
  const { base, admin } = useSelector((state) => state);
  const navigate = useNavigate();
  const { isLoading, alertType, showAlert, fields } = base;

  const {
    editJournalID,
    newJournal: {
      name,
      introduction,
      managerEmail,
      organization,
      issn,
      journalFields,
      numberOfRound,
      numberOfReviewer,
    },
  } = admin;

  const [errors, setErrors] = useState({ noError: true });
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "admin" }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const journal = {
      name,
      introduction,
      organization,
      issn,
      managerEmail,
      journalFields,
      numberOfRound,
      numberOfReviewer,
    };
    setErrors(validateCreateJournal(journal));
  };

  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  useEffect(() => {
    const journal = {
      name,
      introduction,
      organization,
      issn,
      managerEmail,
      fieldId: journalFields.map((f) => f.fieldId),
      numberOfRound,
      numberOfReviewer,
    };

    if (Object.getOwnPropertyNames(errors).length === 0) {
      if (editJournalID) {
        const journal = {
          editJournalID,
          name,
          introduction,
          organization,
          issn,
          managerEmail,
          fieldId: journalFields.map((f) => f.fieldId),
          numberOfRound,
          numberOfReviewer,
        };
        dispatch(editJournal({ journal }));
      } else dispatch(createJournal({ journal }));
    }
  }, [dispatch, errors]);

  useEffect(() => {
    if (alertType === "success") {
      navigate("/admin")
    }
  }, [navigate, alertType])

  return (
    <Wrapper>
      <form className="form">
        <h3>{editJournalID ? "edit journal" : "Create Journal"}</h3>
        {showAlert && <Alert />}
        <div className="form">
          <FormRow
            type="text"
            labelText="Name"
            name="name"
            value={name}
            handleChange={handleInput}
          />
          {errors.name && <p>{errors.name}</p>}
          <FormRow
            type="text"
            labelText="Introduction"
            name="introduction"
            value={introduction}
            handleChange={handleInput}
          />
          {errors.introduction && <p>{errors.introduction}</p>}

          <FormRow
            type="text"
            labelText="Manager email"
            name="managerEmail"
            value={managerEmail}
            handleChange={handleInput}
          />
          {errors.managerEmail && <p>{errors.managerEmail}</p>}

          <FormRow
            type="text"
            labelText="Organization"
            name="organization"
            value={organization}
            handleChange={handleInput}
          />
          {errors.organization && <p>{errors.organization}</p>}
          <FormRow
            type="text"
            labelText="ISSN"
            name="issn"
            value={issn}
            handleChange={handleInput}
          />
          {errors.issn && <p>{errors.issn}</p>}
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
                  name: "journalFields",
                  value: tmp,
                  type: "admin",
                })
              );
            }}
            type="select"
          />
          {errors.journalFields && <p>{errors.journalFields}</p>}
          <FormRow
            type="number"
            labelText="Number of round"
            name="numberOfRound"
            value={numberOfRound}
            handleChange={handleInput}
          />
          {errors.numberOfRound && <p>{errors.numberOfRound}</p>}

          <FormRow
            type="number"
            labelText="Number of reviewer"
            name="numberOfReviewer"
            value={numberOfReviewer}
            handleChange={handleInput}
          />
          {errors.numberOfReviewer && <p>{errors.numberOfReviewer}</p>}

          <button
            className="btn btn-block"
            type="submit"
            onClick={onSubmit}
            // disabled={isLoading}
          >
            {editJournalID ? "edit" : "submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ManagerJournal;
