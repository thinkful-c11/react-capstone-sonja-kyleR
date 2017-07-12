import {FETCH_UNHEALTHY_ERROR, FETCH_UNHEALTHY_REQUEST, FETCH_UNHEALTHY_SUCCESS, 
    FETCH_HEALTHY_ERROR, FETCH_HEALTHY_REQUEST, FETCH_HEALTHY_SUCCESS, SELECT_CRAVING,
    ADD_OTHER_CRAVING} from '../actions'

const initialState = {
  unhealthyStuff: [],
  selectedUnhealthy: "",
  healthyStuff: [],
  loading: false,
  error: null,
  showHealthyStuff: false,
  showAddOption: false,
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
      return Object.assign({}, state, {healthyStuff: action.healthyStuff, showHealthyStuff: true, showAddOption: false, loading: false});
    case FETCH_HEALTHY_ERROR:
      return Object.assign({}, state, {showHealthyStuff: false, error: action.error, loading: false}); 
    case SELECT_CRAVING:
        return Object.assign({}, state, {selectedUnhealthy:action.craving, showAddOption: false});
    case ADD_OTHER_CRAVING:
        return Object.assign({}, state, {showHealthyStuff: false, showAddOption: true});
    default:
      return state;
  }
}