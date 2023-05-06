import React from "react";
import pdfIcon from "../assets/icons/pdf.webp";
import docxIcon from "../assets/icons/docx.png";
import txtIcon from "../assets/icons/txt.png";

const FileIcon = ({ type }) => {
    const decideLogo = () => {
        switch (type) {
            case "pdf":
                return pdfIcon;
            case "docx":
                return docxIcon;
            case "txt":
                return txtIcon;
            default:
                break;
        }
    };

    return <img src={decideLogo()} alt="fileLogo" />;
};

export default FileIcon;
