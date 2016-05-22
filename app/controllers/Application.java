package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.Controller;
import play.mvc.Result;
import services.UserManagementService;

import javax.inject.Inject;

/**
 * @author Scott Faria
 */
@SuppressWarnings("unused")
public final class Application extends Controller {

    // -------------------- Private Variables --------------------

    private final UserManagementService userManagementService;

    // -------------------- Constructors --------------------

    @Inject
    public Application(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    // -------------------- Controller Methods --------------------

    public final Result login() {
        JsonNode request = request().body().asJson();
        if (request != null) {
            String username = request.findPath("username").textValue();
            String password = request.findPath("password").textValue();
            if (userManagementService.login(username, password)) {
                session().clear();
                session().put("user", username);
                return noContent();
            }
        }
        return badRequest("Failed to login.");
    }

    public final Result validate() {
        String username = session().get("user");
        if (userManagementService.isLoggedIn(username)) {
            return noContent();
        }
        return badRequest("Failed to validate session.");
    }

    public final Result logout() {
        String username = session().get("user");
        userManagementService.logout(username);
        session().clear();
        return noContent();
    }

}
