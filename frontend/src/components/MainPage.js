import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mainpage.css';
import { Link } from 'react-router-dom';
//import bootstrap from 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage({ sections }) {
    const navigate = useNavigate();

    const handleClick = (index) => {
        navigate(`/sections/${index + 1}/lessons`);
    };

    return (
        <div className="container_first_page">
            <div className="left">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <img src={process.env.PUBLIC_URL + '/is_logo.png'} alt="logo" />
                    </div>
                    <div className='xxx'>
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
            <div className="right">
                <div className="upper">
                        <ul className="scrollable-list" style={{ listStyleType: 'none', padding: 0, paddingLeft: 0 }}>
                    {sections.map((section, index) => (
                        <li 
                            key={section._id} 
                            id={`section-${index}`} 
                            className="link-border" 
                            onClick={() => handleClick(index)}
                        >
                            {section.title_of_section}
                        </li>
                    ))}
                </ul>
                </div>
                <div className="how_use">
    <div className="how_use_container">
        <Link to="/how-to-use" className="how_use_font">
            <img className="how_use_img"
                src={process.env.PUBLIC_URL + '/img/howUse.png'}
                alt="how to use"
            />
            Jak korzystać?
        </Link>
    </div>
</div>
            </div>
        </div>
    );
}

export default MainPage;