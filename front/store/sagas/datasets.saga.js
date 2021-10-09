import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../common/store/helpers';
import {
  getAllDataSets, getAllDataSetsAsync,
  clearAllDataSetsErrors, clearAllDataSetsErrorsAsync
} from '../actions/datasets.actions';
import datasetsApi from '../../common/api/datasets.api';

function plugeWorker() {
  return true;
}

export function* datasetsSaga() {
  yield takeEvery(getAllDataSets, bindAsyncActions(getAllDataSetsAsync)(datasetsApi.getAllDataSets));
  yield takeEvery(clearAllDataSetsErrors, bindAsyncActions(clearAllDataSetsErrorsAsync)(plugeWorker));

}
