import * as actions from '../client/src/actions/index';
// import * as actions from './index';

// Sync actions
describe('selectCraving()', function() {
    it('should return the action', function() {
        const action = actions.selectCraving('chocolate');
        expect(action.type).to.equal(actions.SELECT_CRAVING);
        expect(action.craving).to.equal('chocolate');
    });
});

describe('addOtherCraving()', function() {
    it('should return the action', function() {
        const action = actions.addOtherCraving();
        expect(action.type).to.equal(actions.ADD_OTHER_CRAVING);
    });
});

describe('resetDefaults()', function() {
    it('should return the action', function() {
        const action = actions.resetDefaults();
        expect(action.type).to.equal(actions.RESET_DEFAULTS);
    });
});
// End sync actions

// Async actions
describe.only('fetchUnhealthy()', function() {
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
});