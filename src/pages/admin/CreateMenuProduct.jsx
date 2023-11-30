import React, { useRef } from 'react'
import PageWrapperContainer from '../../components/PageWrapperContainer'

function CreateMenuProduct() {

    const formRef = useRef(null)

    return (
        <PageWrapperContainer>

            <form ref={formRef}>
                <div>
                    <label htmlFor='name'>Navn på produkt</label>
                    <input type="text" name="name" placeholder="Navn" id="" />
                </div>
            </form>

        </PageWrapperContainer>
    )
}

export default CreateMenuProduct