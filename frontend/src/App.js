import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Lessons from './components/Lessons';
import Task from './components/Task';
import Summary from './components/Summary';
import HowToUse from './components/HowToUse';

function App() {
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem('sections');
    return savedSections ? JSON.parse(savedSections) : [];
  });

  useEffect(() => {
    if (sections.length === 0) {
      // Fetch sections from the API
      //https://interaktywneseminaria.pl/api/sections
      //http://localhost:3001/api/sections
      fetch('https://interaktywneseminaria.pl/api/sections')
        .then(response => response.json())
        .then(data => setSections(data))
        .catch(error => console.error('Error fetching sections:', error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

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

  const resetLessonState = (sectionId, lessonId) => {
    const sectionIndex = parseInt(sectionId, 10) - 1;
    const lessonIndex = parseInt(lessonId, 10) - 1;

    const updatedSections = [...sections];
    const lesson = updatedSections[sectionIndex].lessons[lessonIndex];

    lesson.tasks.forEach(task => {
      task.introductions.forEach(introduction => {
        introduction.questions.forEach(question => {
          question.checked = false;
        });
      });
    });

    setSections(updatedSections);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage sections={sections} />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/sections/:sectionId/lessons" element={<Lessons sections={sections} />} />
          <Route path="/sections/:sectionId/lessons/:lessonId/" element={<Task sections={sections} updateQuestionState={updateQuestionState} />} />
          <Route path="/sections/:sectionId/lessons/:lessonId/tasks/:taskId/introductions/:introductionsId" element={<Task sections={sections} updateQuestionState={updateQuestionState} />} />
          <Route path="/sections/:sectionId/summary" element={<Summary sections={sections} resetLessonState={resetLessonState} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;