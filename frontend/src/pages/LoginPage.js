import React from "react";
import AuthBlock from "../components/Auth/AuthBlock";
import AuthTitle from "../components/Auth/AuthTitle";
import LoginForm from "../containers/Auth/LoginForm";
import Footer from "../components/Auth/Footer";

const LoginPage = () => {
  return (
    <AuthBlock>
      <AuthTitle title="가볍게 상대방과 하는 채팅"></AuthTitle>
      <LoginForm />
      <hr />
      <Footer />
    </AuthBlock>
  );
};

export default LoginPage;
