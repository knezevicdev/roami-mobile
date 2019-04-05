import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from "react-native-geolocation-service";
import LinearGradient from "react-native-linear-gradient";
import { Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class DetailedMapComponent extends Component {
    constructor() {
        super();
        this.state = {
            routeRequested: false,
            latitude: '',
            longitude: '',
            loadedCoords: false,
            reqestCurrentPosition: false
        }
    }
    async componentDidMount() {
        await Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    loadedCoords: true
                });
            },
            error => {
                console.warn(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    toVenue = () => {
        this.props.navigation.goBack();
    }
    getDirection = () => {
        console.log('BLa')
        this.setState({
            routeRequested: true,
            reqestCurrentPosition: false
        })
    }
    locateYourself = async () => {
        console.log('locateYourself');
        this.setState({
            reqestCurrentPosition: true
        })
    }
    render() {
        return(
            <View style={{ flex: 1 }}>
                <View style={styles.nav}>
                    <MaterialIcon onPress={() => this.toVenue()} name={'keyboard-backspace'} size={25} color="white"  />
                    <Text style={{ color: 'white', fontSize: 18}} onPress={() => this.getDirection()}>DIRECTION</Text>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: this.state.reqestCurrentPosition ? this.state.latitude : this.props.navigation.state.params.position.coordinates[1],
                        longitude: this.state.reqestCurrentPosition ? this.state.longitude : this.props.navigation.state.params.position.coordinates[0],
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    style={{ flex: 1 }}
                    showsUserLocation={true}
                >
                    {
                        this.props.navigation.state.params.position ? 
                            <Marker
                                coordinate={{
                                    latitude: this.props.navigation.state.params.position.coordinates[1],
                                    longitude: this.props.navigation.state.params.position.coordinates[0],
                                }} 
                            />
                        : null
                    }
                    {
                        this.state.routeRequested ? 
                        <MapViewDirections
                            origin={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            destination={{
                                latitude: this.props.navigation.state.params.position.coordinates[1],
                                longitude: this.props.navigation.state.params.position.coordinates[0],
                            }}
                            apikey="AIzaSyA5VHqcjYb4AE3k_2IbMyG4jv-dUThR0a8"
                            strokeWidth={4}
                            strokeColor="red"
                        /> : null
                    }
                </MapView>
                <LinearGradient
                    colors={['#FF8943', '#F74251']}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={styles.circle}
                    onPress={() => this.locateYourself()}
                >
                    <MaterialIcon onPress={() => this.locateYourself()} name={'my-location'} size={30} color="white"  />
                </LinearGradient>
            </View>
        )
    }
}