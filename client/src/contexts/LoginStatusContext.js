import React, { createContext, useState } from "react";

export const LoginStatusContext = createContext();

function LoginStatusContextProvider(props) {
    const [loginStatus, setLoginStatus] = useState(false);

    function handleLoginStatus() {
        if (localStorage.authToken) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }


    return (
        <LoginStatusContext.Provider value={ {loginStatus, handleLoginStatus} }>
            {props.children}
        </LoginStatusContext.Provider>
    );
}

export default LoginStatusContextProvider;