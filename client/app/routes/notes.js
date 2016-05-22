import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    errorService: Ember.inject.service('error'),

    model() {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                type: 'GET',
                url: '/notes'
            }).done(result => {
                resolve(result);
            }).fail(error => {
                get(this, 'errorService').setError(error);
                reject();
            });
        });
    },

    setupController(controller, model) {
        controller.set('notes', model);
    }

});
