import Ember from 'ember';

const {get, set} = Ember;

export default Ember.Service.extend({

    error: undefined,
    hasError: Ember.computed.notEmpty('error'),

    setError(error) {
        const errorText = typeof error === 'string' ? error : error.responseText || error.statusText || 'An unknown error occurred.';
        set(this, 'error', errorText);
    },

    clearError() {
        set(this, 'error', undefined);
    }
});
