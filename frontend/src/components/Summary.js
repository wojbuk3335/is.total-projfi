import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Summary.css'; // Import the CSS file

function Summary({ sections }) {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    const sectionIndex = parseInt(sectionId, 10) - 1;
    const section = sections[sectionIndex];
    const [maxWidth, setMaxWidth] = useState(0);
    const firstColumnRefs = useRef([]);

    useEffect(() => {
        const widths = firstColumnRefs.current.map(ref => ref ? ref.offsetWidth : 0);
        setMaxWidth(Math.max(...widths));
    }, [sections]);

    if (!section) {
        return <div>Section not found</div>;
    }

    const handleNextClick = () => {
        navigate('/'); // Replace with the actual path
    };

    // Calculate the maximum number of questions across all lessons
    const getMaxQuestions = () => {
        return Math.max(...section.lessons.map(lesson => 
            Math.max(...lesson.tasks.map(task => task.introductions[0].questions.length))
        ));
    };

    const maxQuestions = getMaxQuestions();

    return (
        <div className="summary-container">
            <div className="summary-content">
                <h1 className="section-title">{section.title_of_section}</h1>
                <p>{section.description}</p>
                <div className="centered-list">
                    <div className="lessons-grid">
                        {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="lesson">
                                <table>
                                    <thead>
                                        <tr>
                                            <th ref={el => firstColumnRefs.current[lessonIndex] = el} style={{ width: maxWidth }}>{lesson.title_of_lesson}</th>
                                            {Array.from({ length: maxQuestions }, (_, questionIndex) => (
                                                <th key={questionIndex}>{questionIndex + 1}</th>
                                            ))}
                                            <th></th> {/* New column for the button */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lesson.tasks.map((task, taskIndex) => (
                                            <tr key={taskIndex}>
                                                <td>{String.fromCharCode(65 + taskIndex)}</td>
                                                {task.introductions[0].questions.map((question, questionIndex) => (
                                                    <td key={questionIndex}>
                                                        {question.checked ? (
                                                            question.correct === "Poprawne" ? (
                                                                <img src={`/img/odpowiedź_poprawna.png`} alt="Poprawne" />
                                                            ) : question.correct === "Niepoprawne" ? (
                                                                <img src={`/img/odpowiedź_niepoprawna.png`} alt="Niepoprawne" />
                                                            ) : (
                                                                <img src={`/img/brak_odpowiedzi.png`} alt="Brak odpowiedzi" />
                                                            )
                                                        ) : (
                                                            <img src={`/img/brak_odpowiedzi.png`} alt="Brak odpowiedzi" />
                                                        )}
                                                    </td>
                                                ))}
                                                {Array.from({ length: maxQuestions - task.introductions[0].questions.length }).map((_, index) => (
                                                    <td key={index}>
                                                        <div><img src={`/img/nothing.png`} alt="Brak odpowiedzi" /></div> {/* Placeholder */}
                                                    </td>
                                                ))}
                                                <td>
                                                    <button onClick={() => alert('Button clicked!')}>Resetuj</button> {/* New button */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="summary-footer">
                <div>
                    <img src="/img/brak_odpowiedzi.png" alt="Brak odpowiedzi" />
                    <p>brak odpowiedzi</p>
                </div>
                <div>
                    <img src="/img/odpowiedź_poprawna.png" alt="Odpowiedź poprawna" />
                    <p>odpowiedź poprawna</p>
                </div>
                <div>
                    <img src="/img/odpowiedź_niepoprawna.png" alt="Odpowiedź niepoprawna" />
                    <p>odpowiedź niepoprawna</p>
                </div>
            </div>
            <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '0px' }}>
                <img src="/go_next.png" alt="Go Next" style={{ height: '40%', cursor: 'pointer' }} onClick={handleNextClick} />
            </div>
        </div>
    );
}

export default Summary;