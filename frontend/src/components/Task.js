import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Task({ sections }) {
    const navigate = useNavigate();
    const { sectionId, lessonId, taskId, introductionsId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [sectionTitle, setSectionTitle] = useState('');
    const [currentLessonTitle, setCurrentLessonTitle] = useState('');
    const [currentTasks, setCurrentTasks] = useState([]);
    const [currentTaskTitle, setCurrentTaskTitle] = useState('');
    const [currentIntroduction, setCurrentIntroduction] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState({});

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
            }
        }
    }, [sections, sectionId, lessonId, taskId, introductionsId]);

    const handleClick = (index) => {
        setSelectedQuestions(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleNextClick = () => {
        alert('Next button clicked');
    };

    return (
        <div className="container">
            <div className="left">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    maxWidth: '100%',
                    maxWidth: '800px'
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", backgroundColor: '#3F4E55', color: 'white', fontSize: '25px', fontWeight: 'bold', paddingBottom: '20px' }}>
                        <div>
                            {sectionTitle}
                        </div>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <div style={{ marginRight: '15px' }}>
                                {currentLessonTitle}
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {currentTasks.map((task, index) => (
                                    <div key={index} style={{ fontSize: '35px', fontWeight: 'normal', padding: '0px 15px', background: 'rgb(255, 255, 255)', borderRadius: '5px', color: '#3F4E55' }}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "block" }}>
                        {currentIntroduction ? (
                            <video controls src={`http://localhost:3001${currentIntroduction.path_file}`} style={{ width: '100%', height: 'auto' }}>
                                <source src={`http://localhost:3001${currentIntroduction.path_file}`} type="video/mp4" />
                            </video>
                        ) : (
                            'backgroundColor'
                        )}
                    </div>
                    <div style={{ display: "block", backgroundColor: '#3F4E55', color: 'white', fontSize: '18px' }}>
                        colordqw dk qwj oidqwjoi dqwjdoi qwjdoiqwjoidqwj doiqwj doiqwjdoiqwj doij wqdoijd qwdjokp qwopd qwjoi dqwoj idqwjdoijqwdoi jqwoi qwdoi qwjdoi qwjdoiwwjdoi
                    </div>
                </div>
            </div>
            <div className="right" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ flex: 8, backgroundColor: '#3F4E55', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', fontSize: '25px', paddingLeft: '0px' }}>
                    <div style={{ display: "block"}}>
                        {currentTaskTitle}
                    </div>
                    <div style={{ display: "block", fontSize: '18px', marginTop: '10px', color: '#b7c84c' }}>
                        {currentIntroduction ? currentIntroduction.title_of_introduction : ''}
                    </div>
                    <div style={{ display: "block", fontSize: '18px', marginTop: '10px' }}>
                        {currentIntroduction ? currentIntroduction.questions.map((question, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    color: selectedQuestions[index] ? 'yellow' : 'white'
                                }}
                            >
                                <div style={{ backgroundColor: 'rgb(149, 162, 170)', padding: '2px 10px', marginRight: '10px', borderRadius: '0px 5px 5px 0px', fontWeight: 'bold' }}>
                                    <span>{index + 1}</span>
                                </div>
                                <div>
                                    {question.question}
                                </div>
                            </div>
                        )) : ''}
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