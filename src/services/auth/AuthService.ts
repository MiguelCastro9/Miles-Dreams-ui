import http from "@/services/http";
import { Login } from "@/types/auth/Login";
import { User } from "@/types/auth/User";

export class AuthService {
  public async loginService(login: Login) {
    try {
      const res = await http.post("/auth/login", login);
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public async registerService(params: User) {
    try {
      const res = await http.post("/auth/register", params);
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public async loadRpaUserService(email: string): Promise<User> {
    try {
      const res = await http.get("/auth/find-rpa-user", {
        params: { email },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  public async loadUserService(email: string): Promise<User> {
    try {
      const res = await http.get("/auth/find-user", {
        params: { email },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}
