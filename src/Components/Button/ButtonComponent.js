import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class ButtonComponent extends Component {
  static propTypes = {
    containerStyles: PropTypes.object,
    textStyles: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyles]}
                        onPress={this.props.onPress}>
        <View style={styles.iconContainer}>
          {this.props.children}
        </View>
        <Text
          style={[{ marginLeft: this.props.children ? 10 : 0 }, styles.text, this.props.textStyles]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
    alignSelf: 'center'
  }
});
