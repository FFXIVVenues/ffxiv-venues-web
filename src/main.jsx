import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LetItGo } from "let-it-go";


document.querySelector(':root').style.setProperty('--hero-image', [
  `url("/hero-strip/hero-strip-0.jpg")`,
  `url("/hero-strip/hero-strip-1.jpg")`,
  `url("/hero-strip/hero-strip-2.jpg")`,
  `url("/hero-strip/hero-strip-3.jpg")`,
  `url("/hero-strip/hero-strip-4.jpg")`
][Math.floor(Math.random()*5)]);
const root = createRoot(document.querySelector('.app-root'));
setTimeout(_ => new LetItGo({
  style: { zIndex: 1, pointerEvents: "none" },
}), 2500);

root.render(<React.StrictMode><App /></React.StrictMode>);
