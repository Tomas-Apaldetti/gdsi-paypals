import { XMarkIcon } from '@heroicons/react/20/solid';

export const DebtorBtn = ({ debtor, selected = null, setSelected = null, handleChange, debtors, selectedButton, ticketAmount }) => {

  const FIXED = 0
  const EQUALLY = 1
  const PERCENTAGE = 2

  const calculateEqually = () => parseFloat((ticketAmount / debtors.length).toFixed(2))
  const calculatePercentage = (amount) => parseFloat(((amount / ticketAmount) * 100).toFixed(2)) 

  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{debtor.username}</span>
      {selectedButton === FIXED && (
        <div className='relative'>
          <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500'>$</span>
          <input
            className='text-right pr-2 w-20 ml-2 pl-2 border-l border-slate-400'
            defaultValue={debtor.amount ?? ''}
            onChange={(e) => {
              const updatedDebtors = debtors.map(x =>
                x.id === debtor.id ? { ...x, amount: parseFloat(e.target.value).toFixed(2) } : x
              );
              handleChange({
                target: {
                  name: 'debtors',
                  value: JSON.stringify(updatedDebtors),
                },
              });
            }}
          />
        </div>
      )}
      {selectedButton === EQUALLY && (
        <div className='relative w-20'>
          <span className='absolute left-14 top-1/2 transform -translate-y-1/2 text-slate-500'>$</span>
          <span className='w-16 ml-2 pl-2 border-l border-slate-400'>
            {calculateEqually() ?? ''}
          </span>
        </div>
      )}
      {selectedButton === PERCENTAGE && (
        <div className='relative'>
          <span className='absolute left-14 top-1/2 transform -translate-y-1/2 text-slate-500'>%</span>
          <input
            className='w-16 ml-2 pl-2 border-l border-slate-400'
            defaultValue={calculatePercentage(debtor.amount) ?? ''}
            onChange={(e) => {
              const updatedDebtors = debtors.map(x =>
                x.id === debtor.id ? { ...x, amount: parseFloat(((e.target.value / 100) * ticketAmount).toFixed(2)) } : x
              );
              handleChange({
                target: {
                  name: 'debtors',
                  value: JSON.stringify(updatedDebtors),
                },
              });
            }}
          />
        </div>
      )}
      {selected && setSelected && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelected(selected.filter((e) => e !== debtor));
          }}
          className='border-l border-slate-400 hover:text-red-400 transition hover:border-red-400'
        >
          <XMarkIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};
