import React, { Component } from 'react';
import { Container } from 'reactstrap';

//import ToggleMenuBox from './ToggleMenuBox/toggle.menu_box';
//import Footer from './footer';


export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>

            <div>
          {this.props.children}
       
            </div>
      </div>
    );
  }
}
