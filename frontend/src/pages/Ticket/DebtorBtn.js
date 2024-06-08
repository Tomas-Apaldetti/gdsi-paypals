import { XMarkIcon } from '@heroicons/react/20/solid';

export const DebtorBtn = ({ debtor, selected = null, setSelected = null, handleChange, debtors }) => {
  // console.log(debtor)
  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{debtor.username}</span>
      <input 
        className='w-20 ml-2 pl-2 border-l border-slate-400' 
        defaultValue={debtor.amount ?? ''} 
        onChange={(e) => {
          const updatedDebtors = debtors.map(x =>
            x.id === debtor.id ? { ...x, amount: parseFloat(e.target.value) } : x
          );
          handleChange({
            target: {
              name: 'debtors',
              value: JSON.stringify(updatedDebtors),
            },
          });
        }}
        />
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
