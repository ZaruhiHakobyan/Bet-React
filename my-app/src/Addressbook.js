import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contact from './Contact';

class Addressbook extends Component {
    constructor() {
		super();
		this.state = {
            contacts: this.contacts
        };
	}
    onDelete (item){
        let contacts = this.props.contacts;
        for(let i = 0; i < contacts.length; i++){
            if(contacts[i] == item){
                contacts.splice(i, 1);
            }
        }
        this.setState({
			contacts: contacts
		});
    }
    onAdd (){
        let name = this.refs.contact_name.value;
        this.refs.contact_name.value = '';
        let contact = new Contact(name);
        this.props.contacts.push(contact);
        this.setState({
            contacts: this.props.contacts
        });

        console.log(this.props.contacts);
    }
    render() {
        return (
            <div className="Addressbook" contacts={this.state.contacts} >
                <input type='text' ref='contact_name'/>
                <button onClick={() => this.onAdd()}>Add</button>
                {this.props.contacts.map((item) =>
                    <div>
                        <Contact contact={item}></Contact>
                        <button className='remove_btn' onClick={() => this.onDelete(item)}>remove</button>
                    </div>)
                }
            </div>
        );
    }
}

export default Addressbook;
