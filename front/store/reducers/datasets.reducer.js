import { handleActions } from 'redux-actions';

import {
  getAllDataSetsAsync,
  clearAllDataSetsErrorsAsync
} from '../actions/datasets.actions';

const initialState = {
  state: [],
  error: null
};

export default handleActions({
  [getAllDataSetsAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? a.payload.data.datasets : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : { ENG: 'Something went wrong', RUS: 'ЧТо-то пошло не так' } }),
  [getAllDataSetsAsync.failed]: (s, a) => ({ ...s, state: null, error: { ENG: 'Something went wrong', RUS: 'ЧТо-то пошло не так' } }),
  [clearAllDataSetsErrorsAsync.success]: (s, a) => ({ ...s, error: null }),
  [clearAllDataSetsErrorsAsync.failed]: (s, a) => ({ ...s, error: null }),
}, initialState);
