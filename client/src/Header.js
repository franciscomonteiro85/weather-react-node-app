import PortraitIcon from '@mui/icons-material/Portrait';
import PopUp from "./PopUp.js";
import React, {useState} from 'react';

function Header()
{
    const [userName, setUserName] = useState(''); // State to define User Name

    return( 
        <header>
            <div className="header-row">
                <h1 className="header-title">Weather Forecast Portugal</h1>
                <nav className="header-nav">
                    <ul className="header-list">
                        <li className="header-item user-icon"><PortraitIcon/></li>
                        <p className="header-item">Welcome {userName || 'Guest'}</p>
                        <li className="header-item"><PopUp setUserName={setUserName}/></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;