//async actions

//GET Unhealthy foods list
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
  return fetch('/api/unhealthyfoods')
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText);
    }
    return response.json()
  })
  .then(json => {
    return dispatch(fetchUnhealthySuccess(json))
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchUnhealthyError(err));
  })
}

//GET Healthy foods list that corresponds to an unhealthy food
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
  return fetch(`/api/healthy/${selectedUnhealthy}`)
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText);
    }
    return response.json()
  })
  .then(json => {
    return dispatch(fetchHealthySuccess(json));
  })
  .catch(err => {
    console.log('there was an error: ' + err);
    dispatch(fetchHealthyError(err));
  })
}

//POST an Unhealthy food
export const POST_UNHEALTHY_REQUEST = 'POST_UNHEALTHY_REQUEST';
export const postUnhealthyRequest = (newCraving)=>({
  type: POST_UNHEALTHY_REQUEST,
  newCraving
});

export const POST_UNHEALTHY_ERROR = 'POST_UNHEALTHY_ERROR';
export const postUnhealthyError = (error)=>({
  type: POST_UNHEALTHY_ERROR,
  error
});

export const POST_UNHEALTHY = 'POST_UNHEALTHY';
export const postUnhealthy = (unhealthyThing)=>dispatch=>{
  dispatch(postUnhealthyRequest(unhealthyThing))
  const params = {
    method: 'POST',
    body: JSON.stringify({name: unhealthyThing.name}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(`/api/unhealthy/${unhealthyThing.name}`, params)
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText)
    }
    dispatch(fetchUnhealthyStuff());
  })
  .catch(error => {
    console.error(error)
    dispatch(postUnhealthyError(error))
  })
}

//Post a Healthy food
export const POST_HEALTHY_REQUEST = 'POST_HEALTHY_REQUEST';
export const postHealthyRequest = (newCravingBuster)=>({
  type: POST_HEALTHY_REQUEST,
  newCravingBuster
});

export const POST_HEALTHY_ERROR = 'POST_HEALTHY_ERROR';
export const postHealthyError = (error)=>({
  type: POST_HEALTHY_ERROR,
  error
});

export const POST_HEALTHY = 'POST_HEALTHY';
export const postHealthy = (healthyThing)=>dispatch=>{
  dispatch(postHealthyRequest(healthyThing))
  const params = {
    method: 'POST',
    body: JSON.stringify({name: healthyThing.name, correspondingUnhealthyFood: healthyThing.correspondingUnhealthyFood}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(`/api/healthy/${healthyThing.correspondingUnhealthyFood}/${healthyThing.name}`, params)
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText)
    }
    dispatch(fetchHealthyStuff(healthyThing.correspondingUnhealthyFood));
  })
  .catch(error => {
    console.error(error)
    dispatch(postHealthyError(error))
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

export const BUSTER_ALREADY_EXISTS_ERROR = 'BUSTER_ALREADY_EXISTS_ERROR';
export const busterAlreadyExistsError = () => ({
    type: BUSTER_ALREADY_EXISTS_ERROR,
});

export const TOGGLE_INFO_MODAL = 'TOGGLE_INFO_MODAL';
export const toggleInfoModal = () => ({
    type: TOGGLE_INFO_MODAL,
});
