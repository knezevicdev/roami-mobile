import React, { Component, Fragment } from 'react';
import { Text, ImageBackground, Image, View, TextInput, Alert, Linking } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import { storeAccessToken } from '../../lib/auth';
import { UserApi } from '../../lib/api';
import { colors } from '../../config';
import styles from "./styles";

export default class ResetPasswordComponent extends Component {
    state = {
        resetPasswordRequested: false,
        token: ""
    };

    static getDerivedStateFromProps(props, state) {
        if(state.token.length !== "") {
            return {
                token: props.navigation.state.params.token
            }
        }
    }

    resetPassword = async (token, password) => {
        try {
            await UserApi.resetPasswordRequest(token, password).then(response => {
                this.setState({
                    resetPasswordRequested: true
                })
                storeAccessToken(response.data.token);
                setTimeout(() => {
                    this.props.navigation.navigate("Home");
                }, 4000);
            }).catch(error => {
                this.setState({
                    resetPasswordRequested: false
                });
                Alert.alert("Your username or password is not valid.");
                console.log(error);
            });
        } catch (error) {
            this.setState({
                resetPasswordRequested: false
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never', top: 'never' }}>
                <Text>{this.state.token}</Text>
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
                                newPassword: '',
                                repeatedNewPassword:''
                            }}
                            onSubmit={values => this.resetPassword(values.newPassword, values.repeatedNewPassword)}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <TextInput
                                        value={values.password} 
                                        onChangeText={handleChange('password')}
                                        placeholder="New password"
                                        secureTextEntry={true}
                                        placeholderTextColor="white"
                                        style={styles.input}
                                    />
                                    <TextInput
                                        value={values.password} 
                                        onChangeText={handleChange('password')}
                                        placeholder="Repeat new password"
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
                                                this.state.resetPasswordRequested ? "LOADING" : "RESET PASSWORD"
                                            }
                                        </Text>
                                    </LinearGradient>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
