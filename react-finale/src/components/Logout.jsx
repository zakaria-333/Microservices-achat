import React, { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../authRouter/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()
  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login');
    };

    performLogout();
  }, []);
  toast.info("Déconnexion réussie");
  return null;
};

export default Logout
