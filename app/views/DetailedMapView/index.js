import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, ImageBackground, Image, View, TextInput, ScrollView } from 'react-native';

export default class DetailedMapComponent extends Component {
    componentDidMount() {
        console.log(this.props.navigation.state)
    }
    render() {
        
        return(
            <View>
                <Text>Mapa</Text>
            </View>
        )
    }
}