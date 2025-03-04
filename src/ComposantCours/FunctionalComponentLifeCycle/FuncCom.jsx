import { useEffect, useState } from "react"

export default function FuncCom(props) {

    const [count, setCount] = useState(0)
   
    
    useEffect(() => {
        console.log('I m rendering 1')
        console.log(count)
       return ()=> { console.log("I m unmouting")}
    }, [])
    useEffect(() => {
        console.log('I m rendering 2')
        console.log(count)
    }, [count])
   
    useEffect(() => {
        console.log('I m rendering 3')
        console.log(count)
    })

    const increment = () => {
        setCount(count+1)
    }

    const decrement = () => {
        
        setCount(count-1)
    }
    

    // console.log(count)
    // console.log(props)
    return (
        <>
             <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button> 
            {count}
         
        </>
    )
}