import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import UserUploadNote from "./userUploadNote";
import PropagateLoader from "react-spinners/PropagateLoader";

import "./userUpload.css";

const UserUpload = () => {
    const { bPORT, user } = useContext(noteContext);
    const [data, setData] = useState({ hold: [], uploaded: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            var dataGot;
            await axios
                .get(`${bPORT}/api/getuseruploads?id=${user.uid}`)
                .then((dat) => {
                    dataGot = dat.data;
                });
            setData(dataGot);
            setLoading(false);
        };
        getData();
    }, [user]);

    useEffect(() => console.log("userUploadData: ", data), [data]);

    const renderHoldNotes = () => {
        const onHold = data.hold;

        return (
            <>
                {onHold.map((note) => {
                    return (
                        <UserUploadNote
                            name={note.name}
                            by={note.userName}
                            on={note.createdOn}
                            key={note.id}
                            id={note.id}
                            link={note.link}
                            format={note.format}
                            held={true}
                        />
                    );
                })}
            </>
        );
    };

    const renderUploadNotes = () => {
        const uploded = data.uploaded;

        return (
            <>
                {uploded.map((note) => {
                    return (
                        <UserUploadNote
                            name={note.name}
                            by={note.userName}
                            on={note.createdOn}
                            key={note.id}
                            id={note.id}
                            link={note.link}
                            format={note.format}
                            held={false}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="user-notes">
            <div className="page-title"><h2>Your Uploads</h2></div>
            {loading && (
                <div className="loader">
                    <PropagateLoader
                        size="15"
                        color="#FFD369"
                        loading={loading}
                    />
                </div>
            )}
            {renderHoldNotes()}
            {renderUploadNotes()}
        </div>
    );
};

export default UserUpload;
