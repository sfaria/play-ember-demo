package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Note;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.NotesService;
import services.UserManagementService;

import javax.inject.Inject;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static java.util.concurrent.CompletableFuture.*;

/**
 * @author Scott Faria <scott.faria@gmail.com>
 */
public class Notes extends Controller {

    // -------------------- Private Variables --------------------

    private final NotesService notesService;
    private final UserManagementService userManagementService;

    // -------------------- Constructor --------------------

    @Inject
    public Notes(NotesService notesService, UserManagementService userManagementService) {
        this.notesService = notesService;
        this.userManagementService = userManagementService;
    }

    // -------------------- Controller Methods --------------------

    public CompletableFuture<Result> getNotes() {
        String username = session().get("user");
        if (!userManagementService.isLoggedIn(username)) {
            return completedFuture(forbidden());
        }
        return supplyAsync(() -> {
            List<Note> notes = notesService.getNotesForUser(username);
            return Json.toJson(notes);
        }).thenApply(result -> ok(result, "UTF-8"));
    }

    public CompletableFuture<Result> deleteNote(String id) {
        String username = session().get("user");
        if (!userManagementService.isLoggedIn(username)) {
            return completedFuture(forbidden());
        }
        return supplyAsync(() -> {
            notesService.deleteNoteForUser(username, id);
            return null;
        }).thenApply(result -> ok());
    }

    public CompletableFuture<Result> addNote() {
        String username = session().get("user");
        if (!userManagementService.isLoggedIn(username)) {
            return completedFuture(forbidden());
        }
        JsonNode request = request().body().asJson();
        if (request == null) {
            return completedFuture(badRequest("Failed to add note for the current user."));
        }
        Note note = Json.fromJson(request, Note.class);
        return supplyAsync(() -> {
            notesService.addNoteForUser(username, note);
            return null;
        }).thenApply(result -> ok());
    }

}
