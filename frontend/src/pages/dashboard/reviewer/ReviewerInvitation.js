import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, InvitationContainer } from "../../../components";
import { getInvitation } from "../../../context/service/invitationService";

const ReviewerInvitation = () => {
  const {
    base: { isLoading },
    reviewer: { invitations },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitation());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return <>
  {invitations.length > 0 ? <InvitationContainer /> : <p>No invitation found</p> }
  </>;
};

export default ReviewerInvitation;
