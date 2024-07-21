import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={600}>
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  ) : null;
}

export default App;
