import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
 
const App = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("https://notes-maker-server.vercel.app")
            .then((response) => setNotes(response.data))
            .catch((error) => console.error("Error fetching notes:", error));
    }, []);

    const handleAddNote = () => {
        axios
            .post("https://notes-maker-server.vercel.app", { title, content })
            .then((response) => {
                setNotes([...notes, response.data]);
                setTitle("");
                setContent("");
            })
            .catch((error) => console.error("Error adding note:", error));
    };

    const handleEditNote = (id, updatedTitle, updatedContent) => {
        axios
            .put(`https://notes-maker-server.vercel.app/${id}`, {
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
            .delete(`https://notes-maker-server.vercel.app/${id}`)
            .then((response) => {
                const updatedNotes = notes.filter((note) => note._id !== id);
                setNotes(updatedNotes);
            })
            .catch((error) => console.error("Error deleting note:", error));
    };
    
    return (
        <div className="app-container">
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
        </div>
    );
};
 
export default App;