package controllers;

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

    public Result index() {
        return ok();
    }

}
