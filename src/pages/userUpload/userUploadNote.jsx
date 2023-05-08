import React, {  useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/noteContext";
import FileIcon from "../../components/fileIcon";
import { ToastContainer, toast } from "react-toastify";

import "../../assets/stylesheet/noteCard.css";

const UserUploadNote = ({ name, by, on, id, format, held }) => {
    const [isLiked, setLiked] = useState(false);
    const { bPORT, toastSettings, addToLike, removeFromLike, savedList } =
        useContext(noteContext);

    const toggleLike = () => {
        if (isLiked) {
            setLiked(false);
            removeFromLike(id);
        } else {
            setLiked(true);
            addToLike(id);
        }
    };
    
    useEffect(()=>{
        savedList.map((li)=>{
            if(li === id) {
                setLiked(true);
                return;
            }
        })
    }, [savedList]);


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
                    <button onClick={toggleLike}>
                        <i
                            class={`fa-${
                                isLiked ? "solid" : "regular"
                            } fa-bookmark`}
                        ></i>
                    </button>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default UserUploadNote;
