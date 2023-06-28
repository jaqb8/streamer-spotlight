import { AxiosResponse } from "axios";
import axios from "../config/axios.config";

class AuthService {
  async login(username: string, password: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.post("/auth/signin", {
        username,
        password,
      });
      const token: string = response.data.accessToken;

      localStorage.setItem("accessToken", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return token;
    } catch (error) {
      console.error("Failed to log in", error);
      throw error;
    }
  }

  async register(username: string, password: string): Promise<void> {
    await axios.post("/auth/signup", {
      username,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  }

  initializeAuthFromStorage(): string | null {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      return storedToken;
    }
    return null;
  }
}

const auth = new AuthService();
export default auth;
