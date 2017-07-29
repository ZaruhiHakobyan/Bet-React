import React, { Component } from 'react';
import './App.css';

class Contact extends Component {
    render() {
        return (
            <div className="contact">
                <p>{this.props.contact.name}</p>
            </div>
        );
    }
}

export default Contact;
