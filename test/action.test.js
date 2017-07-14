/* global expect jest fetch */
import * as actions from '../client/src/actions/index';

// Sync actions
describe('selectCraving()', function() {
    it('should return the action', function() {
        const action = actions.selectCraving('chocolate');
        expect(action.type).toEqual(actions.SELECT_CRAVING);
        expect(action.craving).toEqual('chocolate');
    });
});

describe('addOtherCraving()', function() {
    it('should return the action', function() {
        const action = actions.addOtherCraving();
        expect(action.type).toEqual(actions.ADD_OTHER_CRAVING);
    });
});

describe('resetDefaults()', function() {
    it('should return the action', function() {
        const action = actions.resetDefaults();
        expect(action.type).toEqual(actions.RESET_DEFAULTS);
    });
});
// End sync actions

// Async actions
describe('fetchUnhealthy()', function() {
    it('should dispatch fetchUnhealthyRequest', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => res({ok:true, json() { return {}; }}));
        });
        const dispatch = jest.fn();

        return actions.fetchUnhealthyStuff()(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalled();
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchUnhealthyRequest());
        });
    });
    
    it('should dispatch fetchUnhealthySuccess', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => res({ok:true, json() { return {}; }}));
        });
        const dispatch = jest.fn();

        return actions.fetchUnhealthyStuff()(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalledWith('/api/unhealthyfoods');
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchUnhealthySuccess({}));
        });
    });
    
    it('should dispatch fetchUnhealthyError', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => rej(new Error));
        });
        const dispatch = jest.fn();

        return actions.fetchUnhealthyStuff()(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalledWith('/api/unhealthyfoods');
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchUnhealthyRequest());
            expect(dispatch).toHaveBeenCalledWith(actions.fetchUnhealthyError(new Error));
        });
    });
});

describe('fetchHealthy', function() {
    it('should dispatch fetchHealthyRequest', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => res({ok:true, json() { return {}; }}));
        });
        const dispatch = jest.fn();

        return actions.fetchHealthyStuff()(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalled();
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchHealthyRequest());
        });
    });
    
    it('should dispatch fetchHealthySuccess', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => res({ok:true, json() { return {}; }}));
        });
        const dispatch = jest.fn();

        return actions.fetchHealthyStuff('chocolate')(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalledWith('/api/healthy/chocolate');
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchHealthySuccess({}));
        });
    });
    
    it('should dispatch fetchHealthyError', function() {
        global.fetch = jest.fn().mockImplementation( url => {
            return new Promise( (res, rej) => rej(new Error));
        });
        const dispatch = jest.fn();

        return actions.fetchHealthyStuff('candy')(dispatch).then(() => {
            // Check that we made a request to the correct URL
            expect(fetch).toHaveBeenCalledWith('/api/healthy/candy');
            // Make sure that we dispatched the correct sync action
            expect(dispatch).toHaveBeenCalledWith(actions.fetchHealthyRequest('candy'));
            expect(dispatch).toHaveBeenCalledWith(actions.fetchHealthyError(new Error));
        });
    });
});

