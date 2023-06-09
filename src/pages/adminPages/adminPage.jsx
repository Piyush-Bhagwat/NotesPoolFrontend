import React, { useContext, useEffect, useState } from "react";
import "../homePage/homepage.css";
import axios from "axios";
import AdminCardList from "../../components/adminNoteCard";
import { noteContext } from "../../context/noteContext";
import {PageTitle} from "../../components/pageTitle";


const AdminPage = () => {
    const [notesData, setNotesData] = useState([]);
    const {bPORT} = useContext(noteContext);

    useEffect(() => {
        const getData = async () => {
            var data;
            await axios.get(`${bPORT}/api/gethold`).then((dat) => {
                data = dat.data;
            });
            setNotesData(data);
            console.log(data);
        };
        getData();
    }, []);

    const renderNotes = () => {
        console.log(notesData);
        return (
            <>
                {notesData.map((note) => {
                    return (
                        <AdminCardList
                            name={note.name}
                            by={note.userName}
                            on={note.createdOn}
                            key={note.id}
                            tags={note.tags}
                            id={note.id}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="page-container">
            <h1>Admin Page</h1>

            <PageTitle title="Notes to Review" />

            <div className="notes">
                {renderNotes()}
            </div>
        </div>
    );
};

export default AdminPage;
