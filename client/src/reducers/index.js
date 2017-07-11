import {FETCH_UNHEALTHY_ERROR, FETCH_UNHEALTHY_REQUEST, FETCH_UNHEALTHY_SUCCESS, 
    FETCH_HEALTHY_ERROR, FETCH_HEALTHY_REQUEST, FETCH_HEALTHY_SUCCESS} from '../actions'

const initialState = {
  unhealthyStuff: [],
  healthyStuff: [],
  loading: false,
  error: null
}

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_UNHEALTHY_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_UNHEALTHY_SUCCESS:
      return Object.assign({}, state, {unhealthyStuff: action.unhealthyStuff, loading: false});
    case FETCH_UNHEALTHY_ERROR:
      return Object.assign({}, state, {error: action.error, loading: false});
    case FETCH_HEALTHY_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_HEALTHY_SUCCESS:
      return Object.assign({}, state, {healthyStuff: action.healthyStuff, loading: false});
    case FETCH_HEALTHY_ERROR:
      return Object.assign({}, state, {error: action.error, loading: false}); 
    default:
      return state;
  }
}