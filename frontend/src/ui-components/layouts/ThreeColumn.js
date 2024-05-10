import { ObscureSlideover } from 'ui-components/slideover/ObscureSlideover';
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
        className='block md:hidden fixed left-3.5 bottom-3.5 p-4 rounded-sm bg-purple-500 text-slate-50'
        onClick={() => setShowLeft(!showLeft)}
      >
        {leftColumnIcon}
      </button>
      <ObscureSlideover width='w-4/5' left show={showLeft} onClose={() => setShowLeft(false)}>
        {renderedLeftColumn}
      </ObscureSlideover>

      <main className='grow border border-slate-200'>{mainColumn}</main>

      <aside className='hidden md:block md:w-1/5 lg:w-2/12 overflow-y-hidden'>
        {renderedRightColumn}
      </aside>
      <button
        className='block md:hidden fixed right-3.5 z-10 bottom-3.5 p-4 rounded-sm bg-purple-500 text-slate-50'
        onClick={() => setShowRight(!showLeft)}
      >
        {rightColumnIcon}
      </button>
      <ObscureSlideover width='w-4/5' show={showRight} onClose={() => setShowRight(false)}>
        {renderedRightColumn}
      </ObscureSlideover>
    </div>
  );
}
