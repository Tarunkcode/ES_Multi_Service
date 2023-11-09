import React, { Component } from 'react';


export default class EmptyLayout extends Component {

    render() {
        return (
            
                <div>
                    {this.props.children}
                </div>
           
         
        );
    }
}
