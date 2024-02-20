import React, {useState} from "react";
import Login from './Login.js';

function PopUp(setUserName) {
    const [open, setOpen] = useState(false)

    function togglePop () {
        setOpen(!open);
    };

    return (
        <div>
            <button className="button-nav" onClick={togglePop}>Login</button>
            {open ? <Login toggle={togglePop} setUserName={setUserName} /> : null}
        </div>
    )
}

export default PopUp;