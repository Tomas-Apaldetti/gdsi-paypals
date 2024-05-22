import { XMarkIcon } from '@heroicons/react/20/solid';

export const DebtorBtn = ({ value, amount, selected = null, setSelected = null }) => {
  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{value.username}</span>
      <span className='mr-2 ml-2 pl-2 border-l border-slate-400'>{amount}</span>
      {selected && setSelected && (
        <button
        onClick={(e) => {
          e.preventDefault();
          setSelected(selected.filter((e) => e !== value));
        }}
        className='border-l border-slate-400 hover:text-red-400 transition hover:border-red-400'
      >
        <XMarkIcon className='h-4 w-4' />
      </button>
      )}
    </div>
  );
};
