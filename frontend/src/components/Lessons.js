import { useNavigate } from 'react-router-dom';

function Lessons({ sections }) {
    const navigate = useNavigate();

    const handleClick = (index) => {
        navigate(`/sections/${index + 1}/lessons`);
    };

    return (
        <div className="container">
            <div className="left">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                </div>
            </div>
            <div className="right">
                <div className="upper">
                    <ul style={{ listStyleType: 'none', padding: 0, paddingLeft: 0 }}>

                    </ul>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Lessons;