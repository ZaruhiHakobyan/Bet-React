import React, { Component } from 'react';
import WebSocket from 'react-websocket';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Tweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitArray: [],
            wikiData: {}
        }
    }


    // getLocationCoord () {
    //     var geocoder =  new window.google.maps.Geocoder();
    //     geocoder.geocode( { 'address': 'Yerevan'}, function(results, status) {
    //         if (status == window.google.maps.GeocoderStatus.OK) {
    //             alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
    //             return {
    //                 lat: results[0].geometry.location.lat(),
    //                 lng: results[0].geometry.location.lng()
    //                 };
    //         } else {
    //             alert("Something got wrong " + status);
    //         }
    //     });
    // }

    handleData(data) {
        // console.log(window.google.maps);
        let newData = JSON.parse(data);
        // var city = data.user.time_zone;
        // var coord =  this.getLocationCoord(city);
        this.state.twitArray.push(newData);
        this.setState({
            twitArray: this.state.twitArray.slice()
        });
    }
    // componentWillMount(){
    //     // var coord = this.getLocationCoord();
    //     // window.$.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+coord.lat+','+coord.lng+'&sensor=true',
    //     //     success: function(data){
    //     //         var state = data.results[0].address_components[5].long_name;
    //     //         var country = data.results[0].address_components[6].long_name;
    //     //         var zip = data.results[0].address_components[7].long_name;
    //     //         window.$('.leaflet-popup-content').text(state+' '+country+' '+zip);
    //     //         console.log(data.results[0]);
    //     //     }
    //     // });
    // }
    componentWillMount() {
        // fetch('http://www.wikiwand.com/en/List_of_national_dances')
        //     .then(response => response.json())
        //     .then(response => {
        //         // this.state.list.push(response);
        //         // this.state.x + 10;
        //         // this.setState({
        //         //     list: this.state.list.slice(),
        //         //     x: this.state.x + 10
        //         // });
        //         alert(response);
        //     })
        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    wikiData: response.results
                });
            })
    }
    render() {
        console.log(this.state.wikiData);
        return (
            <div>
                Count: <strong>{this.state.twitArray.length}</strong>

                <WebSocket url='ws://localhost:3070'
                           onMessage={this.handleData.bind(this)}/>
                {this.state.twitArray.map(element => {
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
