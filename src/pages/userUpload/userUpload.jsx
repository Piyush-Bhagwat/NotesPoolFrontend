import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import UserUploadNote from "./userUploadNote";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Link } from "react-router-dom";

import { PageTitle } from "../../components/pageTitle";
import { userData } from "../../data/firebase";

const UserUpload = () => {
    const { bPORT, user, setCurPage } = useContext(noteContext);
    const [data, setData] = useState({ hold: [], uploaded: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            var dataGot;
            await userData(user.uid).then((dat) => {
                dataGot = dat;
            });

            setData(dataGot);
            setLoading(false);
        };
        getData();
    }, [user]);

    useEffect(() => setCurPage("userUpload"), []);
    const onHold = data.hold;

    const renderHoldNotes = () => {
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
    const uploded = data.uploaded;

    const renderUploadNotes = () => {
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
        <div className="page-container">
            <PageTitle title="User Upload" />
            {loading && (
                <div className="loader">
                    <PropagateLoader
                        size="15"
                        color="#FFD369"
                        loading={loading}
                    />
                </div>
            )}
            {onHold.length + uploded.length < 1 && (
                <h3>
                    No Files Uploaded, <Link to="/upload">Upload</Link> one Now
                </h3>
            )}
            <div className="notes">
                {renderHoldNotes()}
                {renderUploadNotes()}
            </div>
        </div>
    );
};

export default UserUpload;
