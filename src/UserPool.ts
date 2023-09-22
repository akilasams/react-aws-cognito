import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_Iuhd7dRHF",
  ClientId: "6a18rn1rptce7hcepha38qvfde",
};

export default new CognitoUserPool(poolData);
