import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

document.querySelector(':root').style.setProperty('--hero-image', [
  `url("/hero-strip/hero-strip-0.jpg")`,
  `url("/hero-strip/hero-strip-1.jpg")`,
  `url("/hero-strip/hero-strip-2.jpg")`,
  `url("/hero-strip/hero-strip-3.jpg")`
][Math.floor(Math.random()*4)]);
const root = createRoot(document.querySelector('.app-root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
