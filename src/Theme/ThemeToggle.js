import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className='switch'>
      {isDarkTheme ? 'Light' : 'Dark'}
    </button>
  );
}

export default ThemeToggle;
