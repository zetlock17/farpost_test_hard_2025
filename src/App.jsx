import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import './styles/custom.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4 dark:bg-gray-800 dark:text-white">
        <h1>Hello world</h1>
        <ThemeToggle />
        <p className="text-body">Это пример текста.</p>
        <button className="btn-primary">Нажми меня</button>
      </main>
    </div>
  );
};

export default App;