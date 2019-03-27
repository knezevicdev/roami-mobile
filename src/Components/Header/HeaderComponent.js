import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../Components';
import { Colors } from '../../Config';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default class HeaderComponent extends Component {
  static propTypes = {
    onMenuPress: PropTypes.func,
  };

  render() {
    return (
      <LinearGradient colors={[Colors.BLUE_LIGHT, Colors.BLUE_DARK]} style={styles.container}>
        <View style={styles.leftContainer}>
          <Button onPress={this.props.onMenuPress}>
            <MaterialIcon name={'menu'} size={32} color={Colors.WHITE} /></Button>
        </View>

        <View style={styles.centerContainer}>
          <Image style={{ height: 30, width: 100 }} resizeMode={'contain'}
                 source={require('../../../assets/images/logo/goUrbanMobilityWhiteLogo.png')} />
        </View>

        <View style={styles.rightContainer}>{this.props.children}</View>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 5
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  centerContainer: {
    flex: 3,
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
});
