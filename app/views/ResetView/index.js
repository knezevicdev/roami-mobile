import React, { Component } from 'react';
import { Text, ImageBackground, Image, View, TextInput } from 'react-native';
import { Button } from '../../components';
import { colors } from '../../config';
import { UserApi } from '../../lib/api';
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';

export default class ResetComponent extends Component {
    state = {
        email: 'test@mail.com',
        reseted: false,
        resetMsg: 'Email with instructions is sent to your email.'
    };

    reset = async () => {
        await UserApi.resetRequest(this.state.email)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        reseted: true,
                    });
                    setTimeout(() => {
                        this.props.navigation.navigate("Login");
                    }, 2000)
                } else {
                    this.setState({
                        reseted: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    toLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
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
                <View style={{ flex: 1, marginBottom: 40, paddingBottom: 120 }}>
                    {
                        this.state.reseted ? 
                            <View>
                                <Text style={styles.text}>{this.state.resetMsg}</Text>
                            </View> : 
                        null
                    }
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Enter email"
                        placeholderTextColor="white"
                        style={styles.input}
                    />
                    <LinearGradient
                        colors={['#FF8943', '#F74251']}
                        style={styles.button}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                        <Text
                            onPress={() => this.reset()}
                        >
                            RESET EMAIL
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FF8943', '#F74251']}
                        style={styles.button}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                        <Text
                            onPress={() => this.toLogin()}
                        >
                            LOGIN
                        </Text>
                    </LinearGradient>
                </View>
            </ImageBackground>
        );
    }
}