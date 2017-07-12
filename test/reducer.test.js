import * as actions from '../client/src/actions/index';
import {reducer} from '../client/src/reducers/index';

const initialState = {
            unhealthyStuff: [],
            selectedUnhealthy: "",
            healthyStuff: [],
            loading: false,
            error: null,
            showHealthyStuff: false,
            showAddOption: false,
        };

describe('reducer', function() {
    it('should return the state when nothing is passed in', function() {
        const state = reducer(undefined, {type: '_UNKNOWN'});
        expect(state).toEqual(initialState);
    });
    
    it('should return the current state on an unknown action', function() {
        const myState = {
            unhealthyStuff: ['cheetos', 'mickie D\'s'],
            selectedUnhealthy: "cheetos",
            healthyStuff: [],
            loading: true,
            error: null,
            showHealthyStuff: false,
            showAddOption: false,
        };
        const state = reducer(myState, {type: '_UNKNOWN'});
        expect(state).toEqual(myState);
    });
    
    it('should change state to loading: true on a FETCH_UNHEALTHY_REQUEST', function() {
        const myState = Object.assign({}, initialState);
        const state = reducer(myState, {type: actions.FETCH_UNHEALTHY_REQUEST});
        expect(state).toEqual(Object.assign({}, myState, {loading: true}));
    });  
    
    it('should change state to loading: true on a FETCH_UNHEALTHY_SUCCESS', function() {
        const myState = Object.assign({}, initialState);
        const unhealthyStuff = ['cheetos', 'dog-crap', 'cat-poop'];
        const state = reducer(
                myState, 
                {
                    type: actions.FETCH_UNHEALTHY_SUCCESS,
                    unhealthyStuff
                }
        );
        expect(state).toEqual(Object.assign({}, myState, {loading: false, unhealthyStuff}));
    });
    
    it('should set state to not loading and error: error on FETCH_UNHEALTHY_ERROR', function() {
        const myState = Object.assign({}, initialState);
        const error = new Error;
        const state = reducer(
                myState, 
                {
                    type: actions.FETCH_UNHEALTHY_ERROR,
                    error
                }
        );
        expect(state).toEqual(Object.assign({}, state, {error, loading: false}));
    });
    
    it('should change state to loading on a FETCH_HEALTHY_REQUEST', function() {
        const myState = Object.assign({}, initialState);
        const state = reducer(myState, {type: actions.FETCH_HEALTHY_REQUEST});
        expect(state).toEqual(Object.assign({}, myState, {loading: true}));
    }); 
    
    it('should change state to show retrieved healthyStuff on a FETCH_HEALTHY_SUCCESS', function() {
        const myState = Object.assign({}, initialState);
        const healthyStuff = ['broccolli', 'gluten-free cake', 'money'];
        const state = reducer(
                myState, 
                {
                    type: actions.FETCH_HEALTHY_SUCCESS,
                    healthyStuff
                }
        );
        expect(state).toEqual(Object.assign({}, myState, {loading: false, showHealthyStuff: true, showAddOption: false, healthyStuff}));
    });
    
    it('should set state to not loading, hiding healthyStuff and error on FETCH_HEALTHY_ERROR', function() {
        const myState = Object.assign({}, initialState);
        const error = new Error;
        const state = reducer(
                myState, 
                {
                    type: actions.FETCH_HEALTHY_ERROR,
                    error
                }
        );
        expect(state).toEqual(Object.assign({}, state, {showHealthyStuff: false, error, loading: false}));
    });
    
    it('should set state for set state to selected craving on SELECT_CRAVING', function(){
        const myState = Object.assign({}, initialState);
        const craving = 'some craving';
        const state = reducer(
            myState, 
            {
                type: actions.SELECT_CRAVING,
                craving
            }
        );
        
        expect(state).toEqual(Object.assign({}, myState, {selectedUnhealthy: craving, showAddOption: false}))
    });
    
    it('should on set showAddOption to true on ADD_OTHER_CRAVING', function() {
        const myState = Object.assign({}, initialState);
        const state = reducer(
            myState, 
            {
                type: actions.ADD_OTHER_CRAVING,
            }
        );
        
        expect(state).toEqual(Object.assign({}, state, {showHealthyStuff: false, showAddOption: true}))
    });
    
    it('should on RESET_DEFAULTS', function() {
        const myState = Object.assign({}, initialState);
        const state = reducer(
            myState, 
            {
                type: actions.RESET_DEFAULTS,
            }
        );
        
        expect(state).toEqual(Object.assign({}, state, {showHealthyStuff: false, showAddOption: false, selectedUnhealthy: "", 
                                         healthyStuff: [], loading: false, error: null,}));
    });
})