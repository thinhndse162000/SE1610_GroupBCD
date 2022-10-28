import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/Profile";
import { FormRow } from "../../../components";
import { getAccountProfile } from "../../../context/service/accountService";

const ViewProfle = () => {
  const {
    member: { profile },
  } = useSelector((state) => state);
  const test = useSelector((state) => state);

  console.log("test", test)
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(getAccountProfile());
  }, [dispatch, slug]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={(e) => { e.preventDefault() }}>
        <h3>profile</h3>
        {/* {showAlert && <Alert />} */}
        <div className="form-profile">

          <FormRow
            type="text"
            name="email"
            value={profile.email}
            disabled="true"
          // handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type="text"
            labelText="First name"
            name="firstName"
            value={profile.firstName}
            disabled="true"
          // handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="text"
            labelText="Phone number"
            name="PhoneNumber"
            value={profile.phone}
            disabled="true"
          // handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="date"
            labelText="Date of birth"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            disabled="true"
          // handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={profile.lastName}
            disabled="true"
          // handleChange={(e) => setLastName(e.target.value)}
          />

          <FormRow
            type="text"
            name="Organization"
            value={profile.organization}
            disabled="true"
          // handleChange={(e) => setLastName(e.target.value)}
          />

          <button
            className="btn btn-block"
            type="submit"
          // disabled={isLoading}
          >
            {/* {isLoading ? 'Please Wait...' : 'save changes'} */}
            Save
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ViewProfle;
