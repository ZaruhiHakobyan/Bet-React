import React, { Component } from 'react';
// import wikipedia  from 'wikipedia-js';
import WebSocket from 'react-websocket';
import wiki from 'wikijs';
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Tweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitArray: [],
            dances: [],
            wikiData: {},
            filterIncluding: [false, true]
        }
    }


    handleData(data) {
        let newData = JSON.parse(data);
        let inputValue = this.state.inpVal;
        if (!!newData.user.location && newData.user.location.indexOf(inputValue) >= 0) {
            this.state.twitArray.push(newData);
        }
        if(this.state.filterIncluding[0]){
            if(this.state.filterIncluding[1]){
                if (!!newData.user.location && newData.user.location.indexOf(inputValue) >= 0) {
                    this.state.twitArray.push(newData);
                }
            }else{
                if (!!newData.user.location && newData.user.location.indexOf(inputValue) < 0) {
                    this.state.twitArray.push(newData);
                }
            }
        }else{
            this.state.twitArray.push(newData);
        }
        this.setState({
            twitArray: this.state.twitArray.slice()
        });
    }

    getInputValue (e) {
        this.setState({ inpVal: e.target.value });
    }

    filterIncluding () {
        this.setState({
            filterIncluding: [true, true]
        });
    }

    filterExcluding () {
        this.setState({
            filterIncluding: [true, false]
        });
    }

    dropFilter () {
        this.setState({
            filterIncluding: [false, false]
        });
    }

    componentWillMount() {
        var that = this;
        wiki().page('List_of_national_dances')
            .then(page => {
                var links = page.html();
                links.then(function(stories) {
                    var div = document.createElement("div");
                    div.innerHTML = stories;
                    var data = div.querySelector("table.wikitable");
                    var allTr = data.querySelectorAll("tr");
                    allTr = Array.prototype.slice.call(allTr, 1);
                    var list = allTr.map(function(tr){
                        // debugger;
                        var key = tr.children[0].innerText.trim();
                        var obj = {};
                        var refs = tr.children[1].querySelectorAll('a');
                        var danceList = [];
                        if(refs.length) {
                            Array.prototype.reduce.call(refs, function(b, a){
                                var href = (a && a.href) || '';
                                var indexOfWiki = href.indexOf("/wiki/");
                                if(indexOfWiki >= 0) {
                                    danceList.push(href.substr(indexOfWiki + 6));
                                }
                            }, refs[0]);
                        }
                        obj[key] = danceList;
                        return obj;
                    })
                    that.setState({
                        dances: list
                    });
                });
            })
        this.setState({
            twitArray: this.state.twitArray.slice()
        });

    }



    render() {
        return (
            <div>
                Count: <strong>{this.state.twitArray.length}</strong>
                <div className='filterDiv clean'>
                    <input className='inputttt' type='text' placeholder='enter a location' onChange={this.getInputValue.bind(this)}/>
                    <div className='filter_include_btn' onClick={this.filterIncluding.bind(this)}>Filter including</div>
                    <div className='filter_exclude_btn' onClick={this.filterExcluding.bind(this)}>Filter excluding</div>
                    <div className='filter_drop_btn' onClick={this.dropFilter.bind(this)}>Drop filter</div>
                </div>
                <WebSocket url='ws://localhost:3070'
                           onMessage={this.handleData.bind(this)}/>
                {this.state.twitArray.map(element => {
                    // console.log(element.user.name + ' ____ ' + element.user.location + ' ____ ', this.state.inpVal);
                    {this.state.dances.forEach(function(el){
                        if(el[element.user.location]){
                            console.log('%%%%');
                            console.log(el[element.user.location]);
                        };

                    })

                    }
                    return (
                        <div className="user">
                            <div className="userInfo">
                                <a href={`${'https://twitter.com/'}${element.user.screen_name}`} target="_blank">
                                    <img src={element.user.profile_image_url} className="userimages"/>
                                    <span className="userName" > {element.user.name}</span>
                                </a>
                            </div>
                            <div className="userMessage">
                                <div>{element.text}</div>
                            </div>
                        </div>)
                })}
            </div>
        );
    }
}

export default Tweets;
