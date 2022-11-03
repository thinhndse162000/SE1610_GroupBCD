import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/Profile";
import { Alert, FormRow } from "../../../components";
import {
  getAccountProfile,
  updateProfile,
} from "../../../context/service/accountService";
import { handleChange } from "../../../context/service/utilService";
import validateProfile from "../../../context/validator/validateProfile";

const ViewProfle = () => {
  const {
    member: { profile },
    base: { isLoading, showAlert }
  } = useSelector((state) => state);

  const [errors, setErrors] = useState({ notEmpty: true });

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getAccountProfile());
  }, [dispatch, slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkProfile = {
      phone: profile.phone,
      organization: profile.organization,
    };
    setErrors(validateProfile(checkProfile));
  };

  const handleInput = (e) => {
    e.preventDefault();
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "member_profile",
      })
    );
  };

  useEffect(() => {
    const checkProfile = {
      phone: profile.phone,
      organization: profile.organization,
    };

    if (Object.getOwnPropertyNames(errors).length === 0) {
      dispatch(updateProfile(checkProfile));
    }
  }, [dispatch, errors]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-profile">
          <FormRow
            type="text"
            name="email"
            value={profile.email}
            disabled={true}
            handleChange={handleInput}
          />

          <FormRow
            type="date"
            labelText="Date of birth"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            disabled={true}
            handleChange={handleInput}
          />

          <FormRow
            type="text"
            labelText="First name"
            name="firstName"
            value={profile.firstName}
            disabled={true}
            handleChange={handleInput}
          />

          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={profile.lastName}
            disabled={true}
            handleChange={handleInput}
          />

          <div>
            <FormRow
              type="text"
              labelText="Phone number"
              name="phone"
              value={profile.phone}
              handleChange={handleInput}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <div>
            <FormRow
              type="text"
              name="organization"
              value={profile.organization}
              handleChange={handleInput}
            />
            {errors.organization && <p>{errors.organization}</p>}
          </div>

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
