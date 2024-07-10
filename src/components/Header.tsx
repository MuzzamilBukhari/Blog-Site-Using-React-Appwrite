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
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto space-x-4">
            {navItems.map((item) =>
              item.isActive ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
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
