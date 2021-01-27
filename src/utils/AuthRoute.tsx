import { useContext } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";

import { AuthContext } from "../context/authContext";

interface IAuthRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const AuthRoute = ({ component: Component, ...rest }: IAuthRouteProps) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
