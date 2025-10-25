import './App.css';

import React from 'react';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import {VenueDirectoryPage} from "./pages/VenueDirectoryPage/VenueDirectoryPage";
import {ModalStage} from "./components/ModalStage/ModalStage";
import {NewDirectoryPage} from "./pages/NewDirectory/NewDirectoryPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";



export const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route index element={<VenueDirectoryPage />} />
        <Route path="/venue/:venueId" element={<VenueDirectoryPage />} />
        <Route path="/new" element={<NewDirectoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

    <ModalStage />
  </>
}
