import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Task.css'; // Import the CSS file

function Task({ sections, updateQuestionState }) {
    const navigate = useNavigate();
    const { sectionId, lessonId, taskId, introductionsId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [sectionTitle, setSectionTitle] = useState('');
    const [currentLessonTitle, setCurrentLessonTitle] = useState('');
    const [currentTasks, setCurrentTasks] = useState([]);
    const [currentTaskTitle, setCurrentTaskTitle] = useState('');
    const [currentIntroduction, setCurrentIntroduction] = useState(null);
    const [previousIntroduction, setPreviousIntroduction] = useState(null);

    useEffect(() => {
        console.log('Sections:', sections);
        const sectionIndex = parseInt(sectionId, 10) - 1;
        if (sections[sectionIndex]) {
            setLessons(sections[sectionIndex].lessons);
            setSectionTitle(sections[sectionIndex].title_of_section);

            const lessonIndex = parseInt(lessonId, 10) - 1;
            const taskIndex = parseInt(taskId, 10) - 1;
            const introductionIndex = parseInt(introductionsId, 10) - 1;

            if (sections[sectionIndex].lessons[lessonIndex]) {
                setCurrentLessonTitle(sections[sectionIndex].lessons[lessonIndex].title_of_lesson);
                setCurrentTasks(sections[sectionIndex].lessons[lessonIndex].tasks);
            }

            if (sections[sectionIndex].lessons[lessonIndex] &&
                sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex]) {
                setCurrentTaskTitle(sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex].title_of_task);
            }

            if (sections[sectionIndex].lessons[lessonIndex] &&
                sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex] &&
                sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex].introductions[introductionIndex]) {
                const introduction = sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex].introductions[introductionIndex];
                setCurrentIntroduction(introduction);
                console.log('Current Introduction Path File:', introduction.path_file);

                // Set previous introduction if available
                if (introductionIndex > 0) {
                    const prevIntroduction = sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex].introductions[introductionIndex - 1];
                    setPreviousIntroduction(prevIntroduction);
                } else {
                    setPreviousIntroduction(null);
                }
            }
        }
    }, [sections, sectionId, lessonId, taskId, introductionsId]);

    const handleClick = (index) => {
        updateQuestionState(sectionId, lessonId, taskId, introductionsId, index);
    };

    const handleNextClick = () => {
        const sectionIndex = parseInt(sectionId, 10) - 1;
        const lessonIndex = parseInt(lessonId, 10) - 1;
        const taskIndex = parseInt(taskId, 10) - 1;
        const introductionIndex = parseInt(introductionsId, 10) - 1;

        const currentTask = sections[sectionIndex].lessons[lessonIndex].tasks[taskIndex];
        const nextIntroductionIndex = introductionIndex + 1;

        if (currentTask.introductions[nextIntroductionIndex]) {
            navigate(`/sections/${sectionId}/lessons/${lessonId}/tasks/${taskId}/introductions/${nextIntroductionIndex + 1}`);
        } else {
            const nextTaskIndex = taskIndex + 1;
            if (sections[sectionIndex].lessons[lessonIndex].tasks[nextTaskIndex]) {
                navigate(`/sections/${sectionId}/lessons/${lessonId}/tasks/${nextTaskIndex + 1}/introductions/1`);
            } else {
                alert('No more tasks or introductions available.');
            }
        }
    };

    const currentTaskIndex = parseInt(taskId, 10) - 1;

    return (
        <div className="container">
            <div className="left">
                <div className="content-container">
                    <div className="header">
                        <div>
                            {sectionTitle}
                        </div>
                        <div className="lesson-info">
                            <div className="lesson-title">
                                {currentLessonTitle}
                            </div>
                            <div className="tasks">
                                {currentTasks.map((task, index) => (
                                    <div key={index} className={`task ${currentTaskIndex === index ? 'active' : ''}`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        {currentIntroduction ? (
                            <video class="video"controls src={`http://localhost:3001${currentIntroduction.path_file}`}>
                                <source src={`http://localhost:3001${currentIntroduction.path_file}`} type="video/mp4" />
                            </video>
                        ) : (
                            'backgroundColor'
                        )}
                    <div className="scrollable-content" style={{ display: "block", backgroundColor: '#3F4E55', color: 'white', fontSize: '18px' }}>
                        {currentIntroduction ? currentIntroduction.description : ''}
                    </div>
                </div>
            </div>
            <div className="right" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ flex: 8, backgroundColor: '#3F4E55', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', fontSize: '25px', paddingLeft: '0px' }}>
                    <div style={{ display: "block" }}>
                        {currentTaskTitle}
                    </div>
                    <div style={{ display: "block", fontSize: '18px', marginTop: '10px', color: '#b7c84c' }}>
                        {currentIntroduction ? (currentIntroduction.title_of_introduction || 'omówienie') : ''}
                    </div>
                    <div style={{ display: "block", fontSize: '18px', marginTop: '10px' }}>
                        {currentIntroduction && currentIntroduction.title_of_description && previousIntroduction && previousIntroduction.questions ? (
                            previousIntroduction.questions.map((question, index) => (
<div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: question.checked ? 'yellow' : 'white', cursor: 'pointer' }}>
    <img src={question.correct === 'Poprawne' ? '/img/Odpowiedź_przycisk_żółty-1.png' : '/img/Odpowiedź_przycisk_szary-1.png'} style={{ display: 'inline-block' }} />
    <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-30px', marginRight: '8px', padding: '5px', backgroundSize: 'cover', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
        <b><span style={{ paddingRight: '20px' }}>{index + 1}</span></b>
        {question.question}
    </span>
</div>
                            ))
                        ) : (
                            currentIntroduction && currentIntroduction.questions && currentIntroduction.questions.map((question, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: question.checked ? 'yellow' : 'white', cursor: 'pointer' }} onClick={() => handleClick(index)}>
                            <img src="/img/Odpowiedź_przycisk_szary-1.png" style={{ display: 'inline-block' }}/>
                            <span style={{ display: 'flex', alignItems: 'center', marginLeft:'-30px',marginRight: '8px', padding: '5px', backgroundSize: 'cover', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                                <b><span style={{ paddingRight: '20px' }}>{index + 1}</span></b>
                                {question.question}
                            </span>
                            </div>
                            ))
                        )}
                    </div>
                </div>
                <div style={{ flex: 2, backgroundColor: '#3F4E55', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '0px' }}>
                    <img src="/go_next.png" alt="Go Next" style={{ height: '30%', cursor: 'pointer' }} onClick={handleNextClick} />
                </div>
            </div>
        </div>
    );
}

export default Task;