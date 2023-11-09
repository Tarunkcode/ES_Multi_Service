import React, { Component, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import  Home  from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './custom.css'
import {
    auth,
    createUserProfileDocument,
    onAuthStateChanged
} from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import EmptyLayout from './components/EmptyLayout';
import NoWhere from './components/NoWhere'
import UserValidation from './components/Screens/UserValidation/user_validation.component';

//------------------------------redux----------------------------------------

import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors.js";

//----------------------------------------------------------------------
class App extends Component {
    static displayName = App.name;
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                onSnapshot(userRef, (snapShot) => {
                    setCurrentUser({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                    // console.log(this.state);
                });
          
            }
            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        
      return (
        <>
            <ToastContainer
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
              <EmptyLayout>
                  <Route
                      exact
                      path="/"
                      render={() =>
                          this.props.currentUser ? (
                              <Redirect to="/home" />
                          ) : (
                              <UserValidation />
                          )
                      }
                  />
                 {/* <Route exact path='/' component={UserValidation} />*/}
                  <Route exact path="/:id" component={NoWhere } />
              </EmptyLayout>
            <Layout>
                    <Route exact path='/home' component={Home} />  
            </Layout>
             
            <Route path='/:counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
        </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);