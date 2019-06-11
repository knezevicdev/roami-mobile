import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from "react-navigation"; 
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '..';
import { removeAccessToken } from '../../lib/auth';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../config';
import styles from "./styles";
import { GoogleSignin } from "react-native-google-signin";
import { LoginManager } from 'react-native-fbsdk'

export default class DrawerComponent extends Component {
    logout = async () => {
        GoogleSignin.revokeAccess();
        LoginManager.logOut();

        removeAccessToken().then(
            this.props.navigation.navigate('Login')
        )
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never', top: 'never' }}>
                <LinearGradient colors={['#FF8943', '#F74251']} style={styles.container}>
                    <View style={styles.header}>
                        <Image 
                            style={{ width: '15%', backgroundColor: 'transparent' }} resizeMode={'contain'}
                            source={require('../../../assets/images/logo/logo-r.png')} 
                        />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyContainer}>
                            <Button 
                                title={'Main'}
                                containerStyles={styles.buttonContainer}
                                textStyles={{ color: colors.WHITE }}
                                onPress={() => {
                                    this.props.navigation.closeDrawer();
                                    this.props.navigation.navigate('Home');
                                }}>
                                    <MaterialIcon name={'home'} size={18} color={colors.WHITE} />
                            </Button>
                            <Button
                                title="Settings"
                                textStyles={{ color: colors.WHITE }}
                                onPress={() => {
                                    this.props.navigation.closeDrawer();
                                    this.props.navigation.navigate('UserSettings');
                                }}
                            >
                                <MaterialIcon name={'settings'} size={18} color={colors.WHITE} />
                            </Button>
                        </View>
                    <View>
                    <Button 
                        title={'Logout'}
                        containerStyles={{ alignItems: 'flex-start' }}
                        textStyles={{ color: colors.WHITE }}
                        onPress={() => this.logout()}
                    >
                        <MaterialIcon name={'power-settings-new'} size={18} color={colors.WHITE} />
                    </Button>
                </View></View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}