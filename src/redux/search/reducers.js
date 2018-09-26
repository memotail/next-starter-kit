import { actionTypes } from './actions'

const initialState = {
  isFetching: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_AREA:
      return state
    default:
      return state
  }
}
