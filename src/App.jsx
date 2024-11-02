import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Home} from "./pages/Home";
import {ModalStage} from "./components/ModalStage/ModalStage";

export const App = () => <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

    <ModalStage />
  </>