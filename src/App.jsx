import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {VenueDirectoryPage} from "./pages/VenueDirectoryPage/VenueDirectoryPage";
import {ModalStage} from "./components/ModalStage/ModalStage";
import {NewDirectoryPage} from "./pages/NewDirectory/NewDirectoryPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";

export const App = () => <>
  <Router>
    <Routes>
      <Route index element={<VenueDirectoryPage />} />
      <Route path="/new" element={<NewDirectoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>

  <ModalStage />
</>
