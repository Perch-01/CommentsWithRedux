import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import constants from '../constants/values';

/**
 * Input Component
 * @param {string} placeholder - the placeholder of the textinput
 * @param {Function} onChangeText - the function to handle changes to value
 * @param {string} value - the value of the textinput
 * @returns Renderable component
 */
const UsernameInput = ({
  placeholder,
  onChangeText,
  value,
}: {
  placeholder: string;
  onChangeText: Function;
  value: string;
}) => {
  return (
    <TextInput
      style={[
        styles.input,
        {fontStyle: value.length == 0 ? 'italic' : 'normal'},
      ]}
      value={value}
      onChangeText={(text: string) => {
        onChangeText(text);
      }}
      placeholder={placeholder}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    width: '90%',
    borderRadius: constants.borderRadius.button,
    borderColor: constants.colors.GREY,
    paddingHorizontal: '5%',
    borderWidth: 1,
    height: constants.heigths.buttonHeight,
    fontSize: constants.fontSizes.medium,
  },
});

export default UsernameInput;
