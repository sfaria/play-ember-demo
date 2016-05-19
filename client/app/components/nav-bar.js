import Ember from 'ember';

const { get, set } = Ember;
const authenticator = 'authenticator:custom';

export default Ember.Component.extend({

    session: Ember.inject.service('session'),

    error: undefined,
    hasError: Ember.computed.notEmpty('error'),

    username: undefined,
    password: undefined,

    actions: {
        login() {
            const username = get(this, 'username');
            const password = get(this, 'password');
            get(this, 'session').authenticate(authenticator, username, password).catch(error => {
               set(this, 'error', error);
            });
        },
        logout() {
            get(this, 'session').invalidate().catch(error => {
                set(this, 'error', error);
            });
        }
    }
});
