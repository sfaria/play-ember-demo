package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * @author Scott Faria
 */
public final class Application extends Controller {

    // -------------------- Constructors --------------------

    @Inject
    public Application() {}

    // -------------------- Controller Methods --------------------

    public Result login() {
        JsonNode request = request().body().asJson();
        if (request != null) {
            String username = request.findPath("username").textValue().toLowerCase();
            String password = request.findPath("password").textValue();
            if (username.equals("scott.faria@gmail.com") && password.equals("test")) {
                session().clear();
                session().put("user", username);
                return ok(username);
            }
        }
        return badRequest("Failed to login.");
    }

    public Result validate() {
        JsonNode request = request().body().asJson();
        if (request != null) {
            String username = request.findPath("username").textValue().toLowerCase();
            if (session().isEmpty() || !session().get("user").equals(username)) {
                return badRequest("No session");
            } else {
                return ok(session().get("user"));
            }
        }
        return badRequest("Failed to validate session.");
    }

    public Result logout() {
        JsonNode request = request().body().asJson();
        if (request != null) {
            String username = request.findPath("username").textValue().toLowerCase();
            if (session().get("user").equals(username)) {
                session().clear();
                return ok();
            }
        }
        return badRequest("Failed to logout user.");
    }

}
