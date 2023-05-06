import React, { useContext } from "react";
import { noteContext } from "../context/noteContext";
import FileIcon from "./fileIcon";

import "../assets/stylesheet/noteCard.css";

const BacisCardList = ({ name, by, on, id, format }) => {
    const { bPORT } = useContext(noteContext);

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
                <a href={`${bPORT}/api/download?id=${id}`} download="hi">
                    <i className="fa-solid fa-download"></i>
                </a>
                <a href={`${bPORT}/api/download?id=${id}`} download="hi">
                    <i className="fa-regular fa-heart"></i>
                </a>
            </div>
        </div>
    );
};

export default BacisCardList;
