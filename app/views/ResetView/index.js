import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../config';
import { UserApi } from '../../lib/api';
import styles from "./styles";

export default class LoginComponent extends Component {
    state = {
        email: 'test@mail.com',
        reseted: false,
        resetMsg: 'Email with instructions is sent to your email.'
    };

    reset = async () => {
        await UserApi.resetRequest(this.state.email)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        reseted: true,
                    });
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 2000)
                } else {
                    this.setState({
                        reseted: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    toLogin = () => {
        this.props.navigation.navigate("Login");
    }

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
                <View style={{ flex: 1, marginBottom: 40, paddingBottom: 120 }}>
                    {
                        this.state.reseted ? 
                            <View>
                                <Text style={styles.text}>{this.state.resetMsg}</Text>
                            </View> : 
                        null
                    }
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Enter email"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Reset email'} onPress={() => this.reset()} 
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Return to login'} onPress={() => this.toLogin()} 
                    />
                </View>
            </ImageBackground>
        );
    }
}