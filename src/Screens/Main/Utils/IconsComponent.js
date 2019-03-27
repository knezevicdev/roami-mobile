import React, { Component } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Text,
} from 'react-native';
import FontAwesome, { Icons } from "react-native-fontawesome";

import { topBarstyles } from '../../../../styles/main';

export default class IconsComponent extends Component {
    state = {
        alarmOn: false,
        alarmText: "Ring"
    };

    switchAlarm = () => {
        this.setState({
            alarmOn: this.state.alarmOn === false ? true : false,
            alarmText: this.state.alarmText === "Ring" ? "Stop" : "Ring"
        }, () => this.ring());
    }

    ring = async () => {
        if(this.state.alarmOn === true){
            alarmOn(3).then(response => {
                console.log(response)
                console.log("alarm on")
            }).catch(error => {
                console.log(error)
            });
        } else {
            alarmOff(3).then(response => {
                console.log(response)
                console.log("alarm off")
            }).catch(error => {
                console.log(error)
            });
        }
    }

    render() {
        return (
            <View style={{
                position: "absolute",
                top: 55,
                left: "5%",
                width: "90%",
                backgroundColor: "white",
                borderRadius: 20,
                padding: 20
            }}>
                <View style={topBarstyles.topContainer}>
                    <View style={topBarstyles.textContainer}>
                        <Text style={topBarstyles.textTitle}>3 days ago</Text>
                        <Text style={topBarstyles.textSubtitle}>Last GPS Signal</Text>
                    </View>
                    <View style={topBarstyles.textContainer}>
                        <Text style={topBarstyles.textTitle}>2 months ago</Text>
                        <Text style={topBarstyles.textSubtitle}>Last Ride</Text>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    borderBottomColor: "#ebebeb",
                    borderBottomWidth: 1,
                    marginVertical: 15
                }}></View>
                <View style={topBarstyles.bottomContainer}>
                    <TouchableOpacity 
                        style={topBarstyles.bottomButton}
                        onPress={() => this.switchAlarm()}
                    >
                        <Text style={topBarstyles.bottomButtonText}>
                            <FontAwesome>{Icons.bell}</FontAwesome>&nbsp;{this.state.alarmText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={topBarstyles.bottomButton}
                        onPress={() => alert('Navigate!')}
                    >
                        <Text style={topBarstyles.bottomButtonText}>
                            <FontAwesome>{Icons.locationArrow}</FontAwesome>&nbsp;Navigate
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={topBarstyles.bottomButton}
                        onPress={() => alert('Report!')}
                    >
                        <Text style={topBarstyles.bottomButtonText}>
                            <FontAwesome>{Icons.exclamationTriangle}</FontAwesome>&nbsp;Report
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
