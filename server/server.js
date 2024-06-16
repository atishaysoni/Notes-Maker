const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: ["https://notes-maker-client.vercel.app"],
	methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
	credentials: true
}));

app.use(bodyParser.json());

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Note = mongoose.model("Note", {
	username: String,
	password: String,
	title: String,
	content: String,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
	res.send("Hello, this is the root!");
});

app.get("/api/notes", async (req, res) => {
	try {
		const notes = await Note.find();
		res.json(notes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/api/notes/authenticate", async (req, res) => {
	const {username, password} = req.body;
	const note = await Note.find({username, password})
	try{
		if(note.length > 0){
			res.status(200).json(note);
		}else{
			const newRegister = new Note({username, password})
			const register = await newRegister.save();
			res.status(201).json(register);
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.post("/api/notes/add", async (req, res) => {
	const { username, password, title, content } = req.body;
	const note = new Note({ username, password, title, content });
	try {
		const newNote = await note.save();
		res.status(201).json(newNote);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.put("/api/notes/edit/:id", async (req, res) => {
	const { title, content } = req.body;
	const noteId = req.params.id;
	try {
		const updatedNote = await Note.findByIdAndUpdate(
			noteId,
			{ title, content },
			{ new: true }
		);
		res.json(updatedNote);
	} catch (error) { 
		res.status(404).json({ message: "Note not found" });
	}
});


app.delete("/api/notes/delete/:id", async (req, res) => {
	const noteId = req.params.id;
	try {
		await Note.findByIdAndDelete(noteId);
		res.json({ message: "Note deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Note not found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

console.log("Server started");
