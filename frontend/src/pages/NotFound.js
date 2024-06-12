import BaseBackground from 'ui-components/layouts/BaseBackground';
import React from 'react';
import Button from 'ui-components/button/Button';
import { useNavigate } from 'react-router-dom';

const phrases = [
  'Hmmm... where did I leave it?',
  'I know it was here... Somewhere',
  'Nothing suspicious going on here, go back',
  "I'm on vacation. If it's urgent, don't bother",
  'I would put my page here. IF I HAD ONE',
  'You sure you are looking for this one?',
  'You have been bamboozled',
  "I don't know how you got here",
  'Go back, you are drunk',
  'Such a lonely place',
  'This is not where the friends are',
  "No pals here. Just you and me (and I'm a webpage)",
  'Hope you were not trying to find gold here',
  'Maybe the important pages are the friend we made along the way',
];
function NotFound() {
  const navigate = useNavigate();

  return (
    <BaseBackground>
      <div className='w-1/2 flex flex-col justify-center'>
        <h1 className='text-6xl text-purple-500 drop-shadow-md uppercase font-extrabold text-center py-10'>
          {phrases[Math.floor(Math.random() * phrases.length)]}
        </h1>
        <p className='text-md text-slate-800 drop-shadow-md uppercase font-medium py-10 text-center my-10 border-b-2 border-slate-400'>
          Sorry, the page you were trying to access is not available
        </p>
        <div className='flex flex-row justify-center'>
          <div className='w-1/2'></div>
          <Button onClick={() => navigate('/')} className='py-2'>Take me back</Button>
          <div className='w-1/2'></div>
        </div>
      </div>
    </BaseBackground>
  );
}

export default NotFound;
