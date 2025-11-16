import { Outlet, Link } from "@tanstack/react-router";
import { GoogleOneTap } from "./GoogleOneTap";
import { useAuth } from "@/src/contexts/AuthContext";

export function RootLayout() {
  const { isAuthenticated, user, signOut } = useAuth();

  // Debug localStorage user data
  console.log("🔍 LocalStorage user:", localStorage.getItem("user"));
  console.log("🔍 Context user:", user);

  return (
    <div className="app-container">
      {!user && <GoogleOneTap />}
      <header className="app-header">
        <div className="header-content">
          <h2>ThePortiqo</h2>

          <nav className="main-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/portfolio" className="nav-link">
              Portfolio
            </Link>
            {isAuthenticated() && (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
          </nav>

          <div className="auth-section">
            {user ? (
              <div className="gap-4 flex items-center">
                <span className="text-white">
                  Hello,{" "}
                  {(() => {
                    console.log("🔍 Current user in header:", user);
                    return user?.name?.split(" ")[0] || "User";
                  })()}
                  !
                </span>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">
                  Login
                </Link>
                <Link to="/register" className="signup-btn">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2025 ThePortiqo - Built with React and TanStack</p>
        </div>
      </footer>
    </div>
  );
}
