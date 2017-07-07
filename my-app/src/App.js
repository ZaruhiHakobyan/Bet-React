import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Addressbook from './Addressbook';

class App extends Component {
    render() {
        const list = [{name:'Zaruhi'}, {name:'Arman'}, {name:'Vzgo'}, {name:'Davit'}];
        return (
            <div className="App">
                <Addressbook contacts={list}></Addressbook>
            </div>
        );
    }
}

export default App;
