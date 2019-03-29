import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { UserApi } from '../../lib/api';
import styles from "./styles";

export default class VenueComponent extends Component {
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
            <View style={{ flex: 1, marginBottom: 40, paddingBottom: 120 }}>
                <TextInput
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    placeholder="Enter email"
                    placeholderTextColor="black"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={first_name => this.setState({ first_name })}
                    value={this.state.first_name}
                    placeholder="Enter first name"
                    placeholderTextColor="black"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={last_name => this.setState({ last_name })}
                    value={this.state.last_name}
                    placeholder="Enter last name"
                    placeholderTextColor="black"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    placeholder="Input password"
                    placeholderTextColor="black"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TextInput
                    onChangeText={newPassword => this.setState({ newPassword })}
                    value={this.state.newPassword}
                    placeholder="Input new password"
                    placeholderTextColor="black"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TextInput
                    onChangeText={repeatedNewPassword => this.setState({ repeatedNewPassword })}
                    value={this.state.repeatedNewPassword}
                    placeholder="Repeat new password"
                    placeholderTextColor="black"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Button
                    containerStyles={styles.button}
                    textStyles={styles.text.color}
                    title={'Update user'} onPress={() => this.updateUser()} 
                />
                <Text onPress={() => this.navigateToHome()}>Go back</Text>
            </View>
        );
    }
}