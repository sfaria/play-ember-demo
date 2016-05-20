import Ember from 'ember';

const {get, set} = Ember;

export default Ember.Controller.extend({

    errorService: Ember.inject.service('error'),

    actions: {
        clearError() {
            get(this, 'errorService').clearError();
        }
    }

});
