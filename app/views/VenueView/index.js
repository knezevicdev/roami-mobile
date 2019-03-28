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
        const id = this.props.navigation.state.params.id;

        await VenueApi.venueRequest(id).then(response => {
            console.log(response.data);
            this.setState({venue: response.data});
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        if(!this.state.venue) return (<View></View>);
        return (
            <View style={styles.container}>
                <Text style={styles.button} onPress={() => this.toHome()}>Go back</Text>
                <View>
                    <Text>Address {this.state.venue.address}</Text>
                    <Text>City name {this.state.venue.city.name}</Text>
                    <Text>City id {this.state.venue.city.id}</Text>
                    <Text>City position longitude {this.state.venue.city.position.coordinates[1]}</Text>
                    <Text>City position latitude {this.state.venue.city.position.coordinates[0]}</Text>
                    <Text>City description {this.state.venue.description}</Text>
                    {(this.state.venue.emails || []).map(email => <Text key={email.id}>Email {email.email}</Text>)}
                    <Text>Country name {this.state.venue.country.name}</Text>
                    <Text>Facebook {this.state.venue.facebook_link}</Text>
                    <Text>Twitter {this.state.venue.twitter_link}</Text>
                    <Text>Instagram {this.state.venue.instagram_link}</Text>
                    <Text>Zip {this.state.venue.instagram_link}</Text>
                    <Text>Instagram {this.state.venue.instagram_link}</Text>
                    <Text>ID {this.state.venue.id}</Text>
                    <Text>Name {this.state.venue.name}</Text>
                    <Text>Image {this.state.venue.image}</Text>
                    {(this.state.venue.phones || []).map(phone => <Text key={phone.id}>Phone {phone.phone}</Text>)}
                    <Text>Website {this.state.venue.website}</Text>
                    <Text>Region ID {this.state.venue.regionId}</Text>
                    <Text>Superuser ID {this.state.venue.superUserId}</Text>
                    <Text>State name {this.state.venue.region.name}</Text>
                    <Text>State code {this.state.venue.region.code}</Text>
                    <Text>State ID {this.state.venue.region.id}</Text>
                    <Text>Position longitude {this.state.venue.city.position.coordinates[1]}</Text>
                    <Text>Position latitude {this.state.venue.city.position.coordinates[0]}</Text>
                </View>
            </View>
        );
    }
}