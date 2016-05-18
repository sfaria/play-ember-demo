package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

import javax.inject.Inject;

public final class Application extends Controller {

    @Inject
    public Application() {}

    public Result index() {
        return ok(index.render("Your new application is ready."));
    }

}
