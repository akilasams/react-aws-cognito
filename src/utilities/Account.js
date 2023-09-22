import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import UserPool from "../UserPool";

// interface User {
//   email: string;
//   password: string;
// }

// interface UserContextType {
//   user: User;
//   saveUser: (user: User) => void;
//   updateUser: (user: User) => void;
// }

const AccountContext = createContext();

const Account = ({ children }) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (email, password) => {
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
    } else {
      console.log("User not detected");
    }
  };

  const getCurrentUser = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser().getUserData();
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  };

  return (
    <AccountContext.Provider
      value={{ authenticate, getSession, logout, getCurrentUser }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
