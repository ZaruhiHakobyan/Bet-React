import React, { Component } from 'react';
import './App.css';
import Contact from './Contact';

class Addressbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
			contacts: props.contacts
		};
    }

    onDelete (item){
        let contacts = this.state.contacts;
        for(let i = 0; i < contacts.length; i++){
            if(contacts[i] === item){
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
        let contact = {name:name};
        let contacts = this.state.contacts;;
        contacts.push(contact);
        this.setState({
            contacts: contacts
        });
    }
    render() {
        console.log(this.state)
        return (
            <div className="addressbook" >
                <input type='text' ref='contact_name'/>
                <button onClick={() => this.onAdd()}>Add</button>
                {this.props.contacts.map((item, index) =>
                    <div key={index}>
                        <Contact contact={item}></Contact>
                        <button className='remove_btn' onClick={() => this.onDelete(item)}>remove</button>
                    </div>)
                }
            </div>
        );
    }
}

export default Addressbook;
