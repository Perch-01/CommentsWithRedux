import {AnyAction} from 'redux';

type initialState = '';
export default (state: initialState = '', action: AnyAction) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.payload;
    default:
      return state;
  }
};
