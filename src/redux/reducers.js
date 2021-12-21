import {combineReducers} from 'redux';
import crudReducer from './modules/crud/reducer';

const rootReducers = combineReducers({
  crud: crudReducer,
});

export default rootReducers;
