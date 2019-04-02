import React, { Component, Fragment } from "react";
import { PermissionsAndroid, Platform, View, PickerIOS, Text, Slider, Alert, StyleSheet } from "react-native";
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
        fontSize: 16,
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
        fontSize: 16,
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
        searchRequested: false
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

    search = async (itemCategoryId, priceRange, milesRange, latitude, longitude) => {
        await VenueApi.venueSearchRequest(milesRange, latitude, longitude, itemCategoryId, priceRange).then(((res) => {
            console.log('res', res);
            if(res.data && res.data.length > 0) {
                this.setState({
                    searchRequested: true
                })
                setTimeout(() => {
                    this.props.navigation.navigate("Map", { 
                        data: res.data, longitude, latitude, itemCategoryId, priceRange, milesRange 
                    });
                    this.setState({
                        searchRequested: false
                    });
                }, 5000);
            } else {
                Alert.alert("No match!");
                this.setState({
                    searchRequested: false
                });
            }
        }));
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
                                itemCategoryId: null,
                                priceRange: null,
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
                                    <LinearGradient
                                        colors={['#FF8943', '#F74251']}
                                        style={styles.button}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    >
                                        <Text
                                            style={styles.button}
                                            onPress={handleSubmit}
                                        >
                                            SEARCH
                                        </Text>
                                    </LinearGradient>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

{/* 
                        {/* <PickerIOS
                            style={styles.select}
                            selectedValue={this.state.itemCategoryId}
                            onValueChange={(itemValue) =>
                                this.setState({ itemCategoryId: itemValue })
                            }
                        >   
                            <PickerIOS.Item label="Please select category" value="0"/>
                            {
                                (this.state.item_categorys || []).map((category) => {
                                    return <PickerIOS.Item key={category.id} label={category.name} value={category.id} />
                                })
                            }
                        </PickerIOS> */}
                        
                        {/* <PickerIOS 
                            style={styles.select}
                            selectedValue={this.state.priceRange}
                            onValueChange={(itemValue) =>
                                this.setState({ priceRange: itemValue })
                            }
                        >
                            <PickerIOS.Item label="Please select price range" value="0"/>
                            <PickerIOS.Item label="0 - 5" value="0-5"/>
                            <PickerIOS.Item label="5 - 10" value="5-10"/>
                            <PickerIOS.Item label="10 - 15" value="10-15"/>
                            <PickerIOS.Item label="15 - 20" value="15-20"/>
                            <PickerIOS.Item label="20+" value="20+"/>
                        </PickerIOS> */}