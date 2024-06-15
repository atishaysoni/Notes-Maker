import React from "react";

const NoteList = ({ notes, username, password, onEditNote, onDeleteNote }) => {
    return (
        <ul>
            {notes.map((note) => (
                (note.username === username && note.password === password && note.title !== undefined) ?
                    <li key={note._id}>
                    <strong>{note.title
                    }</strong>
                    <p>{note.content}</p>
                    <button
                        className="button2"
                        style={{ marginRight: "15px" }}
                        onClick={() =>
                            onEditNote(
                                note._id,
                                prompt("Enter updated title:", note.title),
                                prompt("Enter updated content:", note.content)
                            )
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="button2"
                        onClick={() => onDeleteNote(note._id)}
                    >
                        Delete
                    </button>
                </li> : null
                
            ))}
        </ul>
    );
};
 
export default NoteList;