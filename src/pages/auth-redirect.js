import { useEffect } from "react";
import _ from "lodash";
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
        onSuccess: (signedUser) => {
          const hasLeague =
            signedUser?.leagueSlugs && !_.isEmpty(signedUser?.leagueSlugs);
          navigate(
            hasLeague ? `/league/${_.first(signedUser?.leagueSlugs)}` : "/"
          );
        },
        onFailure: () => {
          if (user) {
            const hasLeague =
              user?.leagueSlugs && !_.isEmpty(user?.leagueSlugs);
            navigate(hasLeague ? `/league/${_.first(user?.leagueSlugs)}` : "/");
          } else {
            navigate("/sign-in");
          }
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
