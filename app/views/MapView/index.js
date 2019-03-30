import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from "./styles";

class MapComponent extends React.Component {
    onMarkerPress = (marker) => (event) => {
        this.props.navigation.navigate("Venue", { id: marker.id} )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never' }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: this.props.navigation.state.params.latitude,
                        longitude: this.props.navigation.state.params.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
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
            </SafeAreaView>
        )
    }
}

export default MapComponent;