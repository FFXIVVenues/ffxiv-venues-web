import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {VenueDirectoryPage} from "./pages/VenueDirectoryPage/VenueDirectoryPage";
import {ModalStage} from "./components/ModalStage/ModalStage";

export const App = () => <>
  <Router>
    <Routes>
      <Route path="/" element={<VenueDirectoryPage />} />
    </Routes>
  </Router>

  <ModalStage />
</>
