import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AccountContext } from "../utilities/Account";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import FormInput from "../components/FormInput";

interface Values {
  [key: string]: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const signUpClickHandler = () => {
    navigate("/register");
  };

  const onSubmitHandler = async (values: Values) => {
    const { email, password } = values;
    try {
      const data = await authenticate(email, password);
      console.log("Login data : ", data);
      const jwtToken = data.accessToken.jwtToken as string;
      localStorage.setItem("token", jwtToken);
      navigate("/home");
    } catch (err) {
      console.log("Login error : ", err);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="login__image__container">
          <div>E-Commerce POC</div>
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            alt="login-img"
          />
        </div>
        <div className="login-container">
          <div>Login</div>
          <FormInput
            onSubmit={onSubmitHandler}
            initialValues={{ email: "", password: "" }}
          >
            <TextInput name="email" title="Email" type="email" />
            <TextInput name="password" title="Password" type="password" />
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div>Forgot password?</div>
          </FormInput>
          <div>Don't have an account?</div>
          <Button variant="secondary" onClick={signUpClickHandler}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
