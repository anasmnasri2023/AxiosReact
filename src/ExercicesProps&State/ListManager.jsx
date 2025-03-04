import { useState } from "react";

const ListManager = (props) => {
  const [items, setItems] = useState(props.initialItems);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

   // Supprimer un élément
   const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Ajouter</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}
          <button onClick={() => removeItem(index)}>❌</button> </li>
        ))}
      </ul>
    </div>
  );
};

export default ListManager;
