import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user.reducer';
import datasetsReducer from './datasets.reducer';

export default (history) => combineReducers({
  user: userReducer,
  datasets: datasetsReducer,
  router: connectRouter(history),
});
