import React, { useContext } from "react";
import { noteContext } from "../../context/noteContext";
import FileIcon from "../../components/fileIcon";
import { ToastContainer, toast } from "react-toastify";

import "../../assets/stylesheet/noteCard.css";

const UserUploadNote = ({ name, by, on, id, format, held }) => {
    const { bPORT, toastSettings } = useContext(noteContext);

    return (
        <div className={"note-li " + (held && "on-held")}>
            <FileIcon type={format} />
            <div className="note-info">
                <div className="title">
                    <p>{name}</p>
                </div>

                <div>
                    <p>Uploaded By: {by}</p>
                    <p>Uploaded On: {on}</p>
                </div>
            </div>

            <div className="note-ctrl">
                <a
                    href={`${bPORT}/api/download?id=${id}`}
                    onClick={() => toast.success("Downloaded", toastSettings)}
                >
                    <i className="fa-solid fa-download"></i>
                </a>

                {held ? (
                    <div class="color-dot"></div>
                ) : (
                    <a href={`${bPORT}/api/download?id=${id}`} download="hi">
                        <i className="fa-regular fa-heart"></i>
                    </a>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default UserUploadNote;
