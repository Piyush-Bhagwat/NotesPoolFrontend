import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import formData from "form-data";
import "../assets/stylesheet/form.css";
import subjectList from "../data/classSubjectList.js";
import { noteContext } from "../context/noteContext";
import { isMobile } from "react-device-detect";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../data/firebase";

const UploadForm = () => {
    const [dragActive, setDragActive] = useState(false);
    const [data, setData] = useState({
        file: false,
        class: "BCA_1",
        subject: "",
        fileName: "",
        format: "",
    });

    const { user, bPORT, toastSettings, setCurPage } = useContext(noteContext);

    const renderClassOptions = () => {
        return (
            <select
                name="class"
                id="class"
                onChange={onChangeHandler}
                value={data.class}
            >
                {subjectList.map((cls, id) => {
                    return (
                        <option key={id} value={cls.class}>
                            {cls.class.replace("_", " ").toUpperCase()}
                        </option>
                    );
                })}
            </select>
        );
    };

    const renderSubjectOption = () => {
        var curClass = subjectList.find((cls) => cls.class === data.class);
        console.log(curClass);
        return (
            <select
                name="subject"
                id="subject"
                onChange={onChangeHandler}
                value={data.subject}
            >
                <option value="">Select</option>
                {curClass.subjects.map((sub, id) => {
                    return (
                        <option value={sub} key={id}>
                            {sub.replaceAll("_", " ").toUpperCase()}
                        </option>
                    );
                })}
            </select>
        );
    };

    const isDataVaild = () => {
        if(!user.isLoged){
            toast.error("You are not Loged in", toastSettings);
            return false;
        }
        if(!data.file){
            toast.error("Select a File", toastSettings);
            return false;
        }

        if (["pdf", "txt", "docs"].indexOf(data.format) === -1) {
            toast.error(
                `File Format "${data.format}" not suported`,
                toastSettings
            );
            setData({ ...data, file: false, fileName: "" });
            return false;
        }

        if (data.subject === "") {
            toast.error("Select Subject", toastSettings);
            return false;
        }

        if (data.fileName === "") {
            toast.error("File Name cant be Empty", toastSettings);
            return false;
        }

        return true;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if(!isDataVaild()){
            return ;
        }

        let fname;
        if (data.fileName.split(".").pop() !== data.format) {
            fname = (data.fileName + "." + data.format);
        } else {
            fname = data.fileName;
        }

        const uploading = async () => uploadFile(data.file[0], fname, data.class, data.subject, user.name, user.uid, data.format);

        await toast.promise(
            uploading(),
            {
                pending: "Uploading",
                success: "Uploaded, Under Review",
            },
            toastSettings
        );

        console.log("File Uploaded");

        setData({ file: false, class: "BCA_1", subject: "", fileName: "" });
    };

    let name, value;
    const onChangeHandler = (e) => {
        name = e.target.name;
        value = e.target.value;

        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        setCurPage("upload");
    }, []);

    const dragHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // at least one file has been dropped so do something
            // handleFiles(e.dataTransfer.files);
            setData({ ...data, file: e.dataTransfer.files });
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // at least one file has been selected so do something
            // handleFiles(e.target.files);

            if (data.fileName === "") {
                setData({
                    ...data,
                    file: e.target.files,
                    fileName: e.target.files[0].name,
                    format: e.target.files[0].name.split(".").pop(),
                });
            } else {
                setData({
                    ...data,
                    file: e.target.files,
                    format: e.target.files[0].name.split(".").pop(),
                });
            }
        }
    };

    const inputRef = useRef(null);
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <form
                className="upload-form"
                onDragEnter={dragHandler}
                onSubmit={onSubmitHandler}
            >
                <div className="file-and-name">
                    <label
                        onClick={onButtonClick}
                        id="label-file-select"
                        htmlFor="file-select"
                        className={dragActive ? "drag-active" : ""}
                    >
                        {data.file ? (
                            <p>File Selected {data.file[0].name}</p>
                        ) : isMobile ? (
                            <p>Select File</p>
                        ) : (
                            <p>Drag your file here or Click to select</p>
                        )}
                    </label>
                    {dragActive && (
                        <div
                            id="drag-file-element"
                            onDragEnter={dragHandler}
                            onDragLeave={dragHandler}
                            onDragOver={dragHandler}
                            onDrop={dropHandler}
                        ></div>
                    )}

                    <input
                        className="name-upload"
                        type="text"
                        onChange={onChangeHandler}
                        value={data.fileName}
                        name="fileName"
                        id="fileName"
                        placeholder="File Name"
                    />
                </div>

                <div className="subject-class-select">
                    <div>
                        <label htmlFor="class">Class: </label>
                        {renderClassOptions()}
                    </div>

                    <div>
                        <label htmlFor="subject">Subject: </label>
                        {renderSubjectOption()}
                    </div>
                </div>

                <button type="submit" className="submit btn" value="submit">
                    Upload
                </button>
                <input
                    ref={inputRef}
                    className="file-select"
                    type="file"
                    name="file"
                    id="file"
                    accept=".pdf, .docs, .txt"
                    onChange={handleChange}
                />
            </form>
            <ToastContainer />
        </div>
    );
};

export default UploadForm;
