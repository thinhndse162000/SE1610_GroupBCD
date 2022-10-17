import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { Loading, Invitation } from "../../../components";
import {
  getInvitation,
  updateInvitationStatus,
} from "../../../context/service/invitationService";
import { downloadFile } from "../../../context/service/paperService";

const ReviewerInvitation = () => {
  const {
    base: { isLoading },
    reviewer: { invitations },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitation());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {invitations.length > 0 ? (
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
                onClick: () => dispatch(downloadFile(invitation.paper.paperId)),
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
      ) : (
        <p>No invitation found</p>
      )}
    </>
  );
};

export default ReviewerInvitation;
