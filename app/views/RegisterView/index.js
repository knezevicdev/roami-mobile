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

    validateForm = (values) => {
    let errors = {};

    ["first_name", "last_name", "email", "password"].map(field => {
        if (!values[field]) {
            errors[field] = "This field is required.";
        }        
    });


    if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid e-mail address.';
        }
    }
  
    return errors;
    }

    register = async (first_name, last_name, email, password) => {
        this.setState({        
            registerRequested: true
        });
        await UserApi.registerRequest(first_name, last_name, email, password)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        registered: true,
                    });
                    Alert.alert("Success!", "Your registration was successful! Please check your email, and click the link in the message we just sent you. After you click the link, your account will be active.");
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 1000)
                } else {
                    Alert.alert("Error", "There was an error while trying to create your account.\nPlease, try again later.\n\nWe're very sorry about the inconvenience!");
                    this.setState({
                        registered: false,
                        registerRequested: false
                    })
                }
            })
            .catch((error) => {
                Alert.alert("Error", "There was an error while trying to create your account.\nPlease, try again later.\n\nWe're very sorry about the inconvenience!");
                this.setState({
                    registered: false,
                    registerRequested: false
                })
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
                    {
                        this.state.registerRequested ?
                            <View style={styles.loading}>
                                <Text style={styles.loadingText}>LOADING...</Text>
                            </View>
                        : null
                    }
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
                            validate={this.validateForm}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={values => this.register(values.first_name, values.last_name, values.email, values.password)}
                        >
                            {({ values, handleChange, handleSubmit, errors }) => (
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
                                        placeholder="Your First Name"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        onSubmitEditing={() => { this.lastNameInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    {errors.first_name && <Text style={styles.errorMessage}>{errors.first_name}</Text>}
                                    <TextInput
                                        onChangeText={handleChange('last_name')}
                                        value={values.last_name}
                                        placeholder="Your Last Name"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        ref={(input) => { this.lastNameInput = input; }}
                                        onSubmitEditing={() => { this.emailInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    {errors.last_name && <Text style={styles.errorMessage}>{errors.last_name}</Text>}
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
                                        ref={(input) => { this.emailInput = input; }}
                                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                                        blurOnSubmit={false}
                                    />
                                    {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Choose a Password"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        secureTextEntry={true}
                                        ref={(input) => { this.passwordInput = input; }}
                                        onSubmitEditing={handleSubmit}
                                    />
                                    {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
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
                                                REGISTER
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