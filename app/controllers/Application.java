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
                session().put("connected", "true");
                return ok(username);
            }
        }
        return badRequest("Failed to login.");
    }

    public Result validate() {
        if (session().isEmpty()) {
            return badRequest("No session");
        } else {
            return ok();
        }
    }

    public Result logout() {
        session().clear();
        return ok();
    }

}
