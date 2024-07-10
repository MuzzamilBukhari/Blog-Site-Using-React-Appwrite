import { RootState } from "../store/store";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({
  children,
  authentication,
}: {
  children: ReactNode;
  authentication: boolean;
}) => {
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authStatus, authentication]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
};

export default AuthLayout;
