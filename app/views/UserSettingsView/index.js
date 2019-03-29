import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { UserApi } from '../../lib/api';
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
        if(!this.state.user) return (<View></View>);
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    placeholder="Enter email"
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={first_name => this.setState({ first_name })}
                    value={this.state.first_name}
                    placeholder="Enter first name"
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={last_name => this.setState({ last_name })}
                    value={this.state.last_name}
                    placeholder="Enter last name"
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    placeholder="Input old password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={newPassword => this.setState({ newPassword })}
                    value={this.state.newPassword}
                    placeholder="Input new password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor="white"
                />
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
                        backgroundColor: '#2d5be3',
                        
                    }}
                    placeholderTextColor="white"
                />
                <Text
                    style={styles.text} 
                    title={'Update user'} 
                    onPress={() => this.updateUser()} 
                >
                    Update user
                </Text>
                <Text
                    style={styles.text} 
                    onPress={() => this.navigateToHome()}
                >
                    Go back
                </Text>
            </View>
        );
    }
}