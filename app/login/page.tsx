import { LoginForm } from "@/widgets/LoginForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login",
}

const LoginPage = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;
