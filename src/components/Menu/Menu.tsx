import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";

const Menu = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/give-kudos">GiveKudos </Link>
      <Link to="/my-kudoses">MyKudoses </Link>
      {user ? (
        <Link to="/login" onClick={logout}>
          Logout
        </Link>
      ) : (
        <>
          <Link to="/login">Login </Link>
          <Link to="/register">Register </Link>
        </>
      )}
    </div>
  );
};

export default Menu;
