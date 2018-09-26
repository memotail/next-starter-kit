// import { createStore, applyMiddleware, __DO_NOT_USE__ActionTypes as reduxAction } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   const { composeWithDevTools } = require('redux-devtools-extension')

  //   // 临时解决 redux4 与 redux-devtools-extension 导致 `Cannot read property 'state' of undefined `问题
  //   // redux-devtools-extension v2.15.2会解决，但目前没发布该版本
  //   // https://github.com/reduxjs/redux-devtools/issues/391
  //   // https://github.com/zalmoxisus/redux-devtools-extension/issues/430
  //   reduxAction.INIT = '@@redux/INIT'
  //   reduxAction.REPLACE = '@@redux/REPLACE'

  //   return composeWithDevTools(applyMiddleware(...middleware))
  // }
  return applyMiddleware(...middleware)
}

function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // bindMiddleware([])
    bindMiddleware([sagaMiddleware])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore
