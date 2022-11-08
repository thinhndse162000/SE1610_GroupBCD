import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";

const Journal = ({
  index,
  journal,
  link,
  showPolicy = false,
  type = "compact",
  action = [],
}) => {
  const {
    name,
    introduction,
    organization,
    issn,
    slug,
    policy,
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
        {showPolicy && (
          <>
            <button
              type="button"
              className="collapsible"
              onClick={(e) => {
                var content = document.getElementById(
                  `policy-collapse-${index}`
                );
                if (content.style.display === "block") {
                  content.style.display = "none";
                } else {
                  content.style.display = "block";
                }
              }}
            >
              Policy
            </button>
            <div id={`policy-collapse-${index}`} className="collapse-content">
              <p>{journal.policy}</p>
              <p>{journal.reviewPolicy === "AUTOMATIC" && "Paper will be automatically evaluated after all reviewers have submitted their reviews. The paper will be accepted if more than half of the reviewers accept the paper"}</p>
              <p>{journal.reviewPolicy === "MANAGER_DECIDE" && "Paper will be evaluated by the manager after all reviewers have submitted their reviews. The manager will evaluate based on the note, grade and confidentiality of reviewers"}</p>
            </div>
          </>
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
