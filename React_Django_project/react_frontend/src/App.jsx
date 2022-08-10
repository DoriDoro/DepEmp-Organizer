import React from 'react';

import './App.css';

import Home from './Components/Home';
import Department from './Components/Department';
import Employee from './Components/Employee';
import Navigation from './Components/Navigation';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
      <div className="container">
        <h3 className='m-3 d-flex justify-content-center'>
          DepEmp Organizer
        </h3>
      
      <Navigation />

      <Routes>
        <Route 
          exact 
          path='/' 
          element={<Home/>} />
        <Route 
          path='/department' 
          element={<Department/>} /> 
        <Route 
          path='/employee' 
          element={<Employee/>} />
      </Routes>
      

      </div>
    </BrowserRouter>
  );
}

export default App;
