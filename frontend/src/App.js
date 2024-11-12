import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Lessons from './components/Lessons';
import Task from './components/Task';

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/sections')
      .then(response => response.json())
      .then(data => setSections(data))
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage sections={sections} />} />
          <Route path="/sections/:sectionId/lessons" element={<Lessons sections={sections} state={sections}/>} />
          <Route path="/sections/:sectionId/lessons/:lessonId" element={<Task sections={sections} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;