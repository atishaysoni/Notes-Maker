import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import Authentication from "./components/Authentication";
 
const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);

    axios.defaults.withCredentials = true;

    const handleAuthentication = () => {
        axios
            .post("https://notes-maker-server.vercel.app/api/notes/authenticate", { username, password })
            .then((response) => {
                if(response.status === 200){
                    setAuthenticated(true);
                    setNotes(response.data);
                }else if(response.status === 201){
                    setAuthenticated(true);
                    setNotes([response.data]);
                }
            })
            .catch((error) => console.error("Authentication error", error));
    }

    const handleAddNote = () => {
        axios
            .post("https://notes-maker-server.vercel.app/api/notes/add", { username, password, title, content })
            .then((response) => {
                setNotes([...notes, response.data]);
                setTitle("");
                setContent("");
            })
            .catch((error) => console.error("Error adding note:", error));
    };

    const handleEditNote = (id, updatedTitle, updatedContent) => {
        axios
            .put(`https://notes-maker-server.vercel.app/api/notes/edit/${id}`, {
                title: updatedTitle,
                content: updatedContent,
            })
            .then((response) => {
                const updatedNotes = notes.map((note) =>
                    note._id === id ? response.data : note
                );
                setNotes(updatedNotes);
            })
            .catch((error) => console.error("Error updating note:", error));
    };

    const handleDeleteNote = (id) => {
        axios
            .delete(`https://notes-maker-server.vercel.app/api/notes/delete/${id}`)
            .then((response) => {
                const updatedNotes = notes.filter((note) => note._id !== id);
                setNotes(updatedNotes);
            })
            .catch((error) => console.error("Error deleting note:", error));
    };
    
    return (
        <div>
            {isAuthenticated ? <div className="app-container">
            <h1>Notes App</h1>
            <AddNote
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                onAddNote={handleAddNote}
            />
            <NoteList
                notes={notes}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
            />
        </div> : <div className="app-container">
            <Authentication username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                onAuthentication={handleAuthentication}
            />
            </div>}
        </div>
        
    );
};
 
export default App;