import React from 'react';
import './styles/custom.css';
import Header from './components/Header';
import Transactions from './components/Transactions';

const App = () => {
  return (
    <div className="flex-grow px-2 dark:bg-gray-800 dark:text-white">
      <div className='min-h-screen mx-auto w-full md:w-3/5 lg:w-1/2 xl:w-2/5 px-4'>
        <Header />
        <main className='py-2'>
          <Transactions />
        </main>
      </div>
    </div>
  );
};

export default App;