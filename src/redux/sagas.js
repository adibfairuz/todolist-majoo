import { all } from 'redux-saga/effects';
import crudSaga from './modules/crud/saga';

export default function* rootSagas() {
  yield all([
    crudSaga()
  ]);
}
