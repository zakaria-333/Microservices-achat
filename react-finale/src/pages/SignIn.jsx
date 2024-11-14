import React, { useContext, useState } from 'react';
// @ts-ignore
import BugshanLogo from '../assets/images/bugshan_logo.png';
import { FaUser, FaEye } from 'react-icons/fa';
// @ts-ignore
import Background from '../assets/images/background.jpg';
import AuthContext from '../authRouter/AuthContext';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();



  const submitForm = async (e) => {
    e.preventDefault()
    const authRequest = {
      username,
      mdp: password
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authRequest)
      })
      const data = await res.json()
      login(data.user, data.token)
      toast.success("Connexion réussie")
      const url = data.user.role.nom.replace("ROLE_", "").toLowerCase();
      navigate("/" + url);
    } catch (error) {
      toast.error("Accès invalide")
    }
  }


  return (
    <div className="flex flex-col gap-2 bg-slate-100 h-screen w-screen items-center justify-center" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45"></div>
      <div className="flex md:flex-row justify-around w-3/4 h-5/6 bg-white border border-gray-300 shadow-md rounded-2xl relative z-10">
        <div className="px-5 py-2 border-r-2 w-1/2">
          <img src={BugshanLogo} className="w-full h-full" alt="logo" />
        </div>
        <div className="w-1/2 p-10">
          <h1 className="text-center font-bold text-3xl mb-11">Se connecter</h1>
          <form className="max-w-sm mx-auto px-5 mb-3 flex flex-col" onSubmit={submitForm}>
            <div className="mb-5 relative">
              <label htmlFor="usename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de utilisateur</label>
              <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer le nom d'utilisateur" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <FaUser className="absolute right-4 top-10 text-gray-400" />
            </div>
            <div className="mb-5 relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
              <input type={showPassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer le mot de passe" required
                autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <FaEye
                className="absolute right-4 top-10 text-gray-400 cursor-pointer hover:text-gray-700"
                onClick={() => setShowPassword(prevState => !prevState)}
              />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">S'authentifier</button>
          </form>
          <p className="text-center text-gray-400">Mot de passe oublié? <span className="text-blue-700 cursor-pointer"><Link to='/reset-password'>Réinitialiser le mot de passe</Link></span></p>
        </div>
      </div>
      <p className="text-sm text-white z-10">
        &copy; {new Date().getFullYear()} Bugshan Automotive Group. Tous droits réservés.
      </p>
    </div>
  );
}

export default SignIn;

