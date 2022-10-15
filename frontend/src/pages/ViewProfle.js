import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Profile'
import { FormRow } from '../components'
import { getAccountProfile } from '../context/service/accountService';
import { member } from '../context/state';

const ViewProfle = () => {
  const {member:{profile}} 
  = useSelector(
    (state) => state
  );  
  console.log("profile",profile   )

  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => 
  {

    dispatch(getAccountProfile({ slug }));
  }, [dispatch, slug]);

 

  return (
    <Wrapper>
    <form className='form' onSubmit>
      <h3>profile</h3>
      {/* {showAlert && <Alert />} */}
      <div className='form-profile'>

        {/* 1 */}

        <FormRow
          type='text'
          name='email'
          value={profile.email}
        // handleChange={(e) => setName(e.target.value)}
        />

        {/* 2 */}

        <FormRow
          type='text'
          labelText='First name'
          name='firstName'
          value={profile.firstName}
        // handleChange={(e) => setLastName(e.target.value)}
        />

        {/* 3 */}

        <FormRow
          type='text'
          labelText='Phone number'
          name='PhoneNumber'
          value={profile.phone}
        // handleChange={(e) => setLastName(e.target.value)}
        />

        {/* 4 */}

        <FormRow
          type='text'
          labelText='Date of birth'
          name='dateOfBirth'
          value={profile.dateOfBirth}
        // handleChange={(e) => setLastName(e.target.value)}
        />
   
        {/* 5 */}

        <FormRow
          type='text'
          labelText='last name'
          name='lastName'
          value={profile.lastName}
        // handleChange={(e) => setLastName(e.target.value)}
        />
        {/* 6 */}

        <FormRow
          type='text'
          name='Organization'
          value={profile.organization}
        // handleChange={(e) => setLastName(e.target.value)}
        />

        <button className='btn btn-block' type='submit'
        // disabled={isLoading}
        >
          
          {/* {isLoading ? 'Please Wait...' : 'save changes'} */}
          Save
        </button>
      </div>
    </form>
    </Wrapper>
  )
}

export default ViewProfle
