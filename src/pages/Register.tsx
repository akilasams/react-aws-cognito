import { CognitoUserAttribute } from "amazon-cognito-identity-js";

import Button from "../components/Button";
import TextInput from "../components/TextInput";

import FormInput from "../components/FormInput";
import UserPool from "../UserPool";

interface Values {
  [key: string]: string;
}

const Register = () => {
  const onSubmitHandler = (values: Values) => {
    const { fullName, email, password } = values;
    // alert(JSON.stringify(values, null, 2));
    // console.log(`Values : ${JSON.stringify(values)}`);

    const userAttributes = new CognitoUserAttribute({
      Name: "name",
      Value: fullName,
    });

    UserPool.signUp(email, password, [userAttributes], [], (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };

  return (
    <div className="container">
      {/* <div className="inner-container"> */}
      <div>Sign Up</div>
      <FormInput
        onSubmit={onSubmitHandler}
        initialValues={{ fullName: "", email: "", password: "" }}
      >
        <TextInput name="fullName" title="Full Name" />
        <TextInput name="email" title="Email" type="email" />
        <TextInput name="password" title="Password" type="password" />
        <TextInput
          name="confirmPassword"
          title="Confirm Password"
          type="password"
        />
        <Button type="submit" variant="primary">
          Create Account
        </Button>
      </FormInput>
      {/* </div> */}
    </div>
  );
};

export default Register;
