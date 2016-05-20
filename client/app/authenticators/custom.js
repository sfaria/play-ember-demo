import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({

    restore(data) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'POST',
                url: '/validate',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: data.username
                })
            }).done(() => {
                resolve();
            }).fail(error => {
                reject(error);
            });
        })
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

    invalidate(data) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'POST',
                url: '/logout',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: data.username
                })
            }).done(() => {
                resolve();
            }).fail(error => {
                reject(error);
            });
        });
    }

});
