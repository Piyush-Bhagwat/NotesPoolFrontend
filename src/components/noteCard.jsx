import React, { useContext } from "react";
import pdfIcon from "../assets/icons/pdf.webp";
import axios from "axios";
import { saveAs } from "file-saver";
import { noteContext } from "../context/noteContext";

const BacisCardList = ({ name, by, on, id }) => {
    
    const {bPORT} = useContext(noteContext);

    return (
        <div className="note-li">
            <div className="title">
                <img src={pdfIcon} alt="" />
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
