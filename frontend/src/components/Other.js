import React, { useState } from 'react';

function Other() {

  const [counter, setCounter] = useState(0)

  return (
    <h1 className="text-4xl font-bold underline text-cyan-800">
      Hello world from other!
      <button onClick={() => setCounter(counter + 1)}>
        {`Counter ${counter}`}
      </button>
    </h1>
  );
}

export default Other;
