import { FormRow, FormTextArea, FormDropdown, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import axios from 'axios';
import { useState } from 'react';

const AddPaper = () => {
  const {
    isLoading,
    isEditingPaper,
    showAlert,
    displayAlert,
    paperTitle,
    paperSummary,
    paperPdfFile,
    paperJournal,
    paperStatusOptions,
    fields,
    handleChange,
    clearPaperValues,
    createPaper,
    editPaper,
  } = useAppContext()

  const [selectValue, setSelectValue] = useState({
    label: paperJournal.journalName,
    value: paperJournal.journalId,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!paperTitle || !paperSummary || !paperJournal || !paperPdfFile) {
      console.log(paperTitle, paperSummary, paperJournal, paperPdfFile)
      displayAlert()
      return
    }
    if (isEditingPaper) {
      editPaper()
      setSelectValue('')
      return
    }
    createPaper()
    // buf if create paper fail
    setSelectValue('')
  }

  const handleClear = (e) => {
      e.preventDefault();
      clearPaperValues();
      setSelectValue('')
  }

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  const handleFileInput = (e) => {
    const name = e.target.name
    const fileName = e.target.value
    const file = e.target.files[0]
    handleChange({ name, value: { fileName: fileName, file }})
  }

  const loadJournalOptions = async (inputValue, callback) => {
    // {label: journalName, value: journalId}
    let requestResults = '';
    try {
      const { data } = await axios.get(`http://localhost:8080/journal/search?name=${inputValue}`)
      requestResults = data.map((journal) => ({ label: journal.name, value: journal.journalID }))
    } catch (error) {
    }
    callback(requestResults)
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditingPaper ? "edit paper" : "add paper"}</h3>
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
              isDisabled={isEditingPaper}
              value={selectValue}
              loadOptions={loadJournalOptions}
              handleChange={({ label, value }) => {
                paperJournal['journalName'] = label
                paperJournal['journalId'] = value
                setSelectValue({ label, value })
              }}
            />
            {/*Pdf file*/}
            <FormRow
              type="file"
              labelText="PDF file"
              name="paperPdfFile"
              value={paperPdfFile.fileName}
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
              {isEditingPaper ? "edit" : "submit"}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={handleClear}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddPaper
