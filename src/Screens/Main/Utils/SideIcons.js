import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native'
import FontAwesome, { Icons } from "react-native-fontawesome";
import { iconStyles } from '../../../../styles/main';

export default class SideIcons extends Component {
    render() {
        return (
            <React.Fragment>
                <TouchableOpacity 
                    style={{...iconStyles.containerStyle,
                        top: Dimensions.get('window').height - 180}}
                    onPress={this.props.refreshVehicleCollection}
                >
                    <Text style={{
                        ...iconStyles.textStyle,
                        fontSize: 32,
                        padding: 10    
                    }}>
                        <FontAwesome>
                            {Icons.sync}
                        </FontAwesome>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...iconStyles.containerStyle,
                        top: Dimensions.get('window').height - 120}}
                    onPress={() => alert('Compass!')}
                >
                    <Text style={iconStyles.textStyle}>
                        <FontAwesome>
                            {Icons.compass}
                        </FontAwesome>
                    </Text>
                </TouchableOpacity>
            </React.Fragment>
        );
    }
}
