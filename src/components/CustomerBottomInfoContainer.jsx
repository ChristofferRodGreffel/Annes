import React from 'react'
import CustomButton from './CustomButton'

function CustomerBottomInfoContainer() {
    return (
        <>
            <div className='z-50 bg-dark p-4 fixed bottom-0 w-screen flex justify-around items-center'>

                <div className='text-white'>
                    <p>4 stk.</p>
                    <p className='text-3xl font-semibold'>264 kr.</p>
                </div>

                <div>
                    <a href='/kurv'>
                        <CustomButton title="Gå til kurv" />
                    </a>
                </div>


            </div>
        </>
    )
}

export default CustomerBottomInfoContainer