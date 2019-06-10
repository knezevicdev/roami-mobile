import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import { Text, ImageBackground, Image, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { UserApi } from '../../lib/api';
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';

export default class ResetComponent extends Component {
    state = {
        reseted: false,
        resetMsg: 'Email with instructions is sent to your email.',
        resetRequested: false
    };

    validateForm = (values) => {
        let errors = {};
        if (!values.email) { 
            errors.email = 'Please enter your e-mail address.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid e-mail address.';
        }   
        return errors;
    }

    forgotPasswordRequest = async (email) => {
        if(this.state.resetRequested) return;
        this.setState({            
            resetRequested: true
        });
        await UserApi.forgotPasswordRequest(email)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({reseted: true});
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 2000)
                } else {
                    this.setState({
                        reseted: false,
                        resetRequested: false
                    });
                }
            })
            .catch((error) => {
                Alert.alert(error.response.data.message);
                this.setState({
                    reseted: false,
                    resetRequested: false
                });
            })
    }

    toLogin = () => {
        if(this.state.resetRequested) return;
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never', top: 'never' }}>
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
                        <Formik
                            initialValues={{
                                email: ''
                            }}
                            onSubmit={values => this.forgotPasswordRequest(values.email)}
                            validateOnBlur={false}
                            validateOnChange={false}
                            validate={this.validateForm}

                        >
                            {({ values, handleChange, handleSubmit, errors }) => (
                                <Fragment>
                                    {
                                        this.state.reseted ? 
                                            <View>
                                                <Text style={styles.text}>{this.state.resetMsg}</Text>
                                            </View> : 
                                        null
                                    }
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        placeholder="Your E-mail"
                                        placeholderTextColor="white"
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                        style={styles.input}
                                    />

                                    {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

                                    <TouchableOpacity onPress={handleSubmit}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        >
                                            <Text
                                                style={{color: "#ffffff"}}
                                            >
                                                {
                                                    this.state.resetRequested ? "PLEASE CHECK YOUR INBOX" : "RESET"
                                                }
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toLogin()}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        >
                                            <Text
                                                style={{color: "#ffffff"}}
                                            >
                                                BACK TO LOGIN
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}
