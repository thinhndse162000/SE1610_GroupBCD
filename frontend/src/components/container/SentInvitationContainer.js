import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Container";
import Reviewer from "../Reviewer";
import { listInvitation } from "../../context/service/paperService";

const SentInvitationContainer = () => {
  const { paperId } = useParams()
  const dispatch = useDispatch()
  const { sentInvitations } = useSelector((state) => state.manager);
  useEffect(() => {
    dispatch(listInvitation(paperId));
  }, [dispatch, paperId])

  return (
    <Wrapper>
      <h4>Sent Invitations</h4>
      {sentInvitations.length > 0 ? (
        <div className="container">
          {sentInvitations.map((invitation, index) => {
            // TODO: change to Invitation with status
            return <Reviewer key={index} reviewer={invitation.reviewer} />;
          })}
        </div>
      ) : (
        <p>No invitation sent yet</p>
      )}
    </Wrapper>
  );
};

export default SentInvitationContainer;
