import { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function Private({ children, mustHasLeague }) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const hasLeague = user?.leagueSlugs && !_.isEmpty(user?.leagueSlugs);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    } else if (mustHasLeague && !hasLeague) {
      navigate("/");
    }
  }, [user]);

  return <div>{user ? children : <div />}</div>;
}

export function Public({ children }) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const hasLeague = user?.leagueSlugs && !_.isEmpty(user?.leagueSlugs);

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate(hasLeague ? `/league/${_.first(user?.leagueSlugs)}` : "/");
    }
  }, [user]);

  return <div>{user ? <div /> : children}</div>;
}
