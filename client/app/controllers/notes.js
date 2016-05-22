import Ember from 'ember';

const { set, get } = Ember;

export default Ember.Controller.extend({

    creatingNote: false,
    showingModal: function() {
        return get(this, 'creatingNote');
    }.property('creatingNote'),

    actions: {
        startAddNote() {
            set(this, 'creatingNote', true);
        },

        cancelAddNote() {
            set(this, 'creatingNote', false);
        },

        submitNote() {
            set(this, 'creatingNote', false);
        }
    }
});
