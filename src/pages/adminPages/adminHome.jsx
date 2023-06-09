import React, { useContext, useEffect, useState } from "react";
// import "./homepage.css";
import axios from "axios";
import BacisCardList from "../../components/noteCard";
import subjectList from "../../data/classSubjectList";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";
import AdminCardList from "../../components/adminNoteCard";
import AdminHomeCard from "./adminHomeCard";
import { noteContext } from "../../context/noteContext";

const AdminHome = () => {
    const [notesData, setNotesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {
        curSubject,
        setCurSubject,
        classOption,
        setClassOption,
        bPORT,
        setCurPage,
        user,
    } = useContext(noteContext);

    useEffect(() => {
        const getData = async () => {
            var data;
            setLoading(true);
            console.log("Fletching Data");
            await axios
                .get(
                    `${bPORT}/api/getdata?cls=${classOption}&subject=${curSubject}`
                )
                .then((dat) => {
                    data = dat.data;
                });
            setNotesData(data);
            setLoading(false);
        };
        getData();
    }, [classOption, curSubject]);

    useEffect(() => setCurPage("home"), []);

    const renderNotes = () => {
        return (
            <>
                {notesData.length < 1 &&
                    !loading &&
                    (user.isLoged ? (
                        <h3>
                            Be first to <Link to="/upload">upload</Link> notes
                            here
                        </h3>
                    ) : (
                        <h3>No Notes here, Login to Upload</h3>
                    ))}
                {notesData.map((note) => {
                    return (
                        <AdminHomeCard
                            name={note.name}
                            by={note.userName}
                            on={note.createdOn}
                            key={note.id}
                            id={note.id}
                            link={note.link}
                            format={note.format}
                        />
                    );
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
        <div className="page-container">
            <div className="subject-select-container mobile">
                {renderClassOptions()}
                {renderSubjectOption()}
            </div>

            <div className="notes">
                {loading ? (
                    <div className="loader">
                        <PropagateLoader
                            size="15px"
                            color="#FFD369"
                            loading={loading}
                        />
                    </div>
                ) : (
                    renderNotes()
                )}
            </div>
        </div>
    );
};

export default AdminHome;
