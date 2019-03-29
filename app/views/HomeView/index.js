import React, { Component } from "react";
import { PermissionsAndroid, Platform, View, Picker, Text, Slider } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "../../components";
import { VenueApi } from '../../lib/api';
import Geolocation from "react-native-geolocation-service";
import TopBar from './components/TopBar';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

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

        console.log('Search', itemCategoryId, priceRange, milesRange);
        // await VenueApi.venueSearchRequest(itemCategoryId, milesRange, priceRange)
        //     .then()
    }

    change = (milesRange) => {
        this.setState({
            milesRange: milesRange
        });
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
                        <Text style={{ paddingLeft: 30}}>Select category</Text>
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
                        <Text style={{ paddingLeft: 30, marginTop: 20}}>Select price range</Text>
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
                        <Text style={{ paddingLeft: 30, marginTop: 20}}>Miles range: {this.state.milesRange}</Text>
                        <Slider
                            style={styles.slide}
                            step={1}
                            maximumValue={50}
                            onValueChange={(itemValue) => 
                                this.setState({ milesRange: itemValue })
                            }
                            value={this.state.milesRange}
                        />
                        <LinearGradient
                            colors={['#FF8943', '#F74251']}
                            style={styles.button}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        >
                            <Text
                                containerStyles={styles.button}
                                onPress={() => this.search()}
                            >
                                SEARCH
                            </Text>
                        </LinearGradient>
                    </View>
                    <View style={{ width: 50, height: 50, backgroundColor: 'orange'}}>
                        <Text onPress={() =>  this.props.navigation.navigate("Venue", { id: 4} )}>Press me</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

