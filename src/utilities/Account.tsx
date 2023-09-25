import { ReactNode, createContext } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

import UserPool from "../UserPool";

interface UserContextType {
  authenticate: (email: string, password: string) => Promise<any>;
  getSession: () => Promise<any>;
  logout: () => void;
}

const contextDefaultValues: UserContextType = {
  authenticate: async () => {},
  getSession: async () => {},
  logout: () => {},
};

interface Props {
  children?: ReactNode;
}

const AccountContext = createContext<UserContextType>(contextDefaultValues);

const Account = ({ children, ...props }: Props) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(
          (err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
              reject();
            } else {
              resolve(session);
            }
          }
        );
      } else {
        reject();
      }
    });
  };

  const authenticate = async (email: string, password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: " + data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: " + err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: " + data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    console.log("User Data : ", user);
    if (user) {
      user.signOut();
      localStorage.removeItem("token");
    } else {
      console.log("User not detected");
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
