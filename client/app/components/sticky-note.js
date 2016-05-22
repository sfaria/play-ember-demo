import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({

    actions: {
        sendDelete(note) {
            this.sendAction('deleteAction', note);
        }
    }
});
