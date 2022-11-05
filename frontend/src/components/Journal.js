import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";

const Journal = ({ journal, link, type = "compact", action = [] }) => {
  const {
    name,
    introduction,
    organization,
    issn,
    slug,
    numberOfRound,
    numberOfReviewer,
  } = journal;

  let date = "";
  try {
    date = moment(journal.journalSubscribe.endDate).format("DD/MM/YYYY");
  } catch {
    date = "";
  }

  return (
    <Wrapper>
      <header>
        <div className="info">
          {link != null ? (
            <Link to={link}>
              <h3>{name}</h3>
            </Link>
          ) : (
            <h3>{name}</h3>
          )}
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
        </div>
      </header>
      <div className="content">
        {type === "full" && (
          <div className="content-center">
            <h5>Introduction</h5>
            <p>{introduction}</p>
          </div>
        )}
        <footer>
          <div className="actions">
            {action.map((act, index) => {
              return act.type === "link" ? (
                <Link
                  key={index}
                  to={act.to}
                  className={act.className}
                  onClick={act.onClick}
                >
                  {act.label}
                </Link>
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

export default Journal;
