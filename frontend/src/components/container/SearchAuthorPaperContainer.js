import { useDispatch, useSelector } from "react-redux";
import { FormDropdown, FormRow, FormRowSelect } from "..";
import { default as SearchWrapper } from "../../assets/wrappers/SearchContainer";
import { getAuthorPaper } from "../../context/service/paperService";
import { handleChange } from "../../context/service/utilService";

const SearchAuthorPaperContainer = () => {
  const {
    base: { isLoading, fields: fieldOptions },
    author: { paperStatusOptions, search: { keyword, startDate, endDate, status, fields } }
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
        type: "author_search",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAuthorPaper({ keyword, startDate, endDate, status, fields }));
  }

  return (
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
              labelText="Status"
              name="status"
              value={status}
              handleChange={handleInputChange}
              list={[...paperStatusOptions]}
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
                  type: "author_search",
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
  );
};

export default SearchAuthorPaperContainer;
