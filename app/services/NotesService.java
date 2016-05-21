package services;

import models.Note;

import javax.inject.Singleton;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Scott Faria <scott.faria@gmail.com>
 */
@Singleton
public final class NotesService {

    // -------------------- Private Variables --------------------

    private final Map<String, Map<String, Note>> notes = new HashMap<>();

    // -------------------- Public Methods --------------------

    public final List<Note> getNotesForUser(String username) {
        Map<String, Note> notes = this.notes.get(username);
        if (notes == null) {
            return Collections.emptyList();
        }
        return notes.values().stream().collect(Collectors.toList());
    }

    public final void addNoteForUser(String username, Note note) {
        Map<String, Note> notes = this.notes.get(username);
        if (notes == null) {
            notes = new TreeMap<>();
            this.notes.put(username, notes);
        }
        notes.put(note.getId(), note);
    }

    public final void deleteNoteForUser(String username, String id) {
        Map<String, Note> notes = this.notes.get(username);
        if (notes != null) {
            notes.remove(id);
        }
    }


}
