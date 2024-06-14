import React from "react";
 
const Authentication = ({ username, setUsername, password, setPassword, onAuthentication}) => {
    return (
        <div>
            <h2>Authentication</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button 
            className="button1" 
            onClick={onAuthentication}>
                Login / Register
            </button>
        </div>
    );
};

export default Authentication;