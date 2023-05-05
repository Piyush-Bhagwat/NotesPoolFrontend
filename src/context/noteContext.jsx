import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const noteContext = createContext(null);

export default function NoteContextProvider(props) {
    const [classOption, setClassOption] = useState("BCA_1");
    const [curSubject, setCurSubject] = useState("all");

    const [user, setUser] = useState({ isLoged: false });

    const globalHost = "https://notepool-backend.onrender.com";
    const localHost = "http://localhost:4040";

    const bPORT = localHost;

    useEffect(() => {
        if (localStorage.getItem("name")) {
            const userInfo = {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                uid: localStorage.getItem("uid"),
                dp: localStorage.getItem("dpURL"),
                isLoged: true,
            };
            setUser(userInfo);
        }
    }, []);

    useEffect(() => console.log(user), [user]);

    const logOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.removeItem("dpURL");
        window.location = "/";
    }

    const contextValue = {
        classOption,
        curSubject,
        setClassOption,
        setCurSubject,
        user,
        bPORT,
        logOut
    };

    return (
        <noteContext.Provider value={contextValue}>
            {props.children}
        </noteContext.Provider>
    );
}
