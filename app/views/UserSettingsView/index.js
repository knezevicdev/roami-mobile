import React, { Component } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
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
            password: "",
            newPassword: "",
            repeatedNewPassword: ""
        };
    }

    updateUser = async () => {
        const { first_name, last_name, email, password, newPassword, repeatedNewPassword } = this.state;
        
        await UserApi.updateUser(first_name, last_name, email, password, newPassword, repeatedNewPassword)
            .then((res) => {
                if(res.status === 200) {
                    this.navigateToHome();
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
            this.setState({user: response.data});
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
                {!this.state.user ? <View></View>:<View style={{ marginTop: 40}}>
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Email</Text>
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Enter email"
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>First name</Text>
                    <TextInput
                        onChangeText={first_name => this.setState({ first_name })}
                        value={this.state.first_name}
                        placeholder="Enter first name"
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Last name</Text>
                    <TextInput
                        onChangeText={last_name => this.setState({ last_name })}
                        value={this.state.last_name}
                        placeholder="Enter last name"
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Old password</Text>
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Input old password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>New password</Text>
                    <TextInput
                        onChangeText={newPassword => this.setState({ newPassword })}
                        value={this.state.newPassword}
                        placeholder="Input new password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <Text style={{ paddingLeft: 30, marginTop: 5 }}>Repeat new password</Text>
                    <TextInput
                        onChangeText={repeatedNewPassword => this.setState({ repeatedNewPassword })}
                        value={this.state.repeatedNewPassword}
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
                            onPress={() => this.updateUser()} 
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
                </View>}
            </SafeAreaView>
        );
    }
}