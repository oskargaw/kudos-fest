import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

import Menu from "./components/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GiveKudos from "./pages/GiveKudos";
import MyKudoses from "./pages/MyKudoses";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/give-kudos" component={GiveKudos} />
        <Route exact path="/my-kudoses" component={MyKudoses} />
      </Router>
    </AuthProvider>
  );
}

export default App;
