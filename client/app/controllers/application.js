import Ember from 'ember';

const {get, set} = Ember;

export default Ember.Controller.extend({

    errorService: Ember.inject.service('error'),
    activeSession: Ember.inject.service('active-session'),

    actions: {
        clearError() {
            get(this, 'errorService').clearError();
        },

        afterLogin() {
            this.transitionToRoute('notes');
        }
    }

});
