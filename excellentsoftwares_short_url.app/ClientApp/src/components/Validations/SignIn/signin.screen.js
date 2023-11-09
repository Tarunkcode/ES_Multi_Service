import React, { useContext } from 'react';
import CustomButton from '../../CustomButton/custom-button.component';
import FormInput from '../../FromInput/FormInput.component';
import { signInWithGoogle } from '../../../firebase/firebase.utils'
import './signin.styles.css'
import { Links_data_context } from '../../../AppContext/short_linksContext';

export default function SignInPage(props) {
    let { handleSubmit, handleChange } = props;
    let {domain } = useContext(Links_data_context);
 
    return (
        <div id="signin" className="sign-in card">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <div className="card-body">
                <FormInput
                    name="email"
                    type="email"
                    handleChange={handleChange}
                   
                    label="email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                  
                    handleChange={handleChange}
                    label="password"
                    required
                />
                <CustomButton type="submit" onClick={handleSubmit}> Sign in </CustomButton>
                <img className="google" src="./assets/g.png" style={{
                    width: '15%',
                    cursor: 'pointer',
                    height: 'auto'
                }} onClick={() => signInWithGoogle(domain)} isGoogleSignIn />
            </div>
                    
             
                
                  
            <div class="card-footer a-divider a-divider-break">
                <span className="mb-3">
                    <hr/>
                    <h5 aria-level="5">New to EsShortner?</h5>
                 </span>
                <br />
                <div className="m-1">
                <a href="#signup">Create Your Excellent Account</a>
                </div>
            </div>
        </div>
    )
}