import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import formData from "form-data";
import "../assets/stylesheet/form.css";
import subjectList from "../data/classSubjectList.js";
import { noteContext } from "../context/noteContext";

const UploadForm = () => {
    const [dragActive, setDragActive] = useState(false);
    const [data, setData] = useState({
        file: false,
        class: "BCA_1",
        subject: false,
        fileName: "",
        format: "",
    });

    const { user, bPORT } = useContext(noteContext);

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
                <option>Select</option>
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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const form = new formData();

        if (data.fileName.split(".").pop() !== data.format) {
            form.append("fileName", data.fileName + "." + data.format);
        } else {
            form.append("fileName", data.fileName);
        }
        form.append("data", data.file[0]);
        form.append("class", data.class);
        form.append("subject", data.subject);
        form.append("name", user.name);
        form.append("uid", user.uid);
        form.append("format", data.format);

        axios.post(`${bPORT}/api/newpost`, form);

        setData({ file: false, class: "BCA_1", subject: false, fileName: "" });
    };

    let name, value;
    const onChangeHandler = (e) => {
        name = e.target.name;
        value = e.target.value;

        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(dragActive);
    }, [dragActive]);

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
        <form
            className="upload-form"
            onDragEnter={dragHandler}
            onSubmit={onSubmitHandler}
        >
            <input
                ref={inputRef}
                className="file-select"
                type="file"
                name="file"
                id="file"
                accept=".pdf, .docs, .txt"
                onChange={handleChange}
            />

            <label
                onClick={onButtonClick}
                id="label-file-select"
                htmlFor="file-select"
                className={dragActive ? "drag-active" : ""}
            >
                {data.file ? (
                    <p>File Selected {data.file[0].name}</p>
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

            <div className="cls-tag-container">
                <div>
                    <label htmlFor="class">Class: </label>
                    {renderClassOptions()}
                    {renderSubjectOption()}
                </div>

                <div>
                    <label htmlFor="tags">File Name: </label>
                    <input
                        className="name-upload"
                        type="text"
                        onChange={onChangeHandler}
                        value={data.fileName}
                        name="fileName"
                        id="fileName"
                    />
                </div>
            </div>
            <button type="submit" className="submit btn" value="submit">
                Upload
            </button>
        </form>
    );
};

export default UploadForm;
