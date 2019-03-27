import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Button } from '../../Components';
import { removeAccessToken } from '../../Services/Auth/Auth';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../Config';

export default class DrawerComponent extends Component {

  logout = () => {
    removeAccessToken().then(
      this.props.navigation.navigate('Login')
    )
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={[Colors.BLUE_LIGHT, Colors.BLUE_DARK]} style={styles.container}>
          <View style={styles.header}>

          </View>

          <View style={styles.body}>
            <View style={styles.bodyContainer}>
              <Button title={'Main'}
                      containerStyles={styles.buttonContainer}
                      textStyles={{ color: Colors.WHITE }}
                      onPress={() => {
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate('Main');
                      }}><MaterialIcon name={'home'} size={18} color={Colors.WHITE} /></Button>
              <Button title={'Scan'}
                      containerStyles={styles.buttonContainer}
                      textStyles={{ color: Colors.WHITE }}
                      onPress={() => {
                        this.props.navigation.closeDrawer();
                        this.props.navigation.navigate('Scan');
                      }}><MaterialIcon name={'camera'} size={18} color={Colors.WHITE} /></Button>
            </View>
            <View>
              <Button title={'Logout'}
                      containerStyles={{ alignItems: 'flex-start' }}
                      textStyles={{ color: Colors.WHITE }}
                      onPress={() => this.logout()}>
                <MaterialIcon name={'power-settings-new'} size={18} color={Colors.WHITE} /></Button>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    height: 90,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bodyContainer: {
    flex: 1
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginVertical: 10
  }
});
