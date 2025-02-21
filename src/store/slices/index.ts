import {combineReducers} from 'redux';

import counterReducer from './counterSlice';
import debugReducer from './debugSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  debug: debugReducer,
  // Các slice khác nếu có
});

export default rootReducer;
