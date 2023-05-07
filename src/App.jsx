import React from "react";
import "./assets/stylesheet/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteContextProvider from "./context/noteContext";
import HomePage from "./pages/homePage/homePage";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/adminPages/adminPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import AdminHome from "./pages/adminPages/adminHome";
import UserUpload from "./pages/userUpload/userUpload";
import SavedNotes from "./pages/SavedNotes/savedNotes";

function App() {
    return (
        <div className="body">
            <NoteContextProvider>
                <Router>
                    <NavBar />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/upload" element={<UploadPage />} />
                        <Route path="/adminpi" element={<AdminPage />} />
                        <Route path="/userupload" element={<UserUpload />}/>
                        <Route path="/savednotes" element={<SavedNotes />}/>
                        <Route path="/adminpi/home" element={<AdminHome />} />
                    </Routes>
                </Router>
            </NoteContextProvider>
        </div>
    );
}

export default App;
