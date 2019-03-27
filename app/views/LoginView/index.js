import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { storeAccessToken, Login } from '../../lib/auth';
import { colors } from '../../config';
import styles from "./styles";

export default class LoginComponent extends Component {
    state = {
        email: "",
        password: ""
    };

    login = async () => {
        try {
            const response = await Login(this.state.email, this.state.password);

            await storeAccessToken(response.data.token);
            await this.props.navigation.navigate("Main");
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <ImageBackground 
                    style={styles.container}
                    source={require('../../../assets/images/background/backgroundImage.png')}
                >
                <View style={styles.logoContainer}>
                    <Image 
                        style={{ width: '80%' }} resizeMode={'contain'}
                        source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Input email"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Input password"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                    />
                    <Button
                        containerStyles={styles.button}
                        textStyles={{ color: colors.WHITE }}
                        title={'Login'} onPress={() => this.login()} 
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>Powered by goUrban Mobility</Text>
                </View>
            </ImageBackground>
        );
    }
}