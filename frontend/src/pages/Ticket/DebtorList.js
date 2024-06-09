import React from 'react';
import { DebtorBtn } from './DebtorBtn';
import { MultipleDropwDownList } from 'ui-components/input/MultipleDropwDownList';

export const DebtorList = ({ options, initial, handleChange, handleBlur, onButtonSelectionChange, selectedButton, ticketAmount, error = false, touched = false }) => {
  // const [selectedButton, setSelectedButton] = useState(1); //Default: Equally

  const handleButtonClick = (buttonIndex) => {
    // setSelectedButton(buttonIndex);
    onButtonSelectionChange(buttonIndex);
  };

  return (
    <div className='flex flex-col py-2 w-full'>
      <MultipleDropwDownList
        id={'debtors'}
        label={'Debtors'}
        options={options}
        initial={initial}
        inputRender={({ selected }) => `${selected.length} debtors selected`}
        optionRender={({ value, isSelected }) => (
          <>
            {isSelected ? null : (
              <span
                className={`w-full block text-md px-4 border-b py-1 last:border-b-0 border-slate-300 hover:bg-purple-500 hover:text-slate-50 transition`}
              >
                {value.username}
              </span>
            )}
          </>
        )}
        selectedRender={({ selected, setSelected }) => (
          <div className='flex w-full mt-2 gap-2 flex-wrap'>
            {selected.map((debtor) => (
              <DebtorBtn key={debtor.id} debtor={debtor} selected={selected} setSelected={setSelected} handleChange={handleChange} debtors={initial} selectedButton={selectedButton} ticketAmount={ticketAmount}/>
            ))}
          </div>
        )}

        onChange={handleChange}
        handleBlur={handleBlur}
        error={error}
        touched={touched}
      />
      <div className='flex mt-2 justify-center'>
        {['Fixed', 'Equally', 'Percentages'].map((buttonLabel, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleButtonClick(index)}
            className={`px-4 py-2 mx-1 ${selectedButton === index ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {buttonLabel}
          </button>
        ))}
      </div>
    </div>
);
};

