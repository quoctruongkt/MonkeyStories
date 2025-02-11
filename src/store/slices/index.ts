import {combineReducers} from 'redux';
import counterReducer from './counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  // Các slice khác nếu có
});

export default rootReducer;
