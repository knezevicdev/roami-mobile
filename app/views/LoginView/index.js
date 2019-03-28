import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { storeAccessToken } from '../../lib/auth';
import { LoginApi } from '../../lib/api';
import { colors } from '../../config';
import styles from "./styles";

export default class LoginComponent extends Component {
    state = {
        email: "test",
        password: "test"
    };

    login = async () => {
        try {
            LoginApi.loginRequest(this.state.email, this.state.password).then(response => {
                storeAccessToken(response.data.token);
                this.props.navigation.navigate("Home");
            }).catch(error => {
                console.log(error)
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <ImageBackground 
                    style={styles.container}
                    source={require('../../../assets/images/background/backgroundImage.png')}
                >
                <View style={styles.logoContainer}>
                    <Image 
                        style={{ width: '80%' }} resizeMode={'contain'}
                        source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Input email"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Input passwords"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Login'} onPress={() => this.login()} 
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>Powered by goUrban Mobility</Text>
                </View>
            </ImageBackground>
        );
    }
}