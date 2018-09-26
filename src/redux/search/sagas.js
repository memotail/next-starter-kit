import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes, searchAreaSuccess, searchAreaFail } from './actions'

function * searchAreaSaga (keyword) {
  console.log(keyword)
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(searchAreaSuccess(data))
  } catch (err) {
    yield put(searchAreaFail(err))
  }
}

export default takeLatest(actionTypes.SEARCH_AREA, searchAreaSaga)
