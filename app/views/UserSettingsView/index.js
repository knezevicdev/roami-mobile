import React, { Component, Fragment } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';

import LinearGradient from 'react-native-linear-gradient';
import { UserApi } from '../../lib/api';
import { Header } from "../../components";
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class UserSettingsComponent extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            email: "",
            first_name: "",
            last_name: "",
            userUpdateRequest: false
        };
    }

    updateUser = async (first_name, last_name, newPassword, repeatedNewPassword, password) => {
        console.log('info', first_name, last_name, newPassword, repeatedNewPassword, password);
        if(newPassword && repeatedNewPassword && newPassword === repeatedNewPassword) {
            await UserApi.updateUser(first_name, last_name, newPassword, repeatedNewPassword, password)
                .then((res) => {
                    if(res.status === 200) {
                        this.setState({
                            userUpdateRequest: true
                        })
                        setTimeout(() => {
                            this.navigateToHome();
                            this.setState({
                                userUpdateRequest: true
                            })
                        }, 4000);
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
    }

    navigateToHome = () => {
        this.props.navigation.navigate("Home");
    }

    async componentDidMount() {
        await UserApi.getUser().then(response => {
            console.log('response', response)
            this.setState({
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name
            })
            this.setState({ user: response.data });
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never' }}>
                <Header
                    onMenuPress={() => this.props.navigation.toggleDrawer()}
                />
                {
                    this.state.userUpdateRequest ?
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>UPDATING...</Text>
                    </View> : null
                }
                {
                    !this.state.user ? <View></View>:
                    <View style={{ marginTop: 40}}>
                        <Formik
                            initialValues={{
                                email: "",
                                first_name: "",
                                last_name: "",
                                password: "",
                                newPassword: "",
                                repeatedNewPassword: ""
                            }}
                            onSubmit={values => this.updateUser(
                                values.first_name,
                                values.last_name,
                                values.newPassword,
                                values.repeatedNewPassword,
                                values.password,
                            )}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Email</Text>
                                    <TextInput
                                        value={values.email}
                                        placeholder="Enter email"
                                        placeholderTextColor="black"
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>First name</Text>
                                    <TextInput
                                        onChangeText={handleChange('first_name')}
                                        value={values.first_name}
                                        placeholder="Enter first name"
                                        placeholderTextColor="black"
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Last name</Text>
                                    <TextInput
                                        onChangeText={handleChange('last_name')}
                                        value={values.last_name}
                                        placeholder="Enter last name"
                                        placeholderTextColor="black"
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    {this.state.user.hasPassword ? <Text style={{ paddingLeft: 30, marginTop: 5 }}>Old password</Text> : null}
                                    {
                                        this.state.user.hasPassword ? 
                                        <TextInput
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            placeholder="Enter old password"
                                            secureTextEntry={true}
                                            style={styles.input}
                                            placeholderTextColor="white"
                                        /> : null
                                    }
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>New password</Text>
                                    <TextInput
                                        onChangeText={handleChange('newPassword')}
                                        value={values.newPassword}
                                        placeholder="Enter new password"
                                        secureTextEntry={true}
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Repeat new password</Text>
                                    <TextInput
                                        onChangeText={handleChange('repeatedNewPassword')}
                                        value={values.repeatedNewPassword}
                                        placeholder="Repeat new password"
                                        placeholderTextColor="white"
                                        secureTextEntry={true}
                                        style={{
                                            marginBottom: 30,
                                            borderRadius: 10,
                                            paddingVertical: 10,
                                            marginHorizontal: 30,
                                            backgroundColor: '#b2b2b4',
                                            paddingLeft: 20
                                        }}
                                        placeholderTextColor="white"
                                    />
                                    <TouchableOpacity onPress={handleSubmit}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={styles.text}  
                                        >
                                            <Text
                                                style={{color: "#ffffff"}}
                                            >
                                                UPDATE USER
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.navigateToHome()}>
                                        <LinearGradient
                                            colors={['#FF8943', '#F74251']}
                                            style={styles.button}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={styles.text}  
                                        >
                                            <Text
                                                style={{color: "#ffffff"}}
                                            >
                                                GO BACK
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                }
            </SafeAreaView>
        );
    }
}
