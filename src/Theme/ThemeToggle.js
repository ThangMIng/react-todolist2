import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';
import { Button } from 'antd';

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <label class="switch">
      <input type="checkbox" onChange={toggleTheme}/>
      <span class="slider round"></span>
    </label>
  );
}

export default ThemeToggle;
