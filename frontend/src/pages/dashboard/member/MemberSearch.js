import {
  FormDropdown,
  FormRow,
  FormRowSelect,
  PaperContainer,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { search } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
import { Journal } from "../../../components";

const MemberSearch = () => {
  const {
    isLoading,
    member: {
      search: { keyword, result, type, fields, options },
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
    dispatch(search({ keyword, type, fields }));
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

      {/* TODO: refactor not to use container */}
      {type === "Journal" ? (
        <ContainerWrapper>
          <div className="container">
            {result.map((journal, index) => {
              return <Journal key={index} journal={journal} />;
            })}
          </div>
        </ContainerWrapper>
      ) : (
        <PaperContainer />
      )}
    </div>
  );
};
export default MemberSearch;
