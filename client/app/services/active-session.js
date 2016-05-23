import Ember from 'ember';

const {get, set} = Ember;
const authenticator = 'authenticator:custom';

export default Ember.Service.extend({

    session: Ember.inject.service('session'),
    errorService: Ember.inject.service('error'),

    user: undefined,
    isAuthenticated: function() {
        const username = get(this, 'user');
        return !Ember.isEmpty(username);
    }.property('user'),

    login(username, password, afterSuccess) {
        if (!Ember.isEmpty(username) && !Ember.isEmpty(password)) {
            const session = get(this, 'session');
            session.authenticate(authenticator, username, password).then(() => {
                set(this, 'user', username);
                Ember.run(() => {
                   afterSuccess(); 
                });
            }).catch(error => {
                set(this, 'user', undefined);
                get(this, 'errorService').setError(error);
            });
        } else {
            get(this, 'errorService').setError('Your username and/or password cannot be empty!');
        }
    },

    logout() {
        var session = get(this, 'session');
        session.invalidate().catch(error => {
            get(this, 'errorService').setError(error);
        }).finally(() => {
            set(this, 'user', undefined);
        });
    }
});
