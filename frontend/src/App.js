import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Lessons from './components/Lessons';
import Task from './components/Task';
import Summary from './components/Summary';

function App() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/sections')
      .then(response => response.json())
      .then(data => setSections(data))
      .catch(error => console.error('Error fetching sections:', error));
  }, []);

  const updateQuestionState = (sectionId, lessonId, taskId, introductionsId, questionIndex) => {
    const sectionIndex = parseInt(sectionId, 10) - 1;
    const lessonIndex = parseInt(lessonId, 10) - 1;
    const taskIndex = parseInt(taskId, 10) - 1;
    const introductionIndex = parseInt(introductionsId, 10) - 1;

    const updatedSections = [...sections];
    const question = updatedSections[sectionIndex].lessons[lessonIndex].tasks[taskIndex].introductions[introductionIndex].questions[questionIndex];
    question.checked = !question.checked;

    setSections(updatedSections);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage sections={sections} />} />
          <Route path="/sections/:sectionId/lessons" element={<Lessons sections={sections} />} />
          <Route path="/sections/:sectionId/lessons/:lessonId/" element={<Task sections={sections} updateQuestionState={updateQuestionState} />} />
          <Route path="/sections/:sectionId/lessons/:lessonId/tasks/:taskId/introductions/:introductionsId" element={<Task sections={sections} updateQuestionState={updateQuestionState} />} />
          <Route path="/sections/:sectionId/lessons/:lessonId/summary" element={<Summary sections={sections} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;