import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { auth } from '../firebase/firebase.utils';
import { signOut } from 'firebase/auth';

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from '../redux/user/user.selectors';
import { connect } from "react-redux";


class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        userName: ''
    };
    }
  
    componentDidUpdate(prevProps) {
        if (prevProps.currentUser !== this.props.currentUser) {
            if (this.props.currentUser) {
                const { currentUser } = this.props.currentUser
                if (currentUser && currentUser.displayName) {
                   
                    this.setState({ userName: currentUser.displayName })
                }
            }
        }
    }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">excellentsoftwares_short_url.app</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                

                            <NavItem className="d-flex" style={{ cursor:'pointer' }}>
                                {
                                    this.state.userName ? (this.state.userName): null
                                }
                            {this.props.currentUser ? (
                                    <div className="option" onClick={() => signOut(auth)} style={{marginLeft:'40px'}}>
                                       
                        SIGN OUT
                    </div>
                ) : (
                    <Link className="option" to="/">
                        {" "}
                        SIGN IN{" "}
                    </Link>
                                )}
                            </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

const mapSateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapSateToProps)(NavMenu);
