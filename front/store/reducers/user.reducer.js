import { handleActions } from 'redux-actions';

import {
  getCurrentAccountInfoAsync,
  clearAllUserErrorsAsync
} from '../actions/user.actions';

const initialState = {
  state: null,
  error: null
};

export default handleActions({
  [getCurrentAccountInfoAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? { ...s.state, ...a.payload.data.user } : null, error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : { ENG: 'Something went wrong', RUS: 'ЧТо-то пошло не так' } }),
  [getCurrentAccountInfoAsync.failed]: (s, a) => ({ ...s, state: null, error: { ENG: 'Something went wrong', RUS: 'ЧТо-то пошло не так' } }),
  [clearAllUserErrorsAsync.success]: (s, a) => ({ ...s, error: null }),
  [clearAllUserErrorsAsync.failed]: (s, a) => ({ ...s, error: null }),
}, initialState);
