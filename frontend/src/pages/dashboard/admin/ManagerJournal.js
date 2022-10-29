import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, FormDropdown, FormRow } from '../../../components';
import { createJournal, editJournal } from '../../../context/service/adminService';
import { handleChange } from '../../../context/service/utilService';
import validateCreateJournal from '../../../context/validator/validateCreateJournal';
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
const ManagerJournal = () => {
  const { base, admin } = useSelector((state) => state);
  console.log("admin", admin)
  const { isLoading, showAlert, fields } = base;
  // Bin
  const initialState = {
    name: "",
    introduction: "",
    organization: "",
    issn: "",
    journalFields: [],
    numberOfRound: 0,
    numberOfReviewer: 0,
  };

  const {
    editJournalID,
    newJournal: {
      name,
      introduction,
      organization,
      issn,
      journalFields,
      numberOfRound,
      numberOfReviewer,
    },
  } = admin;

  const [errors, setErrors] = useState(initialState);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, type: "admin" }));
  };
  console.log("error", errors)
  const onSubmit = (e) => {
    e.preventDefault();
    const journal = {
      name,
      introduction,
      organization,
      issn,
      journalFields,
      numberOfRound,
      numberOfReviewer,
    }
    setErrors(validateCreateJournal(journal));
    dispatch(createJournal({ journal }));
  }

  const selectFieldOptions = fields.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));
  useEffect(() => {
    const journal =
    {
      name,
      introduction,
      organization,
      issn,
      journalFields,
      numberOfRound,
      numberOfReviewer,
    }

    if (Object.getOwnPropertyNames(errors).length === 0) {
      if (editJournalID) {
        const journal = {
          editJournalID,
          name,
          introduction,
          organization,
          issn,
          journalFields,
        }
        dispatch(editJournal({ journal }));
      } else
        dispatch(createJournal({ journal }));
    }
  }, [dispatch, errors])
  return (
    <Wrapper>
      < form className="form" >

        <h3>{editJournalID ? "edit journal" : "Create Journal"}</h3>
        {<Alert />}
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
              console.log("tmp".tmp)
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
          <FormRow
            type="number"
            labelText="Number of reviewer"
            name="numberOfReviewer"
            value={numberOfReviewer}
            handleChange={handleInput}
          />
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
  )
}

export default ManagerJournal