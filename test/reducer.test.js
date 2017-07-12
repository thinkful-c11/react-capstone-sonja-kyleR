import {reducer} from '../client/src/reducers/index';
// import {reducer} from './index';
console.log(reducer)
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
        }
        const state = reducer(myState, {type: '_UNKNOWN'});
        expect(state).toEqual(myState);
    });
    
    it('should change state to loading on a FETCH_UNHEALTHY_REQUEST', function() {
        
    });
})