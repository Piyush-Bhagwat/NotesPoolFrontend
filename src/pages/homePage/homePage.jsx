import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import BacisCardList from "../../components/noteCard";
import { noteContext } from "../../context/noteContext";
import subjectList from "../../data/classSubjectList";

const HomePage = () => {
    const [notesData, setNotesData] = useState([]);
    const {
        curSubject,
        setCurSubject,
        classOption,
        setClassOption,
        user,
        bPORT
    } = useContext(noteContext);

    useEffect(() => {
        console.log(classOption, curSubject);
        const getData = async () => {
            var data;
            await axios
                .get(
                    `${bPORT}/api/getdata?cls=${classOption}&subject=${curSubject}`
                )
                .then((dat) => {
                    data = dat.data;
                });
            setNotesData(data);
            console.log(data);
        };
        getData();
    }, [classOption, curSubject]);

    const renderNotes = () => {
        console.log(notesData);
        return (
            <>
                {notesData.map((note) => {
                    if (note !== null) {
                        return (
                            <BacisCardList
                                name={note.name}
                                by={note.userName}
                                on={note.createdOn}
                                key={note.id}
                                id={note.id}
                                link={note.link}
                                format={note.format}
                            />
                        );
                    }
                })}
            </>
        );
    };

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
        <div className="home-page">
            <div className="subject-select-container mobile">
                {renderClassOptions()}
                {renderSubjectOption()}
            </div>
            <div className="notes">{renderNotes()}</div>
        </div>
    );
};

export default HomePage;
