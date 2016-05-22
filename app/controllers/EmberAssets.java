package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;

import javax.inject.Inject;
import java.io.File;

/**
 * @author Scott Faria
 */
public final class EmberAssets extends Controller {

    // -------------------- Constructors --------------------

    @Inject
    public EmberAssets() {}

    // -------------------- Controller Methods --------------------

    public final Result at(String file) {
        File content = new File("client/dist/" + file);
        if (content.exists()) {
            return Results.ok(content, true);
        }
        return Results.notFound();
    }

}
