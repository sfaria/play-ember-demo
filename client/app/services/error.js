import Ember from 'ember';

const { set, get } = Ember;

export default Ember.Service.extend({

    error: undefined,
    hasError: function() {
        return !Ember.isEmpty(get(this, 'error'));
    }.property('error'),

    setError(error) {
        const errorText = typeof error === 'string' ? error : error.responseText || error.statusText || 'An unknown error occurred.';
        set(this, 'error', errorText);
    },

    clearError() {
        set(this, 'error', undefined);
    }
});
