import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

document.querySelector(':root').style.setProperty('--hero-image', [
  `url("${process.env.PUBLIC_URL}hero-strip/hero-strip-0.jpg")`,
  `url("${process.env.PUBLIC_URL}hero-strip/hero-strip-1.jpg")`,
  `url("${process.env.PUBLIC_URL}hero-strip/hero-strip-2.jpg")`
][Math.floor(Math.random()*3)]);
const root = createRoot(document.querySelector('.app-root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
