import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import User from "./pages/User";


function App() {
  return (
    <div className=" main-container" >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin/" element={<SignIn />} />
          <Route path="/user/" element={<User />} />

        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
