import React, { Component, Fragment } from 'react';
import { Text, ImageBackground, Image, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import { storeAccessToken } from '../../lib/auth';
import { UserApi } from '../../lib/api';
import { colors } from '../../config';
import styles from "./styles";

export default class LoginComponent extends Component {
    state = {
        loginRequested: false
    };

    login = async (email, password) => {
        try {
            await UserApi.loginRequest(email, password).then(response => {
                console.log('res', response.data);
                this.setState({
                    loginRequested: true
                })
                storeAccessToken(response.data.token);
                setTimeout(() => {
                    this.props.navigation.navigate("Home");
                }, 4000);
            }).catch(error => {
                this.setState({
                    loginRequested: false
                });
                Alert.alert("Your username or password is not valid.");
                console.log(error);
            });
        } catch (error) {
            this.setState({
                loginRequested: false
            });
            Alert.alert("Your username or password is not valid.");
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
                    <View style={{ flex: 2, marginBottom: 40 }}>
                        <Formik
                            initialValues={{ 
                                email: 'test@mail.si', 
                                password:'testeri'
                            }}
                            onSubmit={values => this.login(values.email, values.password)}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <TextInput
                                        value={values.email} 
                                        onChangeText={handleChange('email')}
                                        placeholder="Email"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                    />
                                    <TextInput
                                        value={values.password} 
                                        onChangeText={handleChange('password')}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        placeholderTextColor="white"
                                        style={styles.input}
                                    />
                                    <LinearGradient
                                        colors={['#FF8943', '#F74251']}
                                        style={styles.button}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    >
                                        <Text
                                            style={{ color: colors.WHITE }}
                                            onPress={handleSubmit}
                                        >
                                            {
                                                this.state.loginRequested ? "LOADING" : "LOGIN"
                                            }
                                        </Text>
                                    </LinearGradient>
                                </Fragment>
                            )}
                        </Formik>
                        <LinearGradient
                            colors={['#FF8943', '#F74251']}
                            style={styles.button}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        >
                            <Text
                                onPress={() => this.registration()} 
                                style={styles.buttonText}
                            >
                                REGISTER
                            </Text>
                        </LinearGradient>
                        <View style={styles.reset}>
                            <Text onPress={() => this.toReset()} style={styles.text}>Reset password</Text>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
