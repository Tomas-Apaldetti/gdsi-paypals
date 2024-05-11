import { FullSizeSlideover } from 'ui-components/slideover/FullSizeSlideover';
import React, { useState } from 'react';

function renderColumn(parts = []) {
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i === parts.length - 1 ? null : <span className='flex my-4 mx-2 border-b border-slate-300 shadow-sm' />}
    </React.Fragment>
  ));
}

export default function ThreeColumn({ mainColumn, leftColumn = [], leftColumnIcon, rightColumn = [], rightColumnIcon }) {
  const renderedLeftColumn = renderColumn(leftColumn);
  const renderedRightColumn = renderColumn(rightColumn);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  return (
    <div className='h-full grow w-full flex flex-row'>
      <aside className='hidden md:block md:w-1/5 lg:w-2/12 overflow-y-hidden'>
        {renderedLeftColumn}
      </aside>
      <button
        className='block md:hidden fixed left-24 bottom-10 p-4 rounded-sm shadow-md shadow-slate-500 bg-purple-500  transition hover:bg-purple-600 text-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:ring-offset-2'
        onClick={() => setShowLeft(!showLeft)}
      >
        {leftColumnIcon}
      </button>
      <FullSizeSlideover width='w-4/5' left show={showLeft} onClose={() => setShowLeft(false)}>
        {renderedLeftColumn}
      </FullSizeSlideover>

      <main className='grow border border-slate-200'>{mainColumn}</main>

      <aside className='hidden md:block md:w-1/5 lg:w-2/12 overflow-y-hidden'>
        {renderedRightColumn}
      </aside>
      <button
        className='block md:hidden fixed right-24 z-10 bottom-10 p-4 rounded-sm shadow-md shadow-slate-500 bg-purple-500  transition hover:bg-purple-600 text-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:ring-offset-2'
        onClick={() => setShowRight(!showLeft)}
      >
        {rightColumnIcon}
      </button>
      <FullSizeSlideover width='w-4/5' show={showRight} onClose={() => setShowRight(false)}>
        {renderedRightColumn}
      </FullSizeSlideover>
    </div>
  );
}
