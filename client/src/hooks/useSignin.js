import { useState } from "react";
import { api } from "../components/api";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoding] = useState(null);
  const { dispach } = useAuthContext();

  const signin = async (id_token) => {
    setIsLoding(true);
    setError(null);

    const response = await api.post("/api/users/login", {
      id_token,
    });

    if (response.status !== 200) {
      setIsLoding(false);
      setError(response.error);
      console.log(response.error);
    }
    if (response.status === 200) {
      //save username and photo
      localStorage.setItem("user", JSON.stringify(response.data));

      //update auth context
      dispach({ type: "LOGIN", payload: response.data });
      setIsLoding(false);
    }
  };
  return { signin, isLoading, error };
};
