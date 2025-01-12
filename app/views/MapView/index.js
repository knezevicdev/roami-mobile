import React, { Fragment } from "react";
import { View, Text, Slider, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import LinearGradient from "react-native-linear-gradient";
import RNPickerSelect from 'react-native-picker-select';
import styles from "./styles";
import { VenueApi } from '../../lib/api';
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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

class MapComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            searchLoading: false,
            searchOpen: false,
            firstRequest: true,
            searchRequested: false,
            item_categorys: '',
            latDelta: '',
            lngDelta: '',
            data: ''
        }
    }
    onMarkerPress = (marker) => (event) => {
        this.props.navigation.navigate("Venue", { id: marker.id} )
    }

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

        
    }

    handleMenuOpen = (e) => {
        this.setState({
            searchOpen: !this.state.searchOpen
        })
    }

    handleSelectChange = (id, handler) => (value, index = 0) => {
        handler(id)(value + "");
    }

    search = async (itemCategoryId, priceRange, milesRange, latitude, longitude) => {
        await VenueApi.venueSearchRequest(milesRange, latitude, longitude, itemCategoryId, priceRange).then(((res) => {
            this.setState({
                searchRequested: true,
                firstRequest: false,
                data: res.data,
                searchLoading: true
            });
            if(res.data && res.data.length > 0) {
                const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

                const latDelta = (milesRange * 1609.34) / oneDegreeOfLatitudeInMeters;
                const lngDelta = (milesRange * 1609.34) / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
                
                this.setState({
                    searchOpen: false,
                    lngDelta,
                    latDelta,
                    // searchLoading: false
                });

                setTimeout(() => {
                    this.setState({
                        searchLoading: false
                    })
                }, 2000)
                
            } else {
                Alert.alert("No match!");
                this.setState({
                    searchRequested: false,
                    searchLoading: false
                });
            }
        })); 
    }
    render() {
        const { itemCategoryId, priceRange, milesRange, latDelta, lngDelta } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never' }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: this.props.navigation.state.params.latitude,
                        longitude: this.props.navigation.state.params.longitude,
                        latitudeDelta: parseFloat(this.state.latDelta) || latDelta,
                        longitudeDelta: parseFloat(this.state.lngDelta) || lngDelta
                    }}
                >
                    {
                        this.state.firstRequest ? this.props.navigation.state.params.data.map(marker => (
                            <Marker key={marker.id} 
                                    coordinate={{
                                    latitude: marker.position.coordinates[1],
                                    longitude: marker.position.coordinates[0]
                            }} onPress={this.onMarkerPress(marker)}/>
                        )) : <></>
                    }
                    {
                        this.state.searchRequested ? this.state.data.map(marker => (
                            <Marker key={marker.id} 
                                    coordinate={{
                                    latitude: marker.position.coordinates[1],
                                    longitude: marker.position.coordinates[0]
                            }} onPress={this.onMarkerPress(marker)}/>
                        )) : <></>
                    }
                </MapView>
                <View style={styles.search}>
                    <Text onPress={() => this.handleMenuOpen()} style={{ color: 'white' }} >
                        {itemCategoryId == '0' ? 'No category' : itemCategoryId} - {priceRange == '0' ? 'No price range' : ` ${priceRange}$`} - {` ${milesRange} miles`}
                    </Text>
                </View>
                <View style={{
                    position: "absolute",
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    paddingRight: 10,
                    paddingBottom: 15                    
                }} pointerEvents="box-none">
                    <TouchableOpacity style={{
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 40,
                        marginBottom: 5,
                        width: 50,
                        height: 50                  
                    }} onPress={() => this.props.navigation.navigate('Home')}>
                        <MaterialIcon name={'arrow-back'} size={40} color={"#000"} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.searchLoading ?
                        <View style={styles.loading}>
                            <Text style={styles.loadingText}>SEARCHING...</Text>
                        </View>
                    : null    
                }
                {
                    this.state.searchOpen ? 
                    <View 
                        style={styles.form}
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
                                this.props.navigation.state.params.latitude,
                                this.props.navigation.state.params.longitude
                            )}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <Text style={{ marginBottom: 5 }}>Select category</Text>
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
                                    <Text style={{ marginBottom: 5 }}>Select price range</Text>
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
                                    <Text style={{ marginBottom: 5 }}>Miles range: {values.milesRange}</Text>
                                    <Slider
                                        style={{ marginBottom: 5 }}
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
                    : null
                }
            </SafeAreaView>
        )
    }
}

export default MapComponent;