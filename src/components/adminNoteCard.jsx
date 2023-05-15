import React, { useContext } from "react";
import pdfIcon from "../assets/icons/pdf.webp";
import { noteContext } from "../context/noteContext";
import "../assets/stylesheet/noteCard.css"

const AdminCardList = ({ name, by, on, id, tags }) => {
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

            <div className="btn-ctrl">
                <a href={`${bPORT}/api/download?id=${id}`}>
                    <i className="fa-solid fa-download"></i>
                </a>
                <a
                    href={`${bPORT}/api/approvedata?id=${id}&tosave=true`}
                >
                    <i className="fa-solid fa-check"></i>
                </a>
                <a
                    href={`${bPORT}/api/approvedata?id=${id}&tosave=false`}
                >
                    <i className="fa-solid fa-xmark"></i>
                </a>
            </div>
        </div>
    );
};

export default AdminCardList;
