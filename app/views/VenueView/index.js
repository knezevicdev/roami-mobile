import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../config';
import { VenueApi } from '../../lib/api';
import styles from "./styles";

export default class VenueComponent extends Component {
    constructor() {
        super();
        this.state = {
            venue: null
        };
    }

    toHome = () => {
        this.props.navigation.navigate("Home");
    }

    async componentDidMount() {
        await VenueApi.venueRequest().then(response => {
            console.log(response)
            this.setState({venue: response.data});
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        if(!this.state.venue) return (<View></View>);
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text onPress={() => this.toHome()}>Go back</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.address}</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.id}</Text>
                <Text>{this.state.venue.id}</Text>
            </View>
        );
    }
}