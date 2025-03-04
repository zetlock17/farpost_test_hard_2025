import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 btn-settings"
    >
      {isDarkMode ? '🌕' : '☀️'}
    </button>
  );
};

export default ThemeToggle;