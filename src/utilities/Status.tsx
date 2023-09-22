import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
  const [status, setStatus] = useState(false);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log("Session data : ", session);
      setStatus(true);
    })();
  }, []);

  return <div>{status && "Logged In"}</div>;
};

export default Status;
