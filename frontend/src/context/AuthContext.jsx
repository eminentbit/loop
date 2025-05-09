import { createContext, useState, useContext, useEffect } from "react";
import { currentUser, mockUsers } from "../data/jobmockData";

const AuthContext = createContext({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  followUser: () => {},
  unfollowUser: () => {},
  isFollowing: () => false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser != "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const login = async (email, password) => {
    // Mock login - in a real app, this would make an API call
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }

    AuthProvider.propTypes = {
      children: PropTypes.node.isRequired,
    };
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const followUser = (userId) => {
    if (!user) return;

    if (!user.following.includes(userId)) {
      setUser({
        ...user,
        following: [...user.following, userId],
      });
    }
  };

  const unfollowUser = (userId) => {
    if (!user) return;

    setUser({
      ...user,
      following: user.following.filter((id) => id !== userId),
    });
  };

  const isFollowing = (userId) => {
    if (!user) return false;
    return user.following.includes(userId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        followUser,
        unfollowUser,
        isFollowing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
