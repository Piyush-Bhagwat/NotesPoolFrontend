import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db, loginToGoogle } from "../data/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const noteContext = createContext(null);

export default function NoteContextProvider(props) {
    const [classOption, setClassOption] = useState("BCA_1");
    const [curSubject, setCurSubject] = useState("all");
    const [savedList, setSavedList] = useState([]);
    const [user, setUser] = useState({ isLoged: false });
    const [curPage, setCurPage] = useState("home");


    const globalHost = "https://notepool-backend.onrender.com";
    const localHost = "http://localhost:10000";

    const bPORT = globalHost;

    const toastSettings = {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const login = async () => {
        await loginToGoogle().then(async (res) => {
            localStorage.setItem("name", res.user.displayName);
            localStorage.setItem("email", res.user.email);
            localStorage.setItem("dpURL", res.user.photoURL);
            localStorage.setItem("uid", res.user.uid);
            checkIfUserExist(
                res.user.uid,
                res.user.displayName,
                res.user.email
            );
        });
        window.location.reload();
    };

    useEffect(() => {
        if (localStorage.getItem("name")) {
            const userInfo = {
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                uid: localStorage.getItem("uid"),
                dp: localStorage.getItem("dpURL"),
                isLoged: true,
            };
            checkIfUserExist(
                localStorage.getItem("uid"),
                localStorage.getItem("name"),
                localStorage.getItem("email")
            );
            setUser(userInfo);
            readSavedList(localStorage.getItem("uid"));

        } else {
            toast.info(`Login to Upload`, toastSettings);
        }
    }, []);

    const setNewUser = async (uid, name, email) => {
        const userRef = doc(db, "users", uid);

        const userData = {
            savedNotes: [],
            name,
            email,
        };
        await setDoc(userRef, userData);
    };

    const checkIfUserExist = async (uid, name, email) => {
        const userRef = doc(db, "users", uid);
        const userDoc = (await getDoc(userRef)).data();

        if (userDoc === undefined) {
            await setNewUser(uid, name, email);
        } else {
            setSavedList(userDoc.savedNotes);
        }
    };

    const logOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.removeItem("dpURL");
        window.location = "/";
    };

    useEffect(() => { 
        updateFirebaseSaveList(user.uid);
    }, [savedList]);

    const readSavedList = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userDoc = (await getDoc(userRef)).data();
        setSavedList(userDoc.savedNotes);
    }

    const updateFirebaseSaveList = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userDoc = (await getDoc(userRef)).data();

        const userData = {
            savedNotes: savedList,
            name: userDoc.name,
            email: userDoc.email,
        };
        await setDoc(userRef, userData);
    }

    const addToLike = (noteID) => {
        setSavedList((prev) => [...prev, noteID]);
    };

    const removeFromLike = (noteID) => {
        setSavedList((prev) => {
            return prev.filter((item) => {
                return item !== noteID;
            });
        });
    };

    const contextValue = {
        classOption,
        curSubject,
        savedList,
        user,
        toastSettings,
        bPORT,
        curPage,
        setClassOption,
        setCurSubject,
        setSavedList,
        setCurPage,
        logOut,
        login,
        addToLike,
        removeFromLike,
    };

    return (
        <noteContext.Provider value={contextValue}>
            {props.children}
            <ToastContainer />
        </noteContext.Provider>
    );
}
