import React, { Component } from "react";
import {
    SafeAreaView,
    PermissionsAndroid,
    Platform,
} from "react-native";
import { Header } from "../../Components";
import Geolocation from "react-native-geolocation-service";
import IconsComponent from './Utils/IconsComponent';
import HarvestComponent from './Utils/HarvestComponent';
import SideIcons from "./Utils/SideIcons";
import { styles } from '../../../styles/main';

export default class MainComponent extends Component {
    state = {
        longitude: 0,
        latitude: 0,
        loadedCoords: false,
        error: null
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
                    message:
                        "App needs location permission to find your position."
                }
            )
                .then(granted => {
                    console.log(granted);
                })
                .catch(err => {
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    onMenuPress={() => this.props.navigation.toggleDrawer()}
                />
                {this.state.loadedCoords && (
                    <>
                        {this.state.currentVehicleId && (
                            <>
                                <IconsComponent currentVehicleId={this.state.currentVehicleId}/>
                                <HarvestComponent navigation={this.props.navigation}/>
                            </>
                        )}
                        <SideIcons refreshVehicleCollection={this.generateVehicleCollection}/>
                    </>
                )}
            </SafeAreaView>
        );
    }
}

