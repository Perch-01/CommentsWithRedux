import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import withRedux from './hocs/withRedux';

export default withRedux(() => {
  return (
      <Navigation />
  );
});
