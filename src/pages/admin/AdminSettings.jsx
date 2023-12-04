import React, { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminContentWrapper from "../../components/AdminContentWrapper";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";
import PageH1Title from "../../components/PageH1Title";
import { query, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebase-config";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../../helperfunctions/DefaultToastSettings";

const AdminSettings = () => {

    const formRef = useRef(null)

    const [customerProfileMessage, setCustomerProfileMessage] = useState("")

    useEffect(() => {
        const getCustomerProfileMessage = async () => {
            const q = query(collection(FIREBASE_DB, "admin-settings"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    if(doc.data().Message) {
                        setCustomerProfileMessage(doc.data().Message)
                    }
                })
            });
        };
        getCustomerProfileMessage();
    }, []);

    const handleUpdateCustomerProfileText = (e) => {
        e.preventDefault()
        const message = formRef.current.customerProfileMessage.value

        if (!message) {
            toast.error("Beskeden kan ikke være tom...", DefaultToastifySettings);
            return
        }

        const updateProfileMessagePromise = new Promise(function (resolve, reject) {
            setDoc(doc(FIREBASE_DB, "admin-settings", "profile-message"), {
                Message: message
            }).then(() => {
                // Password reset email sent!
                resolve()
                formRef.current.customerProfileMessage.value = ""
            })
                .catch((error) => {
                    reject()
                });
        })
        toast.promise(
            updateProfileMessagePromise,
            {
                pending: `Opdater profilbesked`,
                success: `Profilbesked opdateret!`,
                error: 'Der opstod en fejl, prøv igen...'
            }, DefaultToastifySettings
        )
    }

    return (
        <>
            <div className="flex justify-center flex-row">
                <AdminSidebar />
                <AdminContentWrapper>
                    <BackButtonWithArrow linkText="Tilbage til Ordre oversigt" linkTo="/ordre-oversigt" />
                    <PageH1Title>Indstillinger for Admin</PageH1Title>
                    <div className="flex flex-col gap-5 mt-10 md:flex-row md:flex-wrap">
                        <form ref={formRef} onSubmit={handleUpdateCustomerProfileText}>
                            <CustomInputWithLabel
                                button={true}
                                buttonText="Opdater kunde-profil tekst"
                                customOnClick={handleUpdateCustomerProfileText}
                                label="Velkomstbesked ved kundeprofil"
                                type="text"
                                name="customerProfileMessage"
                                placeholder="Skriv beskeden her..."
                            />
                            <p><span className="font-semibold">Nuværende besked: </span>{customerProfileMessage}</p>
                        </form>
                    </div>
                </AdminContentWrapper>
            </div>
        </>
    );
};

export default AdminSettings;
