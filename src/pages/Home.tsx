import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../utilities/Account";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const { getSession, logout, getCurrentUser } = useContext(AccountContext);

  const user = getCurrentUser();
  console.log(user);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log("Session data : ", session);
      setStatus(true);
    })();
  }, []);

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <div>HOME</div>
      <div>{status && "Logged In"}</div>
      <Button variant="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
