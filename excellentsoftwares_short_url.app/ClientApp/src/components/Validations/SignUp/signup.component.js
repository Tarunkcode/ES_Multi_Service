import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { Component } from 'react';
import { Links_data_context } from '../../../AppContext/short_linksContext';
import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';
import SignUpPage from './signup.screen';

export const SaveNewUserDetailstoDb = (domain, body) => {


    let url = `${domain}/api/AddNewOneUser`;
    console.log('add new User Body' ,JSON.stringify(body))
    try {
        let res = fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

            },
            body: JSON.stringify(body)
        })
        if (res.status == 200) {
            res.then(jStr => jStr.json()).then(json => { return json })
        }
    } catch (err) {
        alert(err)
    }
}
export const UserExistAlreadyOrNot = (domain, uid) => {


    let url = `${domain}/api/FindUserIsAlreadyExistOrNot?uid=${uid}`;

    try {
        let res = fetch(url)
        if (res.status == 200) {
            res.then(jStr => jStr.json()).then(json => { return json })
        }
    } catch (err) {
        alert(err)
    }
}
export default class SignUp extends Component {
    static contextType = Links_data_context;
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
 
        const { displayName, email, password, confirmPassword } = this.state;
      
     
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                   
                    const user = userCredential.user;
                    let uid = user.uid;
                    let body = {
                        userId: uid,
                        uName: displayName,
                        password: password,
                        email: email,
                        phoneNo: null,
                        isCaptchaEnable: false
                    }
                    let dCon = this.context;
                    let user1 = UserExistAlreadyOrNot(dCon.domain, uid);
                    if (user1) {

                    } else {
                        SaveNewUserDetailstoDb(dCon.domain, body);
                        createUserProfileDocument(user, { displayName });
                    }
                   
                })
               
          

         
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
    render() {
        return (
            <SignUpPage handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} />
        )

    }
}