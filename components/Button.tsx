import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import constants from '../constants/values';

/**
 * Button Component
 * @param {string} text - the text to be displayed on the button
 * @param {Function} onPress - the function to handle press events
 * @returns Renderable component
 */
const Button = ({text, onPress}: {text: string; onPress: Function}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: constants.borderRadius.button,
    height: constants.heigths.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.BLACK,
  },
  text: {
    fontSize: constants.fontSizes.medium+3,
    color: constants.colors.WHITE,
    fontWeight: '600',
  },
});
export default Button;
