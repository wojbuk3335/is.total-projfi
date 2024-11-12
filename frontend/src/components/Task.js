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

            </div>
            <div className="right" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>

            </div>
        </div>
    );
}

export default Lessons;