import {combineReducers} from 'redux';
import comments from './comments/reducer';
import username from './username/reducer';
import reply from './reply/reducer';

export default combineReducers({
  comments,
  reply,
  username,
});
