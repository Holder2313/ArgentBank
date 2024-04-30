import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import { PrivateRoute } from "./PrivateRoute";
import { restoreSession } from "./features/loginUser";
import { useDispatch } from "react-redux"
import { useEffect } from "react";





function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());

  }, [dispatch]);

  return (
    <div className=" main-container" >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/user/" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
            
          } />

        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;

