import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../utilities/Account";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();
  const { getSession, logout } = useContext(AccountContext);

  const loggedIn = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log("Session data : ", session);
    })();
  }, []);

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div>HOME</div>
      <div>{loggedIn && "Logged In"}</div>
      {loggedIn ? (
        <Button variant="secondary" onClick={logoutHandler}>
          Logout
        </Button>
      ) : (
        <>
          <div>Please log in</div>
          <button onClick={loginHandler}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
