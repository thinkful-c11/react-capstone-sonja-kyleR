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
    return dispatch(fetchUnhealthySuccess(json))
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchUnhealthyError(err));
  })
}

export const FETCH_HEALTHY_REQUEST = 'FETCH_HEALTHY_REQUEST';
export const fetchHealthyRequest = (unhealthyfood)=>({
  type: FETCH_HEALTHY_REQUEST,
  unhealthyfood
});

export const FETCH_HEALTHY_SUCCESS = 'FETCH_HEALTHY_SUCCESS';
export const fetchHealthySuccess = (healthyStuff)=>({
  type: FETCH_UNHEALTHY_SUCCESS,
  healthyStuff
});

export const FETCH_HEALTHY_ERROR = 'FETCH_HEALTHY_ERROR';
export const fetchHealthyError = (error)=>({
  type: FETCH_HEALTHY_ERROR,
  error
});

export const FETCH_HEALTHY = 'FETCH_HEALTHY';
export const fetchHealthyStuff = () =>dispatch=>{
  dispatch(fetchHealthyRequest())
  fetch('/api/healthyfoods')
  .then(response => {
    if(!response.ok){
      Promise.reject(response.statusText);
    }
    return response.json()
  })
  .then(json => {
    return dispatch(fetchHealthySuccess(json))
  })
  .catch(err => {
    console.log(err);
    dispatch(fetchHealthyError(err));
  })
}
