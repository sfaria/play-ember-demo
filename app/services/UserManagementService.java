package services;

import javax.inject.Singleton;
import java.util.*;

/**
 * @author Scott Faria
 */
@Singleton
public final class UserManagementService {

    // -------------------- Private Statics --------------------

    private static final Map<String, String> ALLOWED_USERS;
    static {
        Map<String, String> map = new HashMap<>();
        map.put("scott.faria@gmail.com", "scott");
        ALLOWED_USERS = Collections.unmodifiableMap(map);
    }

    // -------------------- Private Variables --------------------

    private final Set<String> activeUsers = new HashSet<>();

    // -------------------- Public Methods --------------------

    public final boolean isLoggedIn(String user) {
        return activeUsers.contains(user);
    }

    public final boolean login(String username, String password) {
        if (username != null) {
            username = username.toLowerCase();
            if (activeUsers.contains(username)) {
                return true;
            }

            if (password != null && password.equals(ALLOWED_USERS.get(username))) {
                activeUsers.add(username);
                return true;
            }
        }
        return false;
    }

    public final void logout(String username) {
        activeUsers.remove(username);
    }

}
