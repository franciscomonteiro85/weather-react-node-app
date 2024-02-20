import React, {useState} from "react";

function Login(props) {
    const [userName, setUserName] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        props.setUserName(userName);
        console.log(userName);
        props.toggle();
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label className="form-label">
                        Username:
                            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                    </label>
                    <button className="button-nav" type="submit">Login</button>
                    <button className="button-nav" type="button" onClick={props.toggle}>Close</button>
                </form>
            </div>
        </div>
    )
}

export default Login;