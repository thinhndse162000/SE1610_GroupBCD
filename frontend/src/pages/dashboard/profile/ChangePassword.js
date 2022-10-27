
import React, { useEffect, useState } from 'react'
import { useDispatch, } from 'react-redux';
import Wrapper from '../../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../../components'
import { chagePassword } from '../../../context/service/accountService';

import validateChangePass from '../../../context/validator/validateChangePass';

const ChangePassword = () => {
    const initialState = {
        oldPassword: "",
        newPassword: "",
        newPasswordRetype: "",
    };
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    };


    const onSubmit = (e) => {
        e.preventDefault();

        setErrors(validateChangePass(values));

    };
    useEffect(() => {
        const { oldPassword, newPassword, newPasswordRetype } = values;
        const currentPassword = { oldPassword, newPassword, newPasswordRetype };
        if (Object.getOwnPropertyNames(errors).length === 0) {
            dispatch(chagePassword({ currentPassword }));
        }
        // eslint-disable-next-line

    }, [dispatch, errors])
    return (
        <Wrapper>
            < form className="form" onSubmit={onSubmit}>
                <h3>Change password</h3>
                {<Alert />}
                <div className="form-changePassword">
                    <FormRow
                        type="password"
                        labelText="Old password"
                        name="oldPassword"
                        value={values.oldPassword}
                        handleChange={handleChange}
                    />
                    {errors.oldPassword && <p>{errors.oldPassword}</p>}
                    <FormRow
                        type="password"
                        labelText="New password"
                        name="newPassword"
                        value={values.newPassword}
                        handleChange={handleChange}
                    />
                    {errors.newPassword && <p>{errors.newPassword}</p>}
                    <FormRow
                        type="password"
                        labelText="New password retype"
                        name="newPasswordRetype"
                        value={values.newPasswordRetype}
                        handleChange={handleChange}
                    />
                    {errors.newPasswordRetype && <p>{errors.newPasswordRetype}</p>}


                    <button
                        className="btn btn-block"
                        type="submit"
                    // disabled={isLoading}
                    >

                        Save
                    </button>
                </div>
            </form>
        </Wrapper>

    )
}

export default ChangePassword