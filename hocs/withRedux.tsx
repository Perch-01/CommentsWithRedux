import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/configStore';

// eslint-disable-next-line react/display-name
export default (EnhancedComponent: any) => (props: any) =>
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EnhancedComponent {...props} />
      </PersistGate>
    </Provider>
  );
