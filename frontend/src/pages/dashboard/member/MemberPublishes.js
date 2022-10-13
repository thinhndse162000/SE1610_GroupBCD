import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJournalPublishes } from "../../../context/service/journalService";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Publish } from "../../../components";

const MemberPublishes = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    member: { publishes },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: MEMBER_JOURNAL_ID, payload: { slug } });
    dispatch(getJournalPublishes({ slug }));
  }, [dispatch, slug]);

  if (publishes == null) {
    return <></>;
  }

  return (
    <ContainerWrapper>
      <div className="container">
        <h3>All Publications</h3>
        {publishes.length > 0 ? (
          publishes.map((publish, index) => {
            return (
              <Publish
                key={index}
                publish={publish}
                link={`/publish/${publish.publishId}`}
              />
            );
          })
        ) : (
          <p>This journal has no publish</p>
        )}
      </div>
    </ContainerWrapper>
  );
};

export default MemberPublishes;
