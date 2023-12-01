import React, { useRef } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomButton from "../../components/CustomButton";
import { FIREBASE_AUTH } from "../../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

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

  const userSignUp = () => {
    const userEmail = formRef.current.email.value;
    const userPassword = formRef.current.password.value;

    createUserWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigate("/log-ind");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <>
      <CustomerHeader nav={false} />
      <PageWrapperContainer>
        <div className="mt-14">
          <div className="mb-5">
            <h1 className="font-bold text-3xl">Tak fordi du er her! </h1>
            <p className="text-left">Her kan du oprette en konto</p>
          </div>
          <form ref={formRef} onSubmit={userSignUp} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="email">Dit navn</label>
              <input type="text" name="name" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Dit telefonnr.</label>
              <input type="number" name="phone" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Din email*</label>
              <input type="email" name="email" />
              <p className="italic text-sm">*Du modtager en mail mod verifikation</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Adgangskode**</label>
              <div className="flex flex-col relative">
                <input type="password" name="password" />
                <i
                  id="eyeIcon"
                  onClick={handleShowPassword}
                  className="fa-solid fa-eye-slash absolute right-5 top-3.5"
                ></i>
              </div>
              <p className="italic text-sm">**Skal være mindst (6) karakterer</p>
            </div>
            <CustomButton title="Opret profil" function={userSignUp} s />
          </form>
        </div>
        <p className="text-center mt-10 w-full">
          Har du allerede en profil?{" "}
          <Link className="underline" to={"/log-ind"}>
            Log ind her
          </Link>
        </p>
      </PageWrapperContainer>
    </>
  );
};

export default SignUp;
