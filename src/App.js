import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import { PrivateRoute } from "./PrivateRoute";
import { restoreSession } from "./features/loginUser";
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { PublicRoute } from "./PublicRoute";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(restoreSession(token));
    }
  }, [dispatch]);


  return ( 
    <div className=" main-container" >
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />

          <Route path="/user/" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
            
          } />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>

  ); 
}

export default App;

