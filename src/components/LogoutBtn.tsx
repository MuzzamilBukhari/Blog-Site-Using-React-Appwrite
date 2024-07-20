import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Button from "./Button";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
  };
  return (
    <Button
      type="button"
      className="bg-lightBlue hover:bg-white hover:text-purple font-semibold py-1.5 px-4 rounded-full transition-colors duration-300"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
