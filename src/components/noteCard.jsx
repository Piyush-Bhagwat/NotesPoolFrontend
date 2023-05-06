import React, { useContext } from "react";
import { noteContext } from "../context/noteContext";
import FileIcon from "./fileIcon";

const BacisCardList = ({ name, by, on, id, format }) => {
    const { bPORT } = useContext(noteContext);

    return (
        <div className="note-li">
            <div className="title">
                <FileIcon type={format} />
                <p>{name}</p>
            </div>

            <div>
                <p>Uploaded By: {by}</p>
                <p>Uploaded On: {on}</p>
            </div>

            <a href={`${bPORT}/api/download?id=${id}`} download="hi">
                <i className="fa-solid fa-download"></i>
            </a>
        </div>
    );
};

export default BacisCardList;
