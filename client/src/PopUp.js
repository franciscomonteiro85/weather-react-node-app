import React, {useState} from "react";

function PopUp(props) {
    const [open, setOpen] = useState(false) // State to manage visibility of popup
    const [userName, setUserName] = useState(''); // State to define login username
    const [loggedIn, setLoggedIn] = useState(false); // State to manage login

    // Set UserName and close Login PopUp
    function handleLogin(e) {
        e.preventDefault();
        props.setUserName(userName);
        togglePop();
        setLoggedIn(true);
    }

    // Open/Close PopUp
    function togglePop () {
        setOpen(!open);
    };

    return (
        <div>
            {!loggedIn && (<button className={loggedIn ? null : "button-nav"} onClick={togglePop}>Login</button>)}
            {open ? <div className="popup">
                        <div className="popup-inner">
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                <label className="form-label">
                                    Username:
                                        <input required type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                                </label>
                                <button className="button-nav" type="submit">Login</button>
                                <button className="button-nav" type="button" onClick={togglePop}>Continue as Guest</button>
                            </form>
                        </div>
                    </div> 
            : null}
        </div>
    )
}

export default PopUp;