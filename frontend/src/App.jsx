import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/custom.css';
import Header from './components/Header';
import Transactions from './components/Transactions';
import ChartPage from './components/ChartPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex-grow px-2 dark:bg-gray-800 dark:text-white">
        <div className='min-h-screen mx-auto w-full md:w-3/5 lg:w-1/2 xl:w-2/5 px-4'>
          <Header />
          <main className='py-2'>
            <Routes>
              <Route path="/" element={<Transactions />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;