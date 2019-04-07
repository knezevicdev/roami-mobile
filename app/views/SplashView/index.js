import React, { Component } from 'react';
import { ImageBackground, Image, View, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAccessToken } from '../../lib/auth';
import styles from "./styles";

//REGEX
const resetPasswordLinkRegex = /com.roami.alcohol.app:\/\/roami-app\/(.*)/g;

export default class SplashView extends Component {

    async componentDidMount() {
        const accessToken = await getAccessToken();
        let initialUrl = null;

        try {
            initialUrl = await Linking.getInitialURL();
        } catch(error) {
            console.log("Failed to fetch initial URL");
        }

        if(initialUrl) {
            // Reset password view
            if(resetPasswordLinkRegex.test(initialUrl)) {
                resetPasswordLinkRegex.lastIndex = 0;
                const urlParams = resetPasswordLinkRegex.exec(initialUrl);

                if(urlParams) {
                    const token = urlParams[1];
                    return this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'ResetPassword', params: {
                        token
                    }}));
                }
            }
        }

        if (accessToken) {
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
        } else {
            this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
        }
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
            </ImageBackground>
        );
    }
}