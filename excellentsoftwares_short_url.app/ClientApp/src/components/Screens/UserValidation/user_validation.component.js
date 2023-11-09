import React from 'react';
import SignIn from '../../Validations/SignIn/signin.component';
import SignUp from '../../Validations/SignUp/signup.component';
import './user_validation.styles.css'
export default function UserValidationPage() {

    return (
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    )
}