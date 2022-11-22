import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useQuery from "../helpers/useQuery";
import { authActions } from "../redux/auth/authSlice";

export default function AuthRedirect() {
  const accessToken = useQuery("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleToken = () => {
    dispatch(
      authActions.signInWithTokenRequest({
        accessToken,
        onSuccess: () => {
          navigate("/");
        },
        onFailure: () => {
          navigate(user ? "/" : "/sign-in");
        },
      })
    );
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div>
      <div>Redirecting...</div>
    </div>
  );
}
