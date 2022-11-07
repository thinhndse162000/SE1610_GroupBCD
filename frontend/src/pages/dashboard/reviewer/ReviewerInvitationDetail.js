import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Invitation, Loading } from "../../../components";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import {
  getInvitationDetail,
  updateInvitationStatus,
} from "../../../context/service/invitationService";
import { downloadFile } from "../../../context/service/paperService";
import { useEffect } from "react";

const ReviewerInvitationDetail = () => {
  const { invitationId } = useParams();
  const {
    base: { isLoading },
    reviewer: { invitationDetail: invitation },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitationDetail({ invitationId }));
  }, [dispatch, invitationId]);

  if (isLoading) {
    return <Loading center />;
  }

  const action = [];
  if (invitation.status === "PENDING") {
    action.push({
      type: "button",
      className: "btn accept-btn",
      label: "Accept",
      onClick: () =>
        dispatch(updateInvitationStatus(invitation.invitationId, "ACCEPTED")),
    });
    action.push({
      type: "button",
      className: "btn reject-btn",
      label: "Reject",
      onClick: () =>
        dispatch(updateInvitationStatus(invitation.invitationId, "REJECTED")),
    });
  }
  action.push({
    type: "button",
    className: "btn edit-btn",
    label: "Download PDF",
    onClick: () =>
      dispatch(
        downloadFile({
          paperId: invitation.paper.paperId,
          fileName: invitation.paper.linkPDF,
        })
      ),
  });

  if (Object.keys(invitation).length !== 0) {
    return (
      <>
        <ContainerWrapper>
          <div className="container">
            <h3>Invitation</h3>
            <Invitation type="full" invitation={invitation} action={action} />
          </div>
        </ContainerWrapper>
      </>
    );
  }
  return (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default ReviewerInvitationDetail;
