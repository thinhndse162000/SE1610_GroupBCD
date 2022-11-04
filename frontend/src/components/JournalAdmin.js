import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";

const JournalAdmin = ({ journal, type = "compact", action = [],index }) => {
  const {
    name,
    introduction,
    organization,
    issn,
    slug,
    numberOfRound,
    numberOfReviewer,
    status,
  } = journal;
  /*
        {
        "journalId": "2",
        "name": "Chemistry",
        "introduction": "this is the second chemistry",
        "organization": "HUS",
        "issn": "1234-124"
    */
  return (
    <Wrapper>

      <header>
    <p>index   {index}</p>
        <div className="info">
  
            <h3>{name}</h3>
        
          <p>
            <strong>ISSN</strong>: {issn} - <strong>Organization</strong>:{" "}
            {organization}
          </p>
          <p>
            {/* TODO: fix this upper case*/}
            Number of round: {numberOfRound} - Number of reviewer per round:{" "}
            {numberOfReviewer}
          </p>

          <p>
            Fields:{" "}
            {journal.fields.map((field, index) => (
              <span key={index}>
                {field.fieldName}
                {index !== journal.fields.length - 1 && ","}{" "}
              </span>
            ))}
          </p>
          <p>
            Status:   {status}
          </p>
        </div>
      </header>
      <div className="content">
        {type === "full" && (<>
          <div className="content-center">
            <h5>Introduction</h5>
            <p>{introduction}</p>
          </div>
       
          </>
        )}
        <footer>
          <div className="actions">
            {action.map((act, index) => {
              return act.type === "link" ? (
                <>
                <Link
                  key={index}
                  to={act.to}
                  className={act.className}
                  onClick={act.onClick}
                >
                  {act.label}
                
                </Link>
                       <button
                       key={index}
                       type="button"
                       className={act.className2}
                       onClick={act.onClick2}
                     >
                       {act.label2}
                     </button>
                     </>
              ) : (
                <button
                  key={index}
                  type="button"
                  className={act.className}
                  onClick={act.onClick}
                >
                  {act.label}
                </button>
              );
            })}
          </div>
        </footer>
      </div>
    </Wrapper>

  );
};

export default JournalAdmin;
