import { useState } from "react";

const NoteManager = (props) => {
  const [notes, setNotes] = useState(props.initialNotes);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    const value = parseFloat(newNote);
    if (!isNaN(value) && value >= 0 && value <= 20) {
      setNotes([...notes, value]);
      setNewNote("");
    }
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const average = notes.length ? (notes.reduce((acc, n) => acc + n, 0) / notes.length).toFixed(2) : "N/A";

  return (
    <div>
      <input
        type="number"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={addNote}>Ajouter Note</button>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note} <button onClick={() => removeNote(index)}>❌</button>
          </li>
        ))}
      </ul>
      <p>Moyenne: {average}</p>
    </div>
  );
};

export default NoteManager;
