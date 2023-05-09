import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../../assets/stylesheet/noteCard.css";
import { noteContext } from "../../context/noteContext";
import FileIcon from "../../components/fileIcon";

const AdminHomeCard = ({ name, by, on, id, format }) => {
    const [isLiked, setLiked] = useState(false);
    const { bPORT, toastSettings, addToLike, removeFromLike, savedList, user } =
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
        <div className="note-li">
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
                <a href={`${bPORT}/api/deletenote?id=${id}`}><i class="fa-solid fa-trash-can"></i></a>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminHomeCard;
