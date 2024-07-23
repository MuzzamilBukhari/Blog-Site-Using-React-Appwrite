import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "./";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

const Header = () => {
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true,
    },
    {
      name: "Signup",
      slug: "/signup",
      isActive: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      isActive: !authStatus,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      isActive: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      isActive: authStatus,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-darkBlue via-green to-purple shadow-md py-4">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <ul className="flex space-x-6 gap-3 mr-4 justify-center items-center">
            {navItems.map(
              (item) =>
                item.isActive && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-lightBlue font-semibold hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
