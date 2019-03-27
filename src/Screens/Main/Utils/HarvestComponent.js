import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native'
import FontAwesome, { Icons } from "react-native-fontawesome";
import { iconStyles } from '../../../../styles/main';

export default class HarwestComponent extends Component {
    harvest = () => {
        this.props.navigation.navigate('Scan');
    }

    render() {
        return (
            <View style={{
                alignItems: "center",
                top: Dimensions.get('window').height - 120,
                position: "absolute",
                width: "100%"
            }}>
                <TouchableOpacity 
                    style={{backgroundColor: "white",
                    borderRadius: 30}}
                    onPress={() => this.harvest()}
                >
                    <Text style={{
                        ...iconStyles.textStyle,
                        fontSize: 30,
                        paddingHorizontal: 15,
                        borderRadius: 100
                    }}>
                        <FontAwesome>
                            {Icons.unlockAlt}
                        </FontAwesome>
                        &nbsp;
                        Harvest
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
