import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import { Link } from 'react-router-dom'

function CustomerBottomInfoContainer() {

    const [amountOfChosenProducts, setAmountOfChosenProducts] = useState(1)
    const [totalPrice, setTotalPrice] = useState(59)

    useEffect(() => {
        const checkLocalStorageForChosenProducts = () => {
            const amount = JSON.parse(localStorage.getItem('ChosenProducts'))
            const price = JSON.parse(localStorage.getItem('ChosenProducts'))

            if (amount && price) {
                const totalPrice = price
                const totalAmount = amount.length

                setTotalPrice(totalPrice)
                setAmountOfChosenProducts(totalAmount)
            }
        }

        checkLocalStorageForChosenProducts()
    }, [])


    return (
        <>
            {amountOfChosenProducts !== 0 && (
                <div className='z-20 bg-dark p-4 fixed bottom-0 w-screen flex justify-around items-center'>

                    <div className='text-white'>
                        <p>{amountOfChosenProducts} stk.</p>
                        <p className='text-3xl font-semibold'>{totalPrice} kr.</p>
                    </div>

                    <Link to={"/kurv"}>
                        <div className='text-white bg-primary px-8 py-2 rounded-lg'>
                            Gå til kurv
                        </div>
                    </Link>
                </div>
            )}
        </>
    )
}

export default CustomerBottomInfoContainer