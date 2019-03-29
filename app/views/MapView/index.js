import React from "react";
import { View, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from "./styles";

class MapComponent extends React.Component {

    onMarkerPress = (objectInfo) => (event) => {
        Alert.alert(objectInfo);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }} onPress={this.onMarkerPress("Gligorije!")}/>
                </MapView>
            </View>
        )
    }
}

export default MapComponent;