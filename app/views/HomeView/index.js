import React, { Component } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "../../components";
import Geolocation from "react-native-geolocation-service";
import TopBar from './components/TopBar';
import styles from "./styles";

export default class MainComponent extends Component {
    state = {
        longitude: 0,
        latitude: 0,
        loadedCoords: false
    };

    async componentDidMount() {
        if (Platform.OS === "android") {
            await PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                ],
                {
                    title: "Give Location Permission",
                    message: "App needs location permission to find your position."
                }
            ).then(granted => {
                console.log(granted);
            }).catch(err => {
                console.warn(err);
            });
        }
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

    recenter = () => {
        Geolocation.getCurrentPosition(
            position => {
                try {
                    this._map.flyTo([position.coords.longitude, position.coords.latitude], 1000);
                } catch (error) {
                    console.log(error);
                }
            },
            error => {
                console.warn(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.containerStyle} forceInset={{ bottom: 'never' }}>
                <Header
                    onMenuPress={() => this.props.navigation.toggleDrawer()}
                />
                <View style={{flex: 1}}>
                    {this.state.loadedCoords && (
                        <>
                            {this.state.currentVehicleId && (
                                <TopBar currentVehicleId={this.state.currentVehicleId} navigate={this.navigateLink} lastGPS={this.getLastGPSSignal()} lastRide={this.getLastRide()} openDetails={this.openDetails} />
                            )}
                        </>
                    )}
                </View>
            </SafeAreaView>
        );
    }
}

