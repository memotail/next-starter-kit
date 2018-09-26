import { all } from 'redux-saga/effects'
import search from './search/sagas'

function * rootSaga () {
  yield all([
    search
  ])
}

export default rootSaga
