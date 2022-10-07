import { useDispatch, useSelector } from "react-redux";
import { updateInvitationStatus } from "../../context/service/invitationService";
import Wrapper from "../../assets/wrappers/Container";
import Invitation from "../Invitation";
import { downloadFile } from "../../context/service/paperService";

const InvitationContainer = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state) => state.reviewer.invitations);
  return (
    <Wrapper>
      <div className="container">
        {invitations.map((invitation, index) => {
          const action = [];
          if (invitation.status === "PENDING") {
            action.push({
              type: "button",
              className: "btn accept-btn",
              label: "Accept",
              onClick: () => dispatch(updateInvitationStatus(invitation.invitationId, "ACCEPTED")),
            });
            action.push({
              type: "button",
              className: "btn reject-btn",
              label: "Reject",
              onClick: () => dispatch(updateInvitationStatus(invitation.invitationId, "REJECTED")),
            });
          }
          action.push({
            type: "button",
            className: "btn edit-btn",
            label: "Download PDF",
            onClick: () => dispatch(downloadFile(invitation.paper.paperId)),
          });
          return (
            <Invitation key={index} invitation={invitation} action={action} />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default InvitationContainer;
