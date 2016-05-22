import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({

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
    },

    actions: {
        refreshModel() {
            this.refresh();
        }
    }

});
