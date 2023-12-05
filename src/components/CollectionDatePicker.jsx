import React, { useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import da from 'date-fns/locale/da';


function CollectionDatePicker() {
    const [startDate, setStartDate] = useState(new Date());

    registerLocale('da', da)


    return (
        <div className='mt-5'>
            <p className='font-semibold mb-2'>Vælg afhentningsdato</p>
            <DatePicker locale="da" dateFormat={'dd/MM/yyyy'} minDate={new Date()} registerLocale="da" selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    )
}

export default CollectionDatePicker