import React, { Component } from 'react';
import './App.css';

class Draw extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        let previous = this.props.prevItem();
        return (
            <div className="col-3">
                <h2>{this.props.item.name}</h2>
                <p>{this.props.item.price}</p>
                <p>{previous[0]}</p>
                grafik
            </div>
        );
    }
}

export default Draw;
