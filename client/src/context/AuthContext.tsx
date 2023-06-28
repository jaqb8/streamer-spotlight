import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AuthService from "../services/auth.service";
import jwtDecode from "jwt-decode";
import { User } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
  });

  useEffect(() => {
    const storedToken = AuthService.initializeAuthFromStorage();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      const decodedToken: { id: string; username: string } =
        jwtDecode(storedToken);
      setUser({
        id: decodedToken.id,
        username: decodedToken.username,
      });
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const newToken = await AuthService.login(username, password);
      setToken(newToken);
      setIsAuthenticated(true);
      const decodedToken: { id: string; username: string } =
        jwtDecode(newToken);
      setUser({
        id: decodedToken.id,
        username: decodedToken.username,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message.toString() || "Something went wrong."
        );
      }
    }
  };

  const register = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      await AuthService.register(username, password);
      toast.success("Registered successfully! Please log in.");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message.join(", ") || "Something went wrong."
        );
      }
    }
  };

  const logout = (): void => {
    AuthService.logout();
    setToken(null);
    setIsAuthenticated(false);
    setUser({
      id: "",
      username: "",
    });
    toast("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
