import Ember from 'ember';

const {get, set} = Ember;
const authenticator = 'authenticator:custom';

export default Ember.Component.extend({

    session: Ember.inject.service('session'),
    errorService: Ember.inject.service('error'),

    username: undefined,
    password: undefined,

    actions: {
        login() {
            const username = get(this, 'username');
            const password = get(this, 'password');
            if (!Ember.isEmpty(username) && !Ember.isEmpty(password)) {
                const session = get(this, 'session');
                session.authenticate(authenticator, username, password).then(() => {
                    session.set('data.authenticated.username', username);
                }).catch(error => {
                    get(this, 'errorService').setError(error);
                }).finally(() => {
                    set(this, 'username', undefined);
                    set(this, 'password', undefined);
                });
            } else {
                get(this, 'errorService').setError('Your username and/or password cannot be empty!');
            }
        },

        logout() {
            const username = get(this, 'username');
            get(this, 'session').invalidate(username).catch(error => {
                get(this, 'errorService').setError(error);
            }).finally(() => {
                set(this, 'username', undefined);
                set(this, 'password', undefined);
            });
        }
    }
});
