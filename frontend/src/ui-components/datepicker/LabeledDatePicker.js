import React, { useRef, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { triggerOnChange } from 'utils/triggerOnChange';

function coalesceDates(dateValues){
  if(dateValues && dateValues.startDate === dateValues.endDate){
    return dateValues.startDate;
  }
  return JSON.stringify(dateValues);
}

export const LabeledDatePicker = ({id, label, value, onChange,  datepickerProps}) => {

  const [datePickerValue, setDatePickerValue] = useState(value instanceof Date ? {startDate: value, endDate: value} : value)
  const inputRef = useRef(null);


  return (
    <div className='flex flex-col mb-5'>
      <label id={id} className='mb-1 text-md sm:text-sm tracking-wide text-slate-700'>
        {label}
      </label>
      <input id={id} name={id} ref={inputRef} type='text' className='hidden' onChange={onChange}/>
      <Datepicker
              inputClassName={`
                text-md
                sm:text-sm
                bg-white
                placeholder-slate-500
                px-4
                rounded-xl
                border
                border-slate-500
                w-full
                py-2
                focus:outline-none
                focus:ring-purple-500
                focus:ring-2
              `}
              primaryColor={"purple"}
              value={datePickerValue}
              onChange={(newValue) => {
                triggerOnChange('input', inputRef, coalesceDates(newValue));
                setDatePickerValue(newValue);
              }}
              {...datepickerProps}
            />
    </div>
  )
}
