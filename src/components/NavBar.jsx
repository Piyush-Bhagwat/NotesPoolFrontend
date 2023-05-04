import React, { useContext, useEffect, useState } from "react";
import subjectList from "../data/classSubjectList";
import { noteContext } from "../context/noteContext";
import { loginToGoogle } from "../data/firebase.js";
import { Link } from "react-router-dom";

const NavBar = () => {
    const {
        curSubject,
        setCurSubject,
        classOption,
        setClassOption,
        user,
        logOut,
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

    const toogleNav = ()=>{
        const navLinks = document.getElementById('links');
        console.log(navLinks);

        navLinks.classList.toggle('links-active');
    }

    return (
        <div className="nav-bar">
            <p className="brand-name">Notes Pool</p>

            <div className="subject-select-container">
                {renderClassOptions()}
                {renderSubjectOption()}
            </div>

            <button onClick={toogleNav} className="ctrl-btn">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div className="quickicons" id="links">
                {user.isLoged && (
                    <>
                        <Link to="/upload">
                            <i className="fa-solid fa-upload"></i>
                        </Link>

                        <Link to="/">
                            <i className="fa-regular fa-heart"></i>
                        </Link>

                        <a href="#">
                            <i className="fa-regular fa-folder-open"></i>
                        </a>
                    </>
                )}

                {user.isLoged ? (
                    <button onClick={logOut}>
                        <img className="profile-pic" src={user.dp} alt="" />
                    </button>
                ) : (
                    <button onClick={loginToGoogle}>
                        <i className="fa-regular fa-circle-user"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
