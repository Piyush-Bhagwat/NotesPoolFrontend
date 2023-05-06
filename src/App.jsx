import React from "react";
import "./assets/stylesheet/app.css";
import UploadForm from "./components/UploadForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteContextProvider from "./context/noteContext";
import HomePage from "./pages/homePage/homePage";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/adminPage";
import UploadPage from "./pages/UploadPage/UploadPage";

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
                    </Routes>
                </Router>
            </NoteContextProvider>
        </div>
    );
}

export default App;
