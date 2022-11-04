import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, Publish } from "../../../components";
import { getAuthorProfile } from "../../../context/service/reviewerService";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { Error } from "../../";
import { getAuthorPublish } from "../../../context/service/paperService";

const MemberAuthorProfile = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    member: { authorProfile, authorPublish },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAuthorProfile({ slug }));
    dispatch(getAuthorPublish({ slug }));
  }, [slug, dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (authorProfile == null) {
    return <Error />;
  }

  const { fullName, introduction, education, address } = authorProfile;
  return (
    <>
      <ItemWrapper>
        <header>
          <div className="info">
            <h3>{fullName}</h3>
            <p>Address: {address}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <h4>Introduction</h4>
            <p>{introduction}</p>
            <h4>Education</h4>
            <p>{education}</p>
          </div>
        </div>
      </ItemWrapper>
      {authorPublish.length > 0 && (
        <ContainerWrapper>
          <div className="container">
            {authorPublish.map((publish, index) => {
              return <Publish key={index} publish={publish} link={`/publish/${publish.publishId}`} download={false}/>;
            })}
          </div>
        </ContainerWrapper>
      )}
    </>
  );
};

export default MemberAuthorProfile;
