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
      bgColor="bg-red-500" // Default background color
      textColor="text-white" // Default text color
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
