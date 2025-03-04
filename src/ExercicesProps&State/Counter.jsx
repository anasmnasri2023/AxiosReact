import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Counter = (props) => {
  const [searchParam,setSearchParam]= useSearchParams({username:""})
  console.log(searchParam.get("username"));
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Compteur: {count} + Search Param {searchParam.get("username")}</h2>
      <button onClick={() => setCount(count + props.step)}>+{props.step}</button>
      <button onClick={() => setCount(count - props.step)}>-{props.step}</button>
    </div>
  );
};

export default Counter;
