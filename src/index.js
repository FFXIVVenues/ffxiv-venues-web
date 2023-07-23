import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

document.body.style.backgroundImage = [
    `url("hero-strip/hero-strip-0.jpg")`,
    `url("hero-strip/hero-strip-1.jpg")`,
    `url("hero-strip/hero-strip-2.jpg")`
][Math.round(Math.random()*2)];

const root = createRoot(document.querySelector('.app-root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
