import { useState } from "react";
import { useParams } from "react-router-dom";
const ColorBox = (props) => {
  const {username,classe} = useParams();
  console.log(username);
  const [color, setColor] = useState(props.initialColor);

  const changeColor = () => {
    
    const randomIndex = Math.floor(Math.random() * props.colorOptions.length);
    setColor(props.colorOptions[randomIndex]);
  };

  return (
   <> 
   <h1>Valeur du param: {classe} {username}</h1>
   <button onClick={changeColor}>Changer de couleur</button>
    <div style={{ width: "100px", height: "100px", backgroundColor: color, margin: "10px auto" }}>
      
    </div></>
  );
};

export default ColorBox;
