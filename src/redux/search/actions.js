export const actionTypes = {
  SEARCH_AREA: 'search/area',
  SEARCH_AREA_SUCCESS: 'search/area-success',
  SEARCH_AREA_FAIL: 'search/area-fail'
}

export function searchArea (keyword) {
  console.log(keyword)
  return {
    type: actionTypes.SEARCH_AREA,
    keyword
  }
}

export function searchAreaSuccess (data) {
  return {
    type: actionTypes.SEARCH_AREA_SUCCESS,
    data
  }
}

export function searchAreaFail (error) {
  return {
    type: actionTypes.SEARCH_AREA_FAIL,
    error
  }
}
