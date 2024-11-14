import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [demandesCountSite, setDemandesCountSite] = useState(0);
  const [demandesCountAchat, setDemandesCountAchat] = useState(0);
   
        const fetchDemandesCd = async () => {
            try {
                const response = await axios.get(`/api/demande/demandeBySiteEnCours/${user.site.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (Array.isArray(response.data)) {
                    const descriptions = [];

                    // Utilisation de la boucle for
                    for (let i = 0; i < response.data.length; i++) {
                        const demande = response.data[i];
                        if (demande.description) {
                            descriptions.push(demande.description);
                        }
                    }

                    // Calculer le nombre de descriptions
                    setDemandesCountSite(descriptions.length);
                } else {
                    console.error('Response data is not an array:', response.data);
                }

            } catch (error) {
                console.error('Failed to fetch demandes:', error);
            }
        };



        const fetchDemandesAchat = async () => {
          try {
              const response = await axios.get(`/api/demande/findByConfirmationCdAndConfirmationAchat`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              if (Array.isArray(response.data)) {
                  const descriptions = [];

                  // Utilisation de la boucle for
                  for (let i = 0; i < response.data.length; i++) {
                      const demande = response.data[i];
                      if (demande.description) {
                          descriptions.push(demande.description);
                      }
                  }

                  // Calculer le nombre de descriptions
                  setDemandesCountAchat(descriptions.length);
              } else {
                  console.error('Response data is not an array:', response.data);
              }

          } catch (error) {
              console.error('Failed to fetch demandes:', error);
          }
      };

  useEffect(() => {
    // Récupérer les données du localStorage lors du chargement initial
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, [role]);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    setRole(user.role.nom)
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const update = (updatedUser) => {
    setUser(updatedUser);
    setRole(updatedUser.role.nom);
    
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login,update, logout, role,demandesCountSite,fetchDemandesCd,fetchDemandesAchat, demandesCountAchat}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
