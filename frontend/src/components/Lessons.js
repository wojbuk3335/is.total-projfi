import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Lessons({ sections }) {
    const navigate = useNavigate();
    const { sectionId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [sectionTitle, setSectionTitle] = useState('');

    useEffect(() => {
        console.log('Sections:', sections);
        const sectionIndex = parseInt(sectionId, 10) - 1;
        if (sections[sectionIndex]) {
            setLessons(sections[sectionIndex].lessons);
            setSectionTitle(sections[sectionIndex].title_of_section);
        }
    }, [sections, sectionId]);

    const handleClick = (lessonIndex) => {
        navigate(`/sections/${sectionId}/lessons/${lessonIndex+1}`);
    };

    return (
        <div className="container">
            <div className="left">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <img src={process.env.PUBLIC_URL + '/is_logo.png'} alt="logo" />
                    </div>
                    <div>
                        <div>
                            <p style={{ color: 'white', fontSize: '2.5em', margin: 0, fontWeight: 'bold' }}>
                                Interaktywne<br />Seminarium
                            </p>
                        </div>
                        <p style={{ color: '#a7b84c', fontSize: '2.5em', margin: 0 }}>
                            Prawidłowego<br />Opisu EKG
                        </p>
                    </div>
                </div>
            </div>
            <div className="right" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>{sectionTitle}</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {lessons.map((lesson, index) => (
                        <li 
                            key={index} 
                            style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', padding: '10px', margin: '-10px', cursor: 'pointer' }}
                            onClick={() => handleClick(index)}
                        >
                            <div style={{ backgroundColor: '#95A2AA', color: 'white', fontWeight: 'bold', display: 'inline-block', padding: '5px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                                {lesson.title_of_lesson}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Lessons;