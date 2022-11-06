import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  FormDropdown,
  FormRow,
  FormRowSelect,
  Journal,
  Loading,
  PageBtnContainer,
} from "../../../components";
import {
  archiveJournal,
  openJournal,
  search,
  setEditJournal,
} from "../../../context/service/adminService";
import { handleChange } from "../../../context/service/utilService";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";

const ViewJournalList = () => {
  const {
    base: { fields: fieldOptions, isLoading, showAlert },
    admin: {
      search: { keyword, result, fields, page, numOfPage },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const selectFieldOptions = fieldOptions.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "admin_search",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (page === 1) {
      dispatch(search({ keyword, fields, page }));
    } else {
      handlePageChange(1);
    }
  };

  useEffect(() => {
    dispatch(search({ keyword, fields, page }));
    // eslint-disable-next-line
  }, [dispatch, page, ]);

  const handleClick = (journalId) => {
    dispatch(setEditJournal(journalId));
  };

  const handlePageChange = (page) => {
    dispatch(handleChange({ name: "page", value: page, type: "admin_search" }));
  };
  return (
    <div>
      <SearchWrapper>
        <form className="form">
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
              value={fields.map((field) => ({
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
                    type: "admin_search",
                  })
                );
              }}
              type="select"
            />
            <button className="btn" disabled={isLoading} onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
      </SearchWrapper>

      {result.length > 0 && (
        page.length > 1 && (<PageBtnContainer
          page={page}
          numOfPage={numOfPage}
          changePage={handlePageChange}
        />)
      )}
      {showAlert && <Alert />}
      {isLoading ? (
        <Loading center />
      ) : result.length > 0 ? (
        <>
          <ContainerWrapper>
            <div className="container">
              {result.map((journal, index) => {
                let action = [];
                action.push({
                  type: "link",
                  className: "btn edit-btn",
                  to: "/admin/create-journal",
                  label: "edit",
                  onClick: () => dispatch(setEditJournal(journal.journalId)),
                });

                return (

                  <Journal
              
                    key={index} journal={journal} action={action} />
                );
              })}
            </div>
          </ContainerWrapper>
          {page.length > 1 && (<PageBtnContainer
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />)}
        </>
      ) : (
        <p>No result found</p>
      )}
    </div>
  );
};

export default ViewJournalList;
