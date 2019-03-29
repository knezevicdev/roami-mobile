import React, { Component } from "react";
import { PermissionsAndroid, Platform, View, Picker, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header, Button } from "../../components";
import { VenueApi } from '../../lib/api';
import Geolocation from "react-native-geolocation-service";
import TopBar from './components/TopBar';
import styles from "./styles";

export default class MainComponent extends Component {
    state = {
        longitude: 0,
        latitude: 0,
        loadedCoords: false,
        item_categorys: '',
        itemCategoryId: null,
        priceRange: null,
        milesRange: null
    };

    async componentDidMount() {
        VenueApi.itemCategorysRequest()
            .then((res) => {
                this.setState({
                    item_categorys: res.data
                })
            });

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

    search = async () => {
        const { itemCategoryId, priceRange, milesRange} = this.state;

        console.log('Search', itemCategoryId, milesRange, priceRange );
        await VenueApi.venueSearchRequest(itemCategoryId, milesRange, priceRange)
            .then()
    }

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
                    <View 
                        style={styles.search}
                    >   
                        <Picker
                             
                            style={styles.select}
                            selectedValue={this.state.itemCategoryId}
                            onValueChange={(itemValue) =>
                                this.setState({ itemCategoryId: itemValue })
                            }
                        >   
                            <Picker.Item label="Please select category" value="0"/>
                            {
                                (this.state.item_categorys || []).map((category) => {
                                    return <Picker.Item key={category.id} label={category.name} value={category.id} />
                                })
                            }
                        </Picker>
                        <Picker 
                            style={styles.select}
                            selectedValue={this.state.priceRange}
                            onValueChange={(itemValue) =>
                                this.setState({ priceRange: itemValue })
                            }
                        >
                            <Picker.Item label="Please select price range" value="0"/>
                            <Picker.Item label="0 - 5" value="0-5"/>
                            <Picker.Item label="5 - 10" value="5-10"/>
                            <Picker.Item label="10 - 15" value="10-15"/>
                            <Picker.Item label="15 - 20" value="15-20"/>
                            <Picker.Item label="20+" value="20+"/>
                        </Picker>
                        <Picker 
                            style={styles.select}
                            selectedValue={this.state.milesRange}
                            onValueChange={(itemValue) =>
                                this.setState({ milesRange: itemValue })
                            }
                        >
                            <Picker.Item label="Please select miles range" value="0"/>
                            <Picker.Item label="0 - 5" value="0-5"/>
                            <Picker.Item label="5 - 10" value="5-10"/>
                            <Picker.Item label="10 - 15" value="10-15"/>
                            <Picker.Item label="15 - 20" value="15-20"/>
                            <Picker.Item label="20+" value="20+"/>
                        </Picker>
                        <Button
                            containerStyles={styles.button}
                            title={'Search'} 
                            onPress={() => this.search()} 
                        />
                    </View>
                    {/* <View style={{ width: 50, height: 50, backgroundColor: 'orange'}}>
                        <Text onPress={() =>  this.props.navigation.navigate("Venue", { id: 2} )}>Press me</Text>
                    </View>
                    <View style={{ width: 50, height: 50, backgroundColor: 'orange'}}>
                        <Text onPress={() =>  this.props.navigation.navigate("UserSettings", { id: 3} )}>Edit user</Text>
                    </View> */}
                </View>
            </SafeAreaView>
        );
    }
}

