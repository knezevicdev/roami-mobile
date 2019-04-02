import React, { Component, Fragment } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';

import LinearGradient from 'react-native-linear-gradient';
import { UserApi } from '../../lib/api';
import { Header } from "../../components";
import styles from './styles';

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

    updateUser = async (email, first_name, last_name, password, newPassword, repeatedNewPassword) => {
        await UserApi.updateUser(email, first_name, last_name, password, newPassword, repeatedNewPassword)
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

    navigateToHome = () => {
        this.props.navigation.navigate("Home");
    }

    async componentDidMount() {
        await UserApi.getUser().then(response => {
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
                                email: "test@mail.com",
                                first_name: "Mitar",
                                last_name: "Djakovic",
                                password: "test1234",
                                newPassword: "test12345",
                                repeatedNewPassword: "test12346"
                            }}
                            onSubmit={values => this.updateUser(
                                values.email, 
                                values.first_name,
                                values.last_name,
                                values.password,
                                values.newPassword,
                                values.repeatedNewPassword
                            )}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Email</Text>
                                    <TextInput
                                        onChangeText={handleChange('email')}
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
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Old password</Text>
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Enter old password"
                                        placeholderTextColor="black"
                                        secureTextEntry={true}
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>New password</Text>
                                    <TextInput
                                        onChangeText={handleChange('newPassword')}
                                        value={values.newPassword}
                                        placeholder="Enter new password"
                                        placeholderTextColor="black"
                                        secureTextEntry={true}
                                        style={styles.input}
                                        placeholderTextColor="white"
                                    />
                                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Repeat new password</Text>
                                    <TextInput
                                        onChangeText={handleChange('repeatedNewPassword')}
                                        value={values.repeatedNewPassword}
                                        placeholder="Repeat new password"
                                        placeholderTextColor="black"
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
                                    <LinearGradient
                                        colors={['#FF8943', '#F74251']}
                                        style={styles.button}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={styles.text}  
                                    >
                                        <Text
                                            onPress={handleSubmit} 
                                            style={{color: "#ffffff"}}
                                        >
                                            UPDATE USER
                                        </Text>
                                    </LinearGradient>
                                    <LinearGradient
                                        colors={['#FF8943', '#F74251']}
                                        style={styles.button}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={styles.text}  
                                    >
                                        <Text
                                            onPress={() => this.navigateToHome()}
                                            style={{color: "#ffffff"}}
                                        >
                                            GO BACK
                                        </Text>
                                    </LinearGradient>
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                }
            </SafeAreaView>
        );
    }
}
