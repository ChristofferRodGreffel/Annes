import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FIREBASE_AUTH } from "../../firebase-config";

const CustomerNavigation = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setLoggedIn(true);
        // ...
      } else {
        // User is signed out
        // ...
        setLoggedIn(false);
      }
    });
  }, []);

  const handleCloseNav = () => {
    const customerNav = document.querySelector("#customerNav");
    customerNav.style.left = "-80%";
  };

  return (
    <nav
      id="customerNav"
      className="fixed top-0 left-[-80%] bg-primary h-screen w-4/5 text-white text-2xl font-semibold transition-all duration-500 ease-in-out overflow-auto"
    >
      <i onClick={handleCloseNav} className="fa-solid fa-xmark text-4xl p-8"></i>
      <div className="mt-14">
        <Link to={"/bestil-online"} className="flex items-center gap-2 py-7 pl-8">
          <h3>Bestil online</h3>
          <i className="fa-solid fa-utensils"></i>
        </Link>
        <hr />
        <Link to={"/bestillinger"} className="flex items-center gap-2 py-7 pl-8">
          <h3>Bestillinger</h3>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </Link>
        <hr />
        <Link to={"/favoritter"} className="flex items-center gap-2 py-7 pl-8">
          <h3>Favoritter</h3>
          <i className="fa-solid fa-heart"></i>
        </Link>
        <hr />
        {loggedIn ? (
          <>
            <Link to={"/profil"} className="flex items-center gap-2 py-7 pl-8">
              <h3>Profil</h3>
              <i className="fa-solid fa-user"></i>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/log-ind"} className="flex items-center gap-2 py-7 pl-8">
              <h3>Log ind</h3>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default CustomerNavigation;
