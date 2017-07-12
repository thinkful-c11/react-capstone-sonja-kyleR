//async actions

export const FETCH_UNHEALTHY_REQUEST = 'FETCH_UNHEALTHY_REQUEST';
export const fetchUnhealthyRequest = ()=>({
  type: FETCH_UNHEALTHY_REQUEST
});

export const FETCH_UNHEALTHY_SUCCESS = 'FETCH_UNHEALTHY_SUCCESS';
export const fetchUnhealthySuccess = (unhealthyStuff)=>({
  type: FETCH_UNHEALTHY_SUCCESS,
  unhealthyStuff
});

export const FETCH_UNHEALTHY_ERROR = 'FETCH_UNHEALTHY_ERROR';
export const fetchUnhealthyError = (error)=>({
  type: FETCH_UNHEALTHY_ERROR,
  error
});


export const FETCH_UNHEALTHY = 'FETCH_UNHEALTHY';
export const fetchUnhealthyStuff = ()=>dispatch=>{
  dispatch(fetchUnhealthyRequest())
  fetch('/api/unhealthyfoods')
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText);
    }
    return response.json()
  })
  .then(json => {
    console.log("this is unhealthy json: " + json);
    return dispatch(fetchUnhealthySuccess(json))
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchUnhealthyError(err));
  })
}

export const FETCH_HEALTHY_REQUEST = 'FETCH_HEALTHY_REQUEST';
export const fetchHealthyRequest = (selectedUnhealthy)=>({
  type: FETCH_HEALTHY_REQUEST,
  selectedUnhealthy
});

export const FETCH_HEALTHY_SUCCESS = 'FETCH_HEALTHY_SUCCESS';
export const fetchHealthySuccess = (healthyStuff)=>({
  type: FETCH_HEALTHY_SUCCESS,
  healthyStuff
});

export const FETCH_HEALTHY_ERROR = 'FETCH_HEALTHY_ERROR';
export const fetchHealthyError = (error)=>({
  type: FETCH_HEALTHY_ERROR,
  error
});

export const FETCH_HEALTHY = 'FETCH_HEALTHY';
export const fetchHealthyStuff = (selectedUnhealthy) =>dispatch=>{
  dispatch(fetchHealthyRequest(selectedUnhealthy))
  fetch(`/api/healthy/${selectedUnhealthy}`)
  .then(response => {
    if(!response.ok){
      //console.log('response not ok');
      Promise.reject(response.statusText);
    }
    return response.json()
  })
  .then(json => {
    //console.log('response successful!');
    //console.log('this is json:' + json[0]);
    return dispatch(fetchHealthySuccess(json));
  })
  .catch(err => {
    console.log('there was an error: ' + err);
    dispatch(fetchHealthyError(err));
  })
}

//sync actions

export const SELECT_CRAVING = 'SELECT_CRAVING';
export const selectCraving = (craving) => ({
    type: SELECT_CRAVING,
    craving
});

export const ADD_OTHER_CRAVING = 'ADD_OTHER_CRAVING';
export const addOtherCraving = () => ({
    type: ADD_OTHER_CRAVING,
});

export const RESET_DEFAULTS = 'RESET_DEFAULTS';
export const resetDefaults = () => ({
    type: RESET_DEFAULTS,
});