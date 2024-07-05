import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  account: Account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteProjectUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  createAccount = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.log("Error in auth service : ", error);
    }
  };

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in auth service : ", error);
    }
  };

  logout = async () => {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in auth service : ", error);
    }
  };

  getCurrentUser = async () => {};
}

const authService = new AuthService();

export default authService;
