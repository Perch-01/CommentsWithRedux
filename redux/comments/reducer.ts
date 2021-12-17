import {AnyAction} from 'redux';

type initialState = [];
export default (state: initialState = [], action: AnyAction) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    default:
      return state;
  }
};
