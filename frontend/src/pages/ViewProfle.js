import React from 'react'
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Profile'
import { FormRow } from '../components'

const ViewProfle = () => {
  //Check role

  // const { user, isLoading, role } = useSelector(
  //   (state) => state.base
  // );  
  const account= useSelector(
    (state) => state.base
  );  

  //Check role / Navigate
    
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     if (role === "MANAGER") navigate("/manager/profile");
  //     else navigate("/author/profile");
  //   }
  // }, [user, navigate, role]);


  //Handle submit
  const [values, setValues] = useState(initialState);

  const initialState = {
    email: "",
    password: "",
    firstName:"",
    lastName:"",
    phoneNumber:"",
    dateOFBirth:"",
  };

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };


  
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: MEMBER_JOURNAL_ID, payload: { slug } })
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
          value={account.email}
        // handleChange={(e) => setName(e.target.value)}
        />

        {/* 2 */}

        <FormRow
          type='text'
          labelText='First name'
          name='firstName'
          value={account.firstName}
        // handleChange={(e) => setLastName(e.target.value)}
        />

        {/* 3 */}

        <FormRow
          type='text'
          labelText='Phone number'
          name='PhoneNumber'
          value={account.PhoneNumber}
        // handleChange={(e) => setLastName(e.target.value)}
        />

        {/* 4 */}

        <FormRow
          type='text'
          labelText='Date of birth'
          name='dateOfBirth'
          value={account.dateOFBirth}
        // handleChange={(e) => setLastName(e.target.value)}
        />
   
        {/* 5 */}

        <FormRow
          type='text'
          labelText='last name'
          name='lastName'
          value={account.lastName}
        // handleChange={(e) => setLastName(e.target.value)}
        />
        {/* 6 */}

        <FormRow
          type='text'
          name='Organization'
          value={account.Organization}
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
