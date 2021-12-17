import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
/**
 * Header component
 * @param {Function} onPress - What to happen when we press
 * @returns Renderable component
 */
const Header = ({onPress}: {onPress: Function}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => {
          onPress();
        }}>
        <Image
          source={require('../assets/images/arrow-back.png')}
          resizeMode={'cover'}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: '12%',
    paddingBottom: 20,
    paddingHorizontal: '2.5%',
  },
  left: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 18.23,
    height: 31.88,
  },
});
export default Header;
