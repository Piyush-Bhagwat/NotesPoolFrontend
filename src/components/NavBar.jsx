import React, { useContext } from "react";
import subjectList from "../data/classSubjectList";
import { noteContext } from "../context/noteContext";
import { Link } from "react-router-dom";

import "../assets/stylesheet/navBar.css";

const NavBar = () => {
    const {
        curSubject,
        setCurSubject,
        classOption,
        setClassOption,
        user,
        logOut,
        login,
    } = useContext(noteContext);

    const renderClassOptions = () => {
        return (
            <select
                className="subject-select"
                onChange={(e) => {
                    setCurSubject("all");
                    setClassOption(e.target.value);
                }}
                value={classOption}
            >
                {subjectList.map((cls, id) => {
                    return (
                        <option key={id} value={cls.class}>
                            {cls.class.replace("_", " ").toUpperCase()}
                        </option>
                    );
                })}
            </select>
        );
    };

    const renderSubjectOption = () => {
        var curClass = subjectList.find((cls) => cls.class === classOption);
        return (
            <select
                className="subject-select"
                onChange={(e) => setCurSubject(e.target.value)}
                value={curSubject}
            >
                <option value="all">All</option>
                {curClass.subjects.map((sub, id) => {
                    return (
                        <option value={sub} key={id}>
                            {sub.replaceAll("_", " ").toUpperCase()}
                        </option>
                    );
                })}
            </select>
        );
    };

    return (
        <div className="nav-bar">
            <Link to="/" style={{ textDecoration: "none" }}>
                <p className="brand-name">Notes Pool</p>
            </Link>

            <div className="subject-select-container desktop">
                {renderClassOptions()}
                {renderSubjectOption()}
            </div>

            <div className="quickicons" id="links">
                {user.isLoged && (
                    <>
                        <Link to="/">
                        <i className="fa-solid fa-house"></i>
                        </Link>

                        <Link to="/upload">
                            <i className="fa-solid fa-upload"></i>
                        </Link>

                        <Link to="/savednotes">
                            <i className="fa-solid fa-bookmark"></i>
                        </Link>
                        <Link to="/userupload">
                            <i className="fa-regular fa-folder-open"></i>
                        </Link>
                    </>
                )}

                {user.isLoged ? (
                    <button onClick={logOut}>
                        <img className="profile-pic" src={user.dp} alt="" />
                    </button>
                ) : (
                    <button onClick={login}>
                        <i className="fa-regular fa-circle-user"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
