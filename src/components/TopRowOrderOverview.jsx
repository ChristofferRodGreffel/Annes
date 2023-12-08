import React, { useEffect, useState } from 'react'
import { Line } from 'rc-progress';

function TopRowOrderOverview() {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            <div className='flex justify-between items-end mb-8'>
                <div>
                    <input type="text" name="searchForOrder" id="searchForOrderId" placeholder='Søg efter ordre...'></input>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between font-bold'>
                        <p>15 åbne ordre</p>
                        <p>Travlt</p>
                    </div>
                    <Line percent={70} className='h-4 w-64 rounded-full' strokeColor="#D7C310" />
                </div>
                <div>
                    <p className='text-4xl font-bold text-primary'>
                        {date.toLocaleTimeString("en-GB")}
                    </p>
                </div>
            </div>
        </>
    )
}

export default TopRowOrderOverview