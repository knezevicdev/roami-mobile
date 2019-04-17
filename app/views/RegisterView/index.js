import React, { Component, Fragment } from 'react';
import { Text, ImageBackground, Image, View, TextInput, Alert } from 'react-native';
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-navigation";
import { colors } from '../../config';
import { UserApi } from '../../lib/api';
import styles from "./styles";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RegisterComponent extends Component {
    state = {
        registered: false,
        registerMsg: 'Please confirm your email address',
        registerRequested: false
    };

    register = async (first_name, last_name, email, password) => {
        this.setState({
            registered: true,
            registerRequested: true
        });
        await UserApi.registerRequest(first_name, last_name, email, password)
            .then((res) => {
                if(res.status === 200) {
                    Alert.alert("Successfully registered, please confirm your email address!");
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 1000)
                } else {
                    Alert.alert("Error while registration.");
                    this.setState({
                        registered: false,
                        registerRequested: false
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
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                            }}
                            onSubmit={values => this.register(values.first_name, values.last_name, values.email, values.password)}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    {
                                        this.state.registered ? 
                                            <View>
                                                <Text style={styles.text}>{this.state.registerMsg}</Text>
                                            </View> : 
                                        null
                                    }
                                    <TextInput
                                        onChangeText={handleChange('first_name')}
                                        value={values.first_name}
                                        placeholder="Enter first name"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        onSubmitEditing={() => { this.lastNameInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={handleChange('last_name')}
                                        value={values.last_name}
                                        placeholder="Enter last name"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        ref={(input) => { this.lastNameInput = input; }}
                                        onSubmitEditing={() => { this.emailInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        placeholder="Enter email"
                                        placeholderTextColor="white"
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                        style={styles.input}
                                        ref={(input) => { this.emailInput = input; }}
                                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Enter password"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        secureTextEntry={true}
                                        ref={(input) => { this.passwordInput = input; }}
                                        onSubmitEditing={handleSubmit}
                                    />
                                    <TouchableOpacity onPress={handleSubmit}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        >
                                            <Text
                                                containerStyles={styles.button}
                                                style={{ color: colors.WHITE }}
                                            >
                                                {
                                                    this.state.registerRequested ? "REGISTERING" : "REGISTER"
                                                }
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toLogin()} >
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        >
                                            <Text
                                                containerStyles={styles.button}
                                                style={{ color: colors.WHITE }}
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