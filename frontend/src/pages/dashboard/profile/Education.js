import React from 'react'
import { FormRow, FormRowSelect } from '../../../components'

const Education = () => {
    return (
        <>
            <FormRow
                type="text"
                labelText="Education"
                name="education"
                value=""
            // handleChange={handleChange}
            />
            {/* { errors.oldPassword && <p>{errors.oldPassword}</p> } */}
            <FormRow
                type="text"
                labelText="Introduction"
                name="introduction"
                value=""
            // handleChange={handleChange}
            />
            {/* { errors.newPassword && <p>{errors.newPassword}</p> } */}
            {/* <    FormRowSelect

        type="password"
        labelText="New password retype"
        name="newPasswordRetype"
        value=""
        handleChange={handleChange}
    /> */}
            <label class="switch">
               Invitable <input type="checkbox" checked/>
                    <span class="slider round"></span>
            </label>
        </>
    )
}

export default Education