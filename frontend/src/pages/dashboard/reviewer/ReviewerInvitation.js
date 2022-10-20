import {
  FormDropdown,
  FormRow,
  FormRowSelect,
  PageBtnContainer,
} from "../../../components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { Loading, Invitation } from "../../../components";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import {
  getInvitation,
  updateInvitationStatus,
} from "../../../context/service/invitationService";
import { downloadFile } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";

const ReviewerInvitation = () => {
  const {
    base: { isLoading },
    reviewer: {
      searchInvitation: { title, status, page, numOfPage, result: invitations },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitation({ title, status, page }));
  }, [dispatch, page]);

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "reviewer_searchinvitation",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (page === 1) {
      dispatch(getInvitation({ title, status, page }));
    } else {
      handlePageChange(1);
    }
  };

  const handlePageChange = (page) => {
    dispatch(
      handleChange({
        name: "page",
        value: page,
        type: "reviewer_searchinvitation",
      })
    );
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <SearchWrapper>
        <form className="form">
          <div className="journal-form">
            <FormRow
              labelText="Keyword"
              type="text"
              name="title"
              value={title}
              handleChange={handleInputChange}
            />
            <FormRowSelect
              labelText="Status"
              name="status"
              value={status}
              handleChange={handleInputChange}
              list={["PENDING", "ACCEPTED", "REJECTED", "CANCEL", "ALL"]}
            />

            <button className="btn" disabled={isLoading} onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
      </SearchWrapper>

      {invitations.length > 0 && (
        <PageBtnContainer
          page={page}
          numOfPage={numOfPage}
          changePage={handlePageChange}
        />
      )}
      {invitations.length > 0 ? (
        <>
          <ContainerWrapper>
            <div className="container">
              {invitations.map((invitation, index) => {
                const action = [];
                if (invitation.status === "PENDING") {
                  action.push({
                    type: "button",
                    className: "btn accept-btn",
                    label: "Accept",
                    onClick: () =>
                      dispatch(
                        updateInvitationStatus(
                          invitation.invitationId,
                          "ACCEPTED"
                        )
                      ),
                  });
                  action.push({
                    type: "button",
                    className: "btn reject-btn",
                    label: "Reject",
                    onClick: () =>
                      dispatch(
                        updateInvitationStatus(
                          invitation.invitationId,
                          "REJECTED"
                        )
                      ),
                  });
                }
                action.push({
                  type: "button",
                  className: "btn edit-btn",
                  label: "Download PDF",
                  onClick: () =>
                    dispatch(downloadFile(invitation.paper.paperId)),
                });
                return (
                  <Invitation
                    key={index}
                    invitation={invitation}
                    action={action}
                    link={`/reviewer/invitation-detail/${invitation.invitationId}`}
                  />
                );
              })}
            </div>
          </ContainerWrapper>

          <PageBtnContainer
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />
        </>
      ) : (
        <p>No invitation found</p>
      )}
    </>
  );
};

export default ReviewerInvitation;
