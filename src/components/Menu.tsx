import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/my-kudoses">MyKudoses </Link>
      <Link to="/login">Login </Link>
      <Link to="/register">Register </Link>
      <Link to="/">Logout </Link>
    </div>
  );
};

export default Menu;
