import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import BacisCardList from "../../components/noteCard";
import { noteContext } from "../../context/noteContext";

const HomePage = () => {
    const [notesData, setNotesData] = useState([]);
    const { classOption, curSubject, bPORT } = useContext(noteContext);

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

    return (
        <div className="notes">
            {renderNotes()}
        </div>
    );
};

export default HomePage;
