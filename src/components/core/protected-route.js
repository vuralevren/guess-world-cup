import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function Private({ children, mustHasLeague }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user === null) {
      // Navigate to sign in, if the user has not session
      navigate("/sign-in");
    } else if (mustHasLeague && !user.hasLeague) {
      navigate("/new-league");
    }
  }, [user]);

  return <div>{user ? children : <div />}</div>;
}

export function Public({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      // Navigate to sign in, if the user has not session
      navigate("/");
    }
  }, [user]);

  return <div>{user ? <div /> : children}</div>;
}
