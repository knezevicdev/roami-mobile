import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { VenueApi } from '../../lib/api';
import styles from "./styles";

export default class VenueComponent extends Component {
    constructor() {
        super();
        this.state = {
            venue: null,
            items: null,
            infoActive: true,
            itemActive: false,
            currentDay: '',
            currentTime: '',
            phonesOpen: true,
            emailsOpen: true
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
            Alert.alert(JSON.stringify(error));
            console.log(error)
        });

        const date = new Date();
        const day = date.getDay();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        this.setState({
            currentDay: day,
            currentTime: `${hour}:${minutes}`
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

    toMap = () => {
        this.props.navigation.navigate("DetailedMap", {
            position: this.state.venue.position
        });
    }

    render() {
        if(!this.state.venue) return (<View><Text>Loading...</Text></View>);
        console.log('venue', this.state.venue);
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
                <ScrollView>
                    <ImageBackground
                        source={{ uri: this.state.venue.image}}
                        style={styles.imageBackground}
                    >
                        {
                            this.state.venue.image ? 
                            <Text></Text> 
                            : <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: 100, zIndex: 100}}>No image</Text>
                        }
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.0)', '#828B78']}
                            style={styles.gradient}
                        >
                            <Text style={styles.venueName}>{this.state.venue.name}</Text>
                            <View style={styles.nav}>
                                <Text 
                                    style={this.state.infoActive ? styles.navItemActive : styles.navItem} 
                                    onPress={() => this.setState({ infoActive: true, itemActive: false })}
                                >
                                    INFO
                                </Text>
                                <Text 
                                    style={this.state.itemActive ? styles.navItemActive : styles.navItem} 
                                    onPress={() => this.setState({ infoActive: false, itemActive: true })}
                                >
                                    ITEMS
                                </Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    {
                        this.state.infoActive ? 
                        <View style={styles.container}>
                            <View style={styles.mainInfo}>
                                <View style={styles.address}>
                                    <Text style={styles.infoTitle}>Adress:</Text>
                                    <Text style={styles.infoText}>{this.state.venue.address}</Text>
                                    <Text>{this.state.venue.zip} {this.state.venue.city.name}, {this.state.venue.region.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.infoTitle}>Working period:</Text>
                                    {
                                        (this.state.venue.workingPeriods || []).map(period => {
                                            if(period.day === 0) {
                                                period.day = "Monday";
                                            } else if (period.day === 1) {
                                                period.day = "Tuesday";
                                            } else if (period.day === 2) {
                                                period.day = "Wednesday";
                                            } else if (period.day === 3) {
                                                period.day = "Thursday";
                                            } else if (period.day === 4) {
                                                period.day = "Friday";
                                            } else if (period.day === 5) {
                                                period.day = "Saturday";
                                            } else if (period.day === 6) {
                                                period.day = "Sunday";
                                            }
                                            return(
                                                <View key={period.id}>
                                                    <Text>{period.day}</Text>
                                                    <Text style={{ fontSize: 16}}>Open {period.open}</Text>
                                                    <Text style={{ fontSize: 16}}>Close {period.close}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                {/* <View 
                                    style={{
                                        position: 'absolute',
                                        zIndex: 800,
                                        right: 0,
                                        width: '45%',
                                        height: '100%',
                                        backgroundColor: 'blue'
                                    }}
                                >
                                    <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={{
                                            height: '100%'
                                        }}
                                        region={{
                                            latitude: this.state.venue.position.coordinates[1],
                                            longitude: this.state.venue.position.coordinates[0],
                                            latitudeDelta: 0.2,
                                            longitudeDelta: 0.2
                                        }}
                                    >
                                        {
                                            this.props.navigation.state.params.data ? this.props.navigation.state.params.data.map(marker => (
                                                <Marker key={marker.id} 
                                                        coordinate={{
                                                        latitude: marker.position.coordinates[1],
                                                        longitude: marker.position.coordinates[0]
                                                }} onPress={this.onMarkerPress(marker)}/>
                                            )) : <></>
                                        }
                                    </MapView>
                                </View> */}
                            </View>
                            <View style={styles.contact}>
                                <View style={styles.contactTab}>
                                    <Text onPress={() => this.setState({phonesOpen: !this.state.phonesOpen})} style={styles.infoTitle}>
                                        {this.state.venue.phones.length > 1 ? "Phones" : "Phone"}
                                    </Text>
                                    {
                                        this.state.phonesOpen ?
                                            <Text style={styles.contactItem}>{this.state.venue.phones[0].phone}</Text>
                                        :
                                        (this.state.venue.phones || []).map(phone => 
                                            <Text style={styles.contactItem} key={phone.id}>{phone.phone}</Text>
                                        )
                                    }
                                </View>
                                <View style={styles.contactTab}>
                                    <Text onPress={() => this.setState({emailsOpen: !this.state.emailsOpen})} style={styles.infoTitle}>
                                        {this.state.venue.emails.length > 1 ? "Emails" : "Email"}
                                    </Text>
                                    {
                                        this.state.emailsOpen ?
                                            <Text style={styles.contactItem}>{this.state.venue.emails[0].email}</Text>
                                        :
                                        (this.state.venue.emails || []).map(email => 
                                            <Text style={styles.contactItem} key={email.id}>{email.email}</Text>
                                        )
                                    }
                                </View>
                            </View>
                            <View style={styles.social}>
                                <Text style={styles.infoTitle}>Social</Text>
                                <Text>Description {this.state.venue.description}</Text>
                                {this.state.venue.website ? <Text>Website {this.state.venue.website}</Text> : null}
                                {this.state.venue.facebook_link ? <Text>Facebook {this.state.venue.facebook_link}</Text> : null}
                                {this.state.venue.twitter_link ? <Text>Twitter {this.state.venue.twitter_link}</Text> : null}
                                {this.state.venue.instagram_link ? <Text>Instagram {this.state.venue.instagram_link}</Text> : null}
                            </View>
                            <LinearGradient
                                colors={['#FF8943', '#F74251']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.buttonGradiant}
                            >
                                <Text
                                    style={styles.button}
                                    onPress={() => this.goBack()}
                                >
                                    GO BACK
                                </Text>
                            </LinearGradient>
                            
                        </View> 
                        :
                        <View style={styles.items}>
                            {
                                (this.state.venue.items || []).map((item) => 
                                    <View key={item.id} style={styles.item} >
                                        <Text>{item.name}</Text>
                                        <Text>{item.itemVenues.price / 100} $</Text>
                                    </View>
                                )
                            }
                            <LinearGradient
                                colors={['#FF8943', '#F74251']}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.buttonGradiant}
                            >
                                <Text
                                    style={styles.button}
                                    onPress={() => this.goBack()}
                                >
                                    GO BACK
                                </Text>
                            </LinearGradient>
                        </View>

                    }
                    
                </ScrollView>
                <LinearGradient
                    colors={['#FF8943', '#F74251']}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={styles.circle}
                    onPress={() => this.toMap()}
                >
                    <MaterialIcon onPress={() => this.toMap()} name={'explore'} size={45} color="white"  />
                </LinearGradient>
            </SafeAreaView>
        );
    }
}


