import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { storeAccessToken } from '../../lib/auth';
import { UserApi } from '../../lib/api';
import { colors } from '../../config';
import styles from "./styles";

export default class LoginComponent extends Component {
    state = {
        email: "test@mail.sii",
        password: "testerii",
    };

    login = async () => {
        try {
            UserApi.loginRequest(this.state.email, this.state.password).then(response => {
                storeAccessToken(response.data.token);
                this.props.navigation.navigate("Home");
            }).catch(error => {
                console.log(error)
            });
        } catch (error) {
            console.log(error);
        }
    };

    registration = () => {
        this.props.navigation.navigate("Register");
    }

    toReset = () => {
        this.props.navigation.navigate("Reset");
    }

    render() {
        return (
            <ImageBackground 
                    style={styles.container}
                    source={require('../../../assets/images/background/backgroundImage.png')}
                >
                <View style={styles.logoContainer}>
                    <Image 
                        style={{ width: '30%', backgroundColor: 'transparent' }} resizeMode={'contain'}
                        source={require('../../../assets/images/logo/logo-r.png')} 
                    />
                </View>
                <View style={{ flex: 1, marginBottom: 40 }}>
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Input email"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Input passwords"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <LinearGradient
                        colors={['#FF8943', '#F74251']}
                        style={styles.button}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    >
                        <Text
                            textStyles={{ color: colors.WHITE }}
                            onPress={() => this.login()}  
                        >
                            LOGIN
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FF8943', '#F74251']}
                        style={styles.button}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    >
                        <Text
                            textStyles={styles.buttonText}
                            onPress={() => this.registration()} 
                        >
                            REGISTER
                        </Text>
                    </LinearGradient>
                    <View style={styles.reset}>
                        <Text onPress={() => this.toReset()} style={styles.text}>Reset password</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}