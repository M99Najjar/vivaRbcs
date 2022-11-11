import Login from "../components/auth/login";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="bg-white  py-8 px-12 rounded-2xl border-2 border-gray-400">
        <h1 className="text-2xl">إختر طريقة لتسجيل الدخول</h1>

        <div className="mt-12">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
