import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  organization: '',
  dateOfBirth: '',
  profileImage: '',
  email: '',
  password: '',
  retypePassword: '',
}

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, signup } =
    useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleFileInput = (e) => {
    setValues({ ...values, [e.target.name]: URL.createObjectURL(e.target.files[0]) })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, phone, organization, dateOfBirth, profileImage, email, password, retypePassword } = values
    if (!(email && password)) {
      displayAlert()
      return
    }
    const currentUser = { firstName, lastName, phone, organization, dateOfBirth, profileImage, email, password, retypePassword }

    signup({ currentUser })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Signup</h3>
        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* retype password input */}
        <FormRow
          type="password"
          name="retypePassword"
          labelText="Retype password"
          value={values.retypePassword}
          handleChange={handleChange}
        />

        {/* first name input */}
        <FormRow
          type="text"
          name="firstName"
          labelText="First name"
          value={values.firstName}
          handleChange={handleChange}
        />

        {/* last name input */}
        <FormRow
          type="text"
          name="lastName"
          labelText="Last name"
          value={values.lastName}
          handleChange={handleChange}
        />

        {/* date of birth input */}
        <FormRow
          type="date"
          name="dateOfBirth"
          labelText="Date of birth"
          value={values.dateOfBirth}
          handleChange={handleChange}
        />

          {/* organziation input */}
        <FormRow
          type="text"
          name="organization"
          value={values.organization}
          handleChange={handleChange}
        />

        {/* profile image input */}
        <FormRow
          type="file"
          name="profileImage"
          labelText="Profile image"
          accept="image/*"
          handleChange={handleFileInput}
          require="false"
        />
        {values.profileImage && <img width='100%' src={values.profileImage} alt="Profile" />}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Signup
        </button>
        <p>
          Already a member?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="member-btn"
          >
            Login
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Signup
