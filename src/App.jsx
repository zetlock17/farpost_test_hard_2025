import React from 'react';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-4 dark:bg-gray-800 dark:text-white">
        <h1>Hello world</h1>
        <ThemeToggle />
      </main>
    </div>
  );
};

export default App;