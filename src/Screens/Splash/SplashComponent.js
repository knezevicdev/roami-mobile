import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAccessToken } from '../../Services/Auth/Auth'
import { Colors } from '../../Config';

export default class SplashComponent extends Component {

  async componentDidMount() {
    const accessToken = await getAccessToken();
    setTimeout(() => {
      if (accessToken) {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }))
      } else {
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
      }
    }, 2000);
  }

  render() {
    return (
      <ImageBackground style={styles.container}
                       source={require('../../../assets/images/background/backgroundImage.png')}>

        <View style={styles.logoContainer}>
          <Image style={{ width: '80%' }} resizeMode={'contain'}
                 source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.text}>Powered by goUrban Mobility</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  text: {
    alignSelf: 'center',
    color: Colors.WHITE
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: 'flex-end'
  }
});
