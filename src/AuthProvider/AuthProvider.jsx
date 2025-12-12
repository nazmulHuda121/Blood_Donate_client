import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const res = await fetch('/http://localhost:5000/login', {
      method: 'POST',
      headers: { 'content-type': 'appliocation/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
  };

  const userInfo = { login, logout, user, loading };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
