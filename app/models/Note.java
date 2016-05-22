package models;

import tyrex.services.UUID;

import java.util.Date;

/**
 * @author Scott Faria <scott.faria@gmail.com>
 */
public class Note implements Comparable<Note> {

    // -------------------- Private Variables --------------------

    private String id;
    private String title;
    private String body;
    private Date createdOn;

    // -------------------- Constructors --------------------

    public Note(String title, String body, Date createdOn) {
        this.id = UUID.create();
        this.title = title;
        this.body = body;
        this.createdOn = createdOn;
    }

    public Note(String title, String body) {
        this(title, body, new Date());
    }

    public Note() {
        this.id = UUID.create();
        this.createdOn = new Date();
    }

    // -------------------- Public Methods --------------------

    public final String getId() {
        return id;
    }

    public final String getTitle() {
        return title;
    }

    public final String getBody() {
        return body;
    }

    public final Date createdOn() {
        return createdOn;
    }

    // -------------------- Overridden Methods --------------------

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return id.equals(note.id);
    }

    @Override
    public final int hashCode() {
        return id.hashCode();
    }

    @Override
    public final int compareTo(Note o) {
        return createdOn.compareTo(o.createdOn);
    }
}
