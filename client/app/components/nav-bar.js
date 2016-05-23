import Ember from 'ember';

const {get, set} = Ember;

export default Ember.Component.extend({

    errorService: Ember.inject.service('error'),
    activeSession: Ember.inject.service('active-session'),

    username: undefined,
    password: undefined,

    actions: {
        doLogin() {
            const username = get(this, 'username');
            const password = get(this, 'password');
            if (!Ember.isEmpty(username) && !Ember.isEmpty(password)) {
                get(this, 'activeSession').login(username, password, () => {
                    set(this, 'username', undefined);
                    set(this, 'password', undefined);
                    this.sendAction('afterLogin');
                });
            } else {
                get(this, 'errorService').setError('Your username and/or password cannot be empty!');
            }
        },

        doLogout() {
            get(this, 'activeSession').logout();
            set(this, 'username', undefined);
            set(this, 'password', undefined);
        }
    }
});
