import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const userInfo = {};
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
