import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../config';
import { UserApi } from '../../lib/api';
import styles from "./styles";

export default class RegisterComponent extends Component {
    state = {
        first_name: "Test",
        last_name: "Test",
        email: "test@test.com",
        password: "test",
        registered: false,
        registerMsg: 'Please confirm your email address'
    };

    register = async () => {
        const { first_name, last_name, email, password } = this.state;
        
        await UserApi.registerRequest(first_name, last_name, email, password)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        registered: true
                    })
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 2000)
                } else {
                    this.setState({
                        registered: false
                    })
                }
            })
            .catch((error) => {
                console.log(error)
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
                        this.state.registered ? 
                            <View>
                                <Text style={styles.text}>{this.state.registerMsg}</Text>
                            </View> : 
                        null
                    }
                    <TextInput
                        onChangeText={first_name => this.setState({ first_name })}
                        value={this.state.first_name}
                        placeholder="Input first name"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={last_name => this.setState({ last_name })}
                        value={this.state.last_name}
                        placeholder="Input last name"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
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
                        placeholder="Input password"
                        placeholderTextColor="white"
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Register'} onPress={() => this.register()} 
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Login'} onPress={() => this.toLogin()} 
                    />
                </View>
            </ImageBackground>
        );
    }
}