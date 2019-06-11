import React, { Component, Fragment } from "react";
import { PermissionsAndroid, Platform, View, Text, Slider, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';
import { Header } from "../../components";
import { VenueApi } from '../../lib/api';
import Geolocation from "react-native-geolocation-service";
import TopBar from './components/TopBar';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import RNPickerSelect from 'react-native-picker-select';

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginHorizontal: 30,
        marginTop: 5
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginHorizontal: 30,
        marginTop: 5
    },
});

export default class MainComponent extends Component {
    state = {
        longitude: 0,
        latitude: 0,
        loadedCoords: false,
        item_categorys: '',
        searchRequested: false,
        searchSubmitted: false
    };

    async componentDidMount() {
        await VenueApi.itemCategorysRequest()
            .then((res) => {
                this.setState({
                    item_categorys: res.data,
                })
            })
            .catch(error => {
                console.log(error);
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

        try {
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
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
            );
        } catch(e) {
            Alert.alert("Unable to get current location.");
        }
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

    search = async (itemCategoryId, priceRange, milesRange, latitude, longitude) => {
        if(this.state.searchRequested) return;
        this.setState({
            searchRequested: true,
        })
        try {
            await VenueApi.venueSearchRequest(milesRange, latitude, longitude, itemCategoryId, priceRange).then(((res) => {
                console.log('res1 ===>', res);

                
                if(res.data && res.data.length > 0) {
                    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    
                    const latDelta = (milesRange * 1609.34) / oneDegreeOfLatitudeInMeters;
                    const lngDelta = (milesRange * 1609.34) / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
                    
                    
                    setTimeout(() => {
                        this.props.navigation.navigate("Map", { 
                            data: res.data, longitude, latitude, itemCategoryId, priceRange, milesRange, latDelta, lngDelta 
                        });
                        this.setState({
                            searchRequested: false
                        });
                    }, 1000);
                } else {
                    Alert.alert("No match!");
                    this.setState({
                        searchRequested: false
                    });
                }
            }));
        } catch(error) {
            Alert.alert("Error while searching!");
        }
    }

    change = (milesRange) => {
        this.setState({
            milesRange: milesRange
        });
    }

    handleSelectChange = (id, handler) => (value, index = 0) => {
        handler(id)(value + "");
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
                    {
                        this.state.searchRequested ?
                            <View style={styles.loading}>
                                <Text style={styles.loadingText}>LOADING...</Text>
                            </View>
                        : null
                    }
                    <View 
                        style={styles.search}
                    >   
                        <Formik
                            initialValues={{
                                itemCategoryId: '0',
                                priceRange: '0',
                                milesRange: 5
                            }}
                            onSubmit={values => this.search(
                                values.itemCategoryId ,
                                values.priceRange, 
                                values.milesRange, 
                                this.state.latitude,
                                this.state.longitude
                            )}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <Text style={{ paddingLeft: 30}}>Select category</Text>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Select category...',
                                            value: 0,
                                            color: '#9EA0A4',
                                        }}
                                        style={pickerSelectStyles}
                                        items={(this.state.item_categorys || []).map((category) => {
                                            return {
                                                label: category.name,
                                                value: category.id + ""
                                            }
                                        })}
                                        onValueChange={this.handleSelectChange('itemCategoryId', handleChange)}
                                        value={values.itemCategoryId}
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 20}}>Select price range</Text>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: 'Select price range...',
                                            value: 0,
                                            color: '#9EA0A4',
                                        }}
                                        style={pickerSelectStyles}
                                        items={[
                                            {
                                                label: "0$ - 5$",
                                                value: "0-5"
                                            },
                                            {
                                                label: "5$ - 10$",
                                                value: "5-10"
                                            },
                                            {
                                                label: "10$ - 15$",
                                                value: "10-15"
                                            },
                                            {
                                                label: "15$ - 20$",
                                                value: "15-20"
                                            },
                                            {
                                                label: "20$+",
                                                value: "20+"
                                            },
                                        ]}
                                        onValueChange={this.handleSelectChange("priceRange", handleChange)}
                                        value={values.priceRange}
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 20}}>Miles range: {values.milesRange}</Text>
                                    <Slider
                                        style={styles.slide}
                                        step={1}
                                        maximumValue={50}
                                        onValueChange={this.handleSelectChange("milesRange", handleChange)}
                                        value={parseFloat(values.milesRange)}
                                    />
                                    <TouchableOpacity onPress={handleSubmit}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                        >
                                            <Text
                                                style={styles.button}
                                            >
                                                SEARCH
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}