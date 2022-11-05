import {
  FormDropdown,
  FormRow,
  FormRowSelect,
  Loading,
  PaperContainer,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { search } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
import { Journal, PageBtnContainer } from "../../../components";
import { useEffect } from "react";

const MemberSearch = () => {
  const {
    isLoading,
    member: {
      search: { keyword, result, type, fields, options, page, numOfPage },
    },
    base: { fields: fieldOptions },
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
        type: "member_search",
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

  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "member_search" })
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
            <FormRowSelect
              labelText="Type"
              name="type"
              value={type}
              handleChange={handleInputChange}
              list={[...options]}
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
                  return (
                    <Journal
                      link={`/journal/${journal.slug}`}
                      key={index}
                      journal={journal}
                    />
                  );
                })}
              </div>
            </ContainerWrapper>
          ) : (
            <PaperContainer />
          )}
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
  );
};
export default MemberSearch;
