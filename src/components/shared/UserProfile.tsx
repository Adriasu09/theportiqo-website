import { useAuth } from "@/src/contexts/AuthContext";

export const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-info">
        {user.picture && (
          <img src={user.picture} alt={user.name} className="user-avatar" />
        )}
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <button onClick={signOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
};
