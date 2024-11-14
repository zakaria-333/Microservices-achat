import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from 'react';
import AuthContext from './authRouter/AuthContext';
import Layout from './layouts/Layout';
import ProtectedRoute from './authRouter/ProtectedRoute';
import HomeDemandeur from './pages/demandeur/HomeDemandeur';
import Demande from './pages/demandeur/Demande';
import SignIn from './pages/SignIn';
import Logout from './components/Logout';
import Unauthorized from './pages/Unauthorized';
import Loading from './components/Loading';
import Mdp from './pages/Mdp';
import Home from './pages/admin/Home';
import User from './pages/admin/User';
import Filiale from './pages/admin/Filiale';
import Site from './pages/admin/Site';
import DemandeSite from './pages/directeurSite/DemandeSite';
import Category from './pages/achat/Category';
import SubCategory from './pages/achat/SubCategory';
import Fournisseur from './pages/achat/Fournisseur';
import Profile from './pages/Profile';
import HomeSite from './pages/directeurSite/HomeSite';
import HomeAchat from './pages/achat/HomeAchat';
import DemandeAchat from './pages/achat/DemandeAchat';
import BudgetAdjustment from './pages/daf/BudgetAdjustment';
import HistroriqueAdjustment from './pages/daf/HistroriqueAdjustment';
import DafDemande from './pages/daf/DafDemande';
import HomeDaf from './pages/daf/HomeDaf';
import HomeDg from './pages/dg/HomeDg';
import DgDemande from './pages/dg/DgDemande';


const App = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Loading />
  }

  console.log(user);

  const routes = createRoutesFromElements(
    <>
      <Route path="/demandeur" element={<ProtectedRoute allowedRoles={['ROLE_DEMANDEUR']} />}>
        <Route element={<Layout />}>
          <Route index element={<HomeDemandeur />} />
          <Route path="demande" element={<Demande />} />
        </Route>
      </Route>

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='user' element={<User />} />
          <Route path='site' element={<Site />} />
          <Route path='filiale' element={<Filiale />} />
        </Route>
      </Route>

      <Route path="/ds" element={<ProtectedRoute allowedRoles={['ROLE_DS']} />}>
        <Route element={<Layout />}>
          <Route index element={<HomeSite />} />
          <Route path='demandes' element={<DemandeSite />} />
        </Route>
      </Route>

      <Route path="/daf" element={<ProtectedRoute allowedRoles={['ROLE_DAF']} />}>
        <Route element={<Layout />}>
        <Route index element={<HomeDaf/>} />
          <Route path="budget-ajustement" element={<BudgetAdjustment />} />
          <Route path="historique-ajustement" element={<HistroriqueAdjustment />} />
          <Route path="demandes" element={<DafDemande />} />
        </Route>
      </Route>

      <Route path="/achat" element={<ProtectedRoute allowedRoles={['ROLE_ACHAT']} />}>
        <Route element={<Layout />}>

          <Route index element={<HomeAchat />} />
          <Route path='categorie' element={<Category />} />
          <Route path='sub-category' element={<SubCategory />} />
          <Route path='fournisseur' element={<Fournisseur />} />
          <Route path='demandeAchat' element={<DemandeAchat />} />

        </Route>
      </Route>

      <Route path="/dg" element={<ProtectedRoute allowedRoles={['ROLE_DG']} />}>
        <Route element={<Layout />}>
          <Route index element={<HomeDg />} />
          <Route path='demandes' element={<DgDemande />} />
        </Route>
      </Route>

      {!user ? (
        <>
          <Route path='/login' element={<SignIn />} />
          <Route path='/' element={<SignIn />} />
          <Route path='/reset-password' element={<Mdp />} />
        </>
      ) : (
        <>
          <Route path="/logout" element={<Logout />} />
          <Route element={<Layout />}>
            <Route path='/profil' element={<Profile />} />
          </Route>
        </>
      )}


      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path="*" element={<Navigate to={`/${user?.role.nom.replace("ROLE_", "").toLowerCase()}`} />} />
    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='bottom-right' />
    </>
  );
}

export default App;