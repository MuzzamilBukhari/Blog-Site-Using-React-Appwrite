import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { Logo, Input } from "./";
import Button from "./Button";

interface SigninFormData {
  email: string;
  name: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<SigninFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data: SigninFormData) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      console.log("error in signup comp ", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen -mt-8 -mb-8 py-4 bg-gradient-to-r from-darkBlue via-green to-purple">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-darkBlue/10">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[120px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-darkBlue mb-4">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-purple mb-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple hover:text-darkBlue transition-all duration-200"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-4">
          <div className="space-y-5">
            <Input
              label="Email : "
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full py-3 bg-green text-white rounded-full hover:bg-darkBlue transition duration-200"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
