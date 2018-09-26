import withRedux from 'next-redux-wrapper'

import createStore from './store'
import withReduxSaga from 'next-redux-saga'

export default function (BaseComponent) {
  return withRedux(createStore)(withReduxSaga({ async: true })(BaseComponent))
}
