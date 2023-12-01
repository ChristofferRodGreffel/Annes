import React, { useRef } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomButton from "../../components/CustomButton";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const userSignIn = () => {
    const userEmail = formRef.current.email.value;
    const userPassword = formRef.current.password.value;

    signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        navigate("/bestil-online");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleShowPassword = () => {
    const passwordInput = formRef.current.password;
    const eyeIcon = document.querySelector("#eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.setAttribute("class", "fa-solid fa-eye absolute right-5 top-3.5");
    } else {
      passwordInput.type = "password";
      eyeIcon.setAttribute("class", "fa-solid fa-eye-slash absolute right-5 top-3.5");
    }
  };

  return (
    <>
      <CustomerHeader nav={false} />
      <PageWrapperContainer>
        <div className="mt-40">
          <div className="mb-5">
            <h1 className="font-bold text-3xl">Velkommen tilbage</h1>
            <p className="text-left">Her kan du logge ind</p>
          </div>
          <form ref={formRef} onSubmit={userSignIn} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Adgangskode</label>
              <div className="flex flex-col relative">
                <input type="password" name="password" />
                <i
                  id="eyeIcon"
                  onClick={handleShowPassword}
                  className="fa-solid fa-eye-slash absolute right-5 top-3.5"
                ></i>
              </div>
            </div>
            <CustomButton title="Log ind" function={userSignIn} />
          </form>
        </div>
        <p className="text-center absolute bottom-10 w-full">
          Har du ikke en bruger?{" "}
          <Link className="underline" to={"/opret-profil"}>
            Opret dig her
          </Link>
        </p>
      </PageWrapperContainer>
    </>
  );
};

export default SignIn;
