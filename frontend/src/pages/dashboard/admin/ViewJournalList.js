import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormDropdown, FormRow, FormRowSelect, Journal, Loading, PageBtnContainer } from '../../../components';
import { search, setEditJournal } from '../../../context/service/adminService';
import { handleChange } from '../../../context/service/utilService';
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { Link } from 'react-router-dom';

const ViewJournalList = () => {
  const {
    isLoading,
    base: { fields: fieldOptions },
    admin: {
      search: { keyword, result, type, fields, page, numOfPage },
    },
    admin
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  // console.log("Test1", admin)
  const selectFieldOptions = fieldOptions.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));
  // 1
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
      dispatch(search({ keyword, type, fields, page }));
    } else {
      handlePageChange(1);
    }
  };

  useEffect(() => {
    dispatch(search({ keyword, type, fields, page }));
    // eslint-disable-next-line
  }, [dispatch, page]);

  const handleClick = (journalId) => {
    dispatch(setEditJournal(journalId))
  };
  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "admin_search" })
    );
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
                    type: "member_search",
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
          {type === "Journal" ? (
            <ContainerWrapper>
              <div className="container">
                {result.map((journal, index) => {

                  return (<>
                    <Journal
                      key={index} journal={journal} />
                    <Link
                      to="/admin"
                      className="btn edit-btn"
                      onClick={() => dispatch(setEditJournal(journal.journalId))}
                    >
                      Edit
                    </Link>

                  </>
                  )
                })}
              </div>
            </ContainerWrapper>
          ) : (
            <p>No result found</p>
          )}.
          <PageBtnContainer
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />
        </>
      ) : (
        <p>No result found</p>
      )
      }
    </div >
  );
}

export default ViewJournalList