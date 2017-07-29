import React, { Component } from 'react';
import './App.css';
import Draw from'./Draw';
import DrawOnCanvas from'./DrawOnCanvas';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list : [[]],
            x: 0
        }
    }
    getPrevItem(){
        var prices = [];
        if(this.state.list.length > 1){
             this.state.list[this.state.list.length - 2].forEach((item) => {
                 prices.push(item.price);
             });
             return prices;
        } else {
            return [0, 0, 0];
        }
    }
    componentWillMount() {
        setInterval( () => {
            fetch('http://localhost:8888/prices')
                .then(response => response.json())
                .then(response => {
                    this.state.list.push(response);
                    this.state.x + 10;
                    this.setState({
                        list: this.state.list.slice(),
                        x: this.state.x + 10
                    });
                })
        }, 3000)
    }
    render() {
        return (
            <div className="container">
                {this.state.list[this.state.list.length - 1].map((elem) =>
                    <div className="graphicDiv">
                        <Draw
                            item={elem}
                            prevItem={this.getPrevItem.bind(this)}
                            key={elem.id}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
