import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import UsernameInput from '../components/UsernameInput';
import Button from '../components/Button';
import constants from '../constants/values';
import useUsername from '../hooks/useUsername';
import useReply from '../hooks/useReply';
/**
 * Common screen container component
 * @param {any} children - Nested components
 * @returns Renderable component
 */
const Home = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const {username: reduxusername, setUsernameData} = useUsername();
  const {setReplyData} = useReply();

  useEffect(() => {
    setReplyData({});
  }, []);
  useEffect(() => {
    setUsername(reduxusername);
  }, [reduxusername]);

  const login = () => {
    if (username.length < 3) {
      alert('Please enter a username longer than 2 characters');
      return;
    }
    setUsernameData(username);
    navigation.navigate('Comments');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <SafeAreaView style={styles.containerSafe}>
          <Text style={styles.title}>{`COMMENTS\nWITH\nREDUX`}</Text>
          <View style={styles.padding1} />
          <UsernameInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter a username"
          />
          <View style={styles.padding2} />
          <Button text="Continue" onPress={login} />
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    //height: '100%',
    width: '100%',
  },
  containerSafe: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: constants.fontSizes.logo,
    fontWeight: '700',
    marginTop: '8%',
  },
  padding1: {
    marginTop: '20%',
  },
  padding2: {
    marginTop: '7%',
  },
});

export default Home;
