import React, { useEffect, useState } from "react";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import CustomerHeader from "../../components/CustomerHeader";
import CustomButton from "../../components/CustomButton";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, sendPasswordResetEmail, signOut } from "firebase/auth";
import PageH1Title from '../../components/PageH1Title'
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { PulseLoader } from "react-spinners";


const CustomerProfile = () => {
  const navigate = useNavigate();
  const uid = FIREBASE_AUTH.currentUser?.uid

  const [customerName, setCustomerName] = useState("")
  const [customerProfileMessage, setCustomerProfileMessage] = useState("")

  
  useEffect(() => {
    const getCustomerProfileMessage = async () => {
      const q = query(collection(FIREBASE_DB, "admin-settings"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().Message) {
            setCustomerProfileMessage(doc.data().Message)
          }
        })
      });
    };
    getCustomerProfileMessage();
  }, []);

  useEffect(() => {

    const getCustomerName = async () => {
      if (uid) {
        const docRef = doc(FIREBASE_DB, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCustomerName(docSnap.data().name)
        } else {
        }
      }

    }
    getCustomerName();
  }, [uid]);


  const handleUserLogOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        // Sign-out successful.
        navigate("/bestil-online");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleChangePhoneNumber = (e) => {
    e.preventDefault()
    toast.error("Funktionen er ikke tilgængelig", DefaultToastifySettings);
  }



  const handleResetPassword = () => {
    const userEmail = FIREBASE_AUTH.currentUser.email
    const sendPasswordResetEmailPromise = new Promise(function (resolve, reject) {
      sendPasswordResetEmail(FIREBASE_AUTH, userEmail)
        .then(() => {
          // Password reset email sent!
          resolve()
        })
        .catch((error) => {
          reject()
        });
    })

    toast.promise(
      sendPasswordResetEmailPromise,
      {
        pending: `Sender email til ${userEmail}`,
        success: `Email sendt til ${userEmail}!`,
        error: 'Der opstod en fejl, prøv igen...'
      }, DefaultToastifySettings
    )
  }


  return (
    <>
      <CustomerHeader nav={true} iconLeft="fa-solid fa-bars" iconRight="fa-solid fa-basket-shopping" />
      <PageWrapperContainer>

        {!customerName || !customerProfileMessage ?
          <>
            <div className="m-40">
              <PulseLoader color="#000000" />
            </div>
          </>
          :
          <>
            <div className="mt-20">
              <PageH1Title>
                <div className="flex flex-col ">
                  Hej, {customerName}
                  <span className="text-sm font-normal italic">
                    {customerProfileMessage}
                  </span>
                </div>
              </PageH1Title>
            </div>

            <div className="flex flex-col gap-6 mb-12">
              <CustomButton title="Vip-fordele" />
              <CustomButton title="Indstillinger" />
              <CustomButton title="Gå til favoritter" />
              <CustomButton title="Gå til bestillinger" />
            </div>

            <div className="mb-10">
              <CustomInputWithLabel
                button={true}
                buttonText="Opdater"
                customOnClick={handleChangePhoneNumber}
                label="Opdater telefon nr."
                type="text"
                name="customerPhoneNumber"
                placeholder="Skriv dit nr. her..."
              />
            </div>

            <div className="flex flex-col mb-10">
              <CustomButton title="Nulstil adgangskode" function={handleResetPassword} />
              <p className="text-center italic customBalance">Modtag en mail med instrukser - tjek evt. spam...</p>
            </div>

            <div className="mb-20 flex flex-col">
              <CustomButton title="Log ud" function={handleUserLogOut} />
            </div>
          </>
        }
      </PageWrapperContainer>
    </>
  );
};

export default CustomerProfile;
