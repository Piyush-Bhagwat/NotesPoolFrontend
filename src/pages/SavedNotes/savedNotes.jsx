import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import axios from "axios";
import BacisCardList from "../../components/noteCard";
import "./savedNotes.css";
import { PageTitle } from "../../components/pageTitle";

const SavedNotes = () => {
    // "http://localhost:4040/api/getsinglenote?id=0mk7R3yI3BHv7kY8HzyQ"
    const { savedList, bPORT } = useContext(noteContext);
    const [savedNotes, setSavedNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => console.log("savedNotes: ", savedNotes), [savedNotes]);

    const getData = async () => {
        setLoading(true);
        await savedList.map(async (noteID) => {
            axios
                .get(`${bPORT}/api/getsinglenote?id=${noteID}`)
                .then((note) => setSavedNotes((prev) => [...prev, note.data]));
        });
        setLoading(false);
    };

    const renderNotes = () => {
        return (
            <div className="notes">
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
        <div className="saved-notes">
            <PageTitle title="Saved Notes" />
            {renderNotes()}
        </div>
    );
};

export default SavedNotes;
