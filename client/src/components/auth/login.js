import { useEffect } from "react";
import { useSignin } from "../../hooks/useSignin";

const Login = () => {
  const { signin, error, isLoading } = useSignin();

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const bodyObj = { token: response.credential };
    const id_token = response.credential;
    signin(id_token);
  };
  useEffect(() => {
    console.log(process.env.REACT_APP_CLIENT_ID);
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );

    //google.accounts.id.prompt();
  }, []);

  return <div id="buttonDiv"></div>;
};

export default Login;
