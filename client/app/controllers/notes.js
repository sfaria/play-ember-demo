import Ember from 'ember';

const { set, get } = Ember;

export default Ember.Controller.extend({

    errorService: Ember.inject.service('error'),

    creatingNote: false,
    title: undefined,
    note: undefined,
    showingModal: function() {
        return get(this, 'creatingNote');
    }.property('creatingNote'),

    actions: {
        startAddNote() {
            set(this, 'title', undefined);
            set(this, 'note', undefined);
            set(this, 'creatingNote', true);
        },

        cancelAddNote() {
            set(this, 'title', undefined);
            set(this, 'note', undefined);
            set(this, 'creatingNote', false);
        },

        submitNote() {
            const title = get(this, 'title');
            const note = get(this, 'note');
            if (!Ember.isEmpty(title) && !Ember.isEmpty(note)) {
                Ember.$.ajax({
                    type: 'POST',
                    url: '/notes',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        title: title,
                        body: note
                    })
                }).done(() => {
                    this.send('refreshModel');
                }).fail(error => {
                    get(this, 'errorService').setError(error);
                }).always(() => {
                    set(this, 'title', undefined);
                    set(this, 'note', undefined);
                    set(this, 'creatingNote', false);
                });
            } else {
                set(this, 'title', undefined);
                set(this, 'note', undefined);
                set(this, 'creatingNote', false);
                get(this, 'errorService').setError('Empty notes and/or titles are not allowed!');
            }
        },

        deleteNote(note) {
            if (!Ember.isEmpty(note)) {
                Ember.$.ajax({
                    type: 'DELETE',
                    url: `/notes/${note.id}`
                }).done(() => {
                    this.send('refreshModel');
                }).fail(error => {
                    get(this, 'errorService').setError(error);
                });
            }
        }
    }
});
