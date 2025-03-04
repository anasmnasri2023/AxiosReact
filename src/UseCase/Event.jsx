import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import placeholder from "../assets/images/placeholder.jpg";
export default function Event(props) {
  const [event, setEvent] = useState(props.event);
  const images = import.meta.glob("../assets/images/*", { eager: true });
  // Works with ES Modules (unlike require()).
  // import.meta.glob("../assets/images/*" ==> tells vite to search for files in that folder
  // { eager: true } ==> to import files immediately and not wait for a promise

  const getImagePath = (img) => {

      return event.nbTickets===0
      ? images["../assets/images/sold_out.png"]?.default || placeholder 
        : images[`../assets/images/${img}`]?.default || placeholder;

  };
  const book=() => {
    props.fnt();
    setEvent((e)=> ({
...e,nbTickets :e.nbTickets-1,
nbParticipants:e.nbParticipants+1

    }))
  }
  return (
    <Col  sm={12} md={6} lg={3}>
      <Card>
        <Card.Img
          variant="top"
          style={{ height: 200 }}
          src={getImagePath(event.img)}
        
         
        />
        <Card.Body>
            
            <Card.Title>{event.name}</Card.Title>
        
          <Card.Text>Price : {event.price}</Card.Text>
          <Card.Text>Number of tickets : {event.nbTickets}</Card.Text>
          <Card.Text>Number of participants : {event.nbParticipants}</Card.Text>
          <Button variant="primary" onClick={book} disabled={event.nbTickets===0?true:false} >Book an event</Button>
          <Button variant="danger" onClick={()=>setEvent((e)=>({...e,like:!e.like}))}>{event.like ? "DISLIKE" : "LIKE"}</Button>
         
        </Card.Body>
      </Card>
    </Col>
  );
}







