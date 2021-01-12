import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

interface IUserData {
  id: string;
  token: string;
}

interface IToken {
  id: string;
  email: string;
  // "issued at" -> time when the token was issued
  iat: number;
  // "expiration date" -> time when the token expires
  exp: number;
}

interface IAuthContext {
  user: IToken | null;
  login: (userData: IUserData) => void;
  logout: () => void;
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

let initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode<IToken>(
    localStorage.getItem("jwtToken") || ""
  );

  //   token's expiration date - 1 week
  if (decodedToken.exp * 168000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState = { ...initialState, user: decodedToken as any };
  }
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: (userData: IUserData) => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: IUserData) => {
    localStorage.setItem("jwtToken", userData.token);

    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");

    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
