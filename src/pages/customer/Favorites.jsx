import React, { useRef, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import PageWrapperContainer from "../../components/PageWrapperContainer";
import BackButtonWithArrow from "../../components/BackButtonWithArrow";

// Udviklet fælles i gruppen

const Favorites = () => {


    return (
        <>
            <CustomerHeader nav={false} />
            <PageWrapperContainer>
                <div className="mt-28">
                    <BackButtonWithArrow linkText="Gå til forsiden" linkTo="/bestil-online" />

                    <p>Siden er ikke lavet</p>
                </div>
            </PageWrapperContainer>
        </>
    );
};

export default Favorites;
