import React, { Component, Fragment } from 'react';
import { Text, ImageBackground, Image, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Formik } from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import { storeAccessToken } from '../../lib/auth';
import { UserApi } from '../../lib/api';
import { colors } from '../../config';
import styles from "./styles";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import { api } from "../../config";

export default class LoginComponent extends Component {
    state = {
        loginRequested: false
    };

    login = async (email, password) => {
        try {
            await UserApi.loginRequest(email, password).then(response => {
                console.log('res', response.data);
                this.setState({
                    loginRequested: true
                })
                storeAccessToken(response.data.token);
                setTimeout(() => {
                    this.props.navigation.navigate("Home");
                }, 4000);
            }).catch(error => {
                this.setState({
                    loginRequested: false
                });
                Alert.alert(error.response.data.message);
                console.log(error.response.data.message);
            });
        } catch (error) {
            this.setState({
                loginRequested: false
            });
        }
    }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  googleAuth = async () => {
    GoogleSignin.signIn()
      .then(user => {
        UserApi.thirdPartyAuth(
          user.user.email,
          null,
          user.user.givenName ? user.user.givenName : null,
          user.user.familyName ? user.user.familyName : null,
          user.user.id
        )
          .then(response => {
            storeAccessToken(response.data.token);
            this.props.navigation.navigate("Home");
          })
          .catch(error => {
            Alert.alert("Your username or password is not valid.");
            console.log(error);
          });
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err);
      })
      .done();
  };

  setupGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: api.GOOGLE_IOS_CLIENT_ID,
        webClientId: api.GOOGLE_WEB_CLIENT_ID,
        offlineAccess: false
      });
    } catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  };

  registration = () => {
    this.props.navigation.navigate("Register");
  };

  toReset = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  async FBGraphRequest(fields, callback) {
    const accessData = await AccessToken.getCurrentAccessToken();
    const infoRequest = new GraphRequest(
      "/me",
      {
        accessToken: accessData.accessToken,
        parameters: {
          fields: {
            string: fields
          }
        }
      },
      callback.bind(this)
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never', top: 'never' }}>
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
                    <View style={{ flex: 2, marginBottom: 40 }}>
                        <Formik
                            initialValues={{ 
                                email: 'gligorije.nikolic989@gmail.com', // test@mail.commm, test@mail.si
                                password:'testeri' // test123456, testeri
                            }}
                            onSubmit={values => this.login(values.email, values.password)}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Fragment>
                                    <TextInput
                                        value={values.email} 
                                        onChangeText={handleChange('email')}
                                        placeholder="Email"
                                        placeholderTextColor="white"
                                        style={styles.input}
                                        autoComplete="email"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoCapitalize="none"
                                    />
                                    <TextInput
                                        value={values.password} 
                                        onChangeText={handleChange('password')}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        placeholderTextColor="white"
                                        style={styles.input}
                                    />
                                    <LinearGradient
                                        colors={['#FF8943', '#F74251']}
                                        style={styles.button}
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    >
                                        <Text
                                            style={{ color: colors.WHITE }}
                                            onPress={handleSubmit}
                                        >
                                            {
                                                this.state.loginRequested ? "LOADING" : "LOGIN"
                                            }
                                        </Text>
                                    </LinearGradient>
                                </Fragment>
                            )}
                        </Formik>
                        <LinearGradient
                            colors={['#FF8943', '#F74251']}
                            style={styles.button}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        >
                            <Text
                                onPress={() => this.registration()} 
                                style={styles.buttonText}
                            >
                                REGISTER
                            </Text>
                        </LinearGradient>
                        <View style={styles.reset}>
                            <Text onPress={() => this.toReset()} style={styles.text}>Reset password</Text>
                        </View>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <GoogleSigninButton
                            style={{ width: 197, height: 48, paddingBottom: 5 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => this.googleAuth()}
                        />
                        <LoginButton
                            readPermissions={["public_profile email"]}
                            onLoginFinished={(error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                this.FBGraphRequest(
                                "id, email, picture.type(large)",
                                this.FBLoginCallback
                                );
                            }
                            }}
                            onLogoutFinished={() => console.log("logout.")}
                        />
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
  async FBLoginCallback(error, result) {
    if (error) {
      console.log(error);
    } else {
      UserApi.thirdPartyAuth(result.email, result.id)
        .then(response => {
          storeAccessToken(response.data.token);
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          Alert.alert("Your username or password is not valid.");
          console.log(error);
        });
    }
  }
}
