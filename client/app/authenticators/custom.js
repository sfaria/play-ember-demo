import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { get } = Ember;

export default Base.extend({

    activeSession: Ember.inject.service('active-session'), 
    
    restore() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'POST',
                url: '/validate'
            }).done(result => {
                get(this, 'activeSession').restoreSession(result);
                resolve();
            }).fail(error => {
                reject(error);
            });
        });
    },

    authenticate(username, password) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'POST',
                url: '/login',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: password
                })
            }).done(() => {
                resolve();
            }).fail(error => {
                reject(error);
            });
        });
    },

    invalidate() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'POST',
                url: '/logout'
            }).done(() => {
                resolve();
            }).fail(error => {
                reject(error);
            });
        });
    }

});
