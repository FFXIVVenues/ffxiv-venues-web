import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/browser";
import { App } from './App';
import './index.css';

Sentry.init({
  environment: process.env.REACT_APP_FFXIV_VENUES_SENTRY_ENVIRONMENT,
  dsn: process.env.REACT_APP_FFXIV_VENUES_SENTRY_DSN
});
document.querySelector(':root').style.setProperty('--hero-image', [
  `url("/hero-strip/hero-strip-0.jpg")`,
  `url("/hero-strip/hero-strip-1.jpg")`,
  `url("/hero-strip/hero-strip-2.jpg")`,
  `url("/hero-strip/hero-strip-3.jpg")`,
  `url("/hero-strip/hero-strip-4.jpg")`
][Math.floor(Math.random()*5)]);
const root = createRoot(document.querySelector('.app-root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
