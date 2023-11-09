import React from 'react';
import CustomButton from '../../CustomButton/custom-button.component';
import FormInput from '../../FromInput/FormInput.component';
import './signup.styles.css'
export default function SignUpPage(props) {
   let { handleChange, handleSubmit } = props
    return (
        <div id="signup" className="card sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <div className="card-body sign-up-form">
                <FormInput
                    type="text"
                    name="displayName"
                  
                    handleChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                  
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    
                    handleChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <CustomButton type="submit" onClick={handleSubmit}>SIGN UP</CustomButton>
            </div>
            <div class="card-footer a-divider a-divider-break">
                <hr />
                <h5 aria-level="5">Already have an account? </h5>
                <br />
                <div className="m-1">
                    <a href="#signin">Sign in </a>
                </div>
            </div>


         
        </div>
    )
}