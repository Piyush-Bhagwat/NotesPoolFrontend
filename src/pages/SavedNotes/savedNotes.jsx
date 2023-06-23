import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import axios from "axios";
import BacisCardList from "../../components/noteCard";
import { PageTitle } from "../../components/pageTitle";
import { getSingleNote } from "../../data/firebase";

const SavedNotes = () => {
    const { savedList, bPORT, setCurPage } = useContext(noteContext);
    const [savedNotes, setSavedNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
        setCurPage("saveNotes");
    }, []);

    const getData = async () => {
        setLoading(true);
        await savedList.map(async (noteID) => {
            await getSingleNote(noteID).then((note) =>
                setSavedNotes((prev) => [...prev, note])
            );
        });
        setLoading(false);
    };

    const renderNotes = () => {
        return (
            <div className="notes">
                {savedNotes.length < 1 && "No Notes Saved"}
                {savedNotes.map((note) => {
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
                })}
            </div>
        );
    };

    return (
        <div className="page-container">
            <PageTitle title="Saved Notes" />
            {renderNotes()}
        </div>
    );
};

export default SavedNotes;
