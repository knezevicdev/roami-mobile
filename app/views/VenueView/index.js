import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput, ScrollView } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../config';
import { VenueApi } from '../../lib/api';
import styles from "./styles";

export default class VenueComponent extends Component {
    constructor() {
        super();
        this.state = {
            venue: null,
            items: null,
            infoActive: true,
            itemActive: false
        };
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    async componentDidMount() {
        const id = this.props.navigation.state.params.id;

        await VenueApi.venueRequest(id).then(response => {
            this.setState({ venue: response.data });
        }).catch(error => {
            console.log(error)
        });
    }

    activeTab = () => {
        if(this.state.infoActive) {
            this.setState({
                itemActive: false,
                infoActive: true,
            });
        } else {
            this.setState({
                itemActive: true,
                infoActive: false
            })
        }
    }

    render() {
        if(!this.state.venue) return (<View></View>);
        return (
            <ScrollView>
                <ImageBackground
                    style={styles.picture}
                    source={require('../../../assets/images/background/backgroundImage.png')}
                />
                <View style={styles.venueNav}>
                    <Text onPress={() => this.setState({ infoActive: true, itemActive: false })} style={styles.venueTab}>Info</Text>
                    <Text onPress={() => this.setState({ infoActive: false, itemActive: true })} style={styles.venueTab}>Items</Text>
                </View>
                {
                    this.state.infoActive ? 
                    <View style={styles.location}>
                        <View>
                            <Text style={styles.placeName}>{this.state.venue.name}</Text>
                            <View style={styles.venueContainer}>
                                <Text>Adress:</Text>
                                <Text>{this.state.venue.address}</Text>
                                <Text>{this.state.venue.zip} {this.state.venue.city.name}, {this.state.venue.region.name}</Text>
                            </View>
                            <View style={styles.venueContainer}>
                                <Text>Working period:</Text>
                                {
                                    (this.state.venue.workingPeriods || []).map(period => {
                                        return(
                                            <View key={period.id}>
                                                <Text>Day {period.day}</Text>
                                                <Text>Open {period.open}</Text>
                                                <Text>Close {period.close}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.venueContainer}>
                            {(this.state.venue.phones || []).map(phone => <Text key={phone.id}>Phone {phone.phone}</Text>)}
                            {(this.state.venue.emails || []).map(email => <Text key={email.id}>Email {email.email}</Text>)}
                        </View>
                        <View style={styles.venueContainer}>
                            <Text>Description {this.state.venue.description}</Text>
                            <Text>Website {this.state.venue.website}</Text>
                            <Text>Facebook {this.state.venue.facebook_link}</Text>
                            <Text>Twitter {this.state.venue.twitter_link}</Text>
                            <Text>Instagram {this.state.venue.instagram_link}</Text>
                        </View>
                    </View> 
                    :
                    <View style={styles.location}>
                        {
                            (this.state.venue.items || []).map((item) => 
                                <View key={item.id} style={styles.items} >
                                    <Text>{item.name}</Text>
                                    <Text style={styles.item}>{item.itemVenues.price / 100} $</Text>
                                </View>
                            )
                        }
                    </View>
                }
                <Text style={styles.button} onPress={() => this.goBack()}>Go back</Text>
            </ScrollView>
        );
    }
}

















{/* <Text>Address {this.state.venue.address}</Text>
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
<Text>Position latitude {this.state.venue.city.position.coordinates[0]}</Text> */}