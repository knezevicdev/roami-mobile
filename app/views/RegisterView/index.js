import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-navigation";
import { Button } from '../../components';
import { colors } from '../../config';
import { UserApi } from '../../lib/api';
import styles from "./styles";

export default class RegisterComponent extends Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
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
                    });

                    Alert.alert("Successfully registered!");
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 1000)
                } else {
                    Alert.alert("Error while registration.");
                    this.setState({
                        registered: false
                    })
                }
            })
            .catch((error) => {
                Alert.alert("Error while registration.");
                console.log(error)
            })
    }

    toLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
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
                    <View style={{ flex: 2, marginBottom: 40, paddingBottom: 120 }}>
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
                            autoComplete="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoCapitalize="none"
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
                        <LinearGradient
                            colors={['#FF8943', '#F74251']}
                            style={styles.button}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <Text
                                containerStyles={styles.button}
                                style={{ color: colors.WHITE }}
                                onPress={() => this.register()}
                            >
                                REGISTER
                            </Text>
                        </LinearGradient>
                        <LinearGradient
                            colors={['#FF8943', '#F74251']}
                            style={styles.button}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                            <Text
                                containerStyles={styles.button}
                                style={{ color: colors.WHITE }}
                                onPress={() => this.toLogin()} 
                            >
                                LOGIN
                            </Text>
                        </LinearGradient>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}