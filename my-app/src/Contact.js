import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Contact extends Component {
    constructor(name) {
		super();
		this.name = name;
	}
    render() {
        return (
            <div className="Contact">
                <p>{this.props.contact.name}</p>
            </div>
        );
    }
}

export default Contact;
