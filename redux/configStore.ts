import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import reducer from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

const composeEnhancers = (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...[thunk])),
);
const persistor = persistStore(store);

export { store, persistor };
