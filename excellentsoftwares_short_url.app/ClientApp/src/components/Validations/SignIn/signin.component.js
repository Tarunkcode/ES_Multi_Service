/// <reference path="../../../firebase/firebase.utils.js" />
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { Component } from 'react';
import { auth } from '../../../firebase/firebase.utils';
import SignInPage from './signin.screen';


export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
       
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: "", password: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <SignInPage handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} />
        )
    }
}