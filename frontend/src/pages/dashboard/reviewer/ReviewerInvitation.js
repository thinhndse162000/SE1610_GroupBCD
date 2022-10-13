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
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return <>
    {/* TODO: refactor not to use container */}
  {invitations.length > 0 ? <InvitationContainer /> : <p>No invitation found</p> }
  </>;
};

export default ReviewerInvitation;
