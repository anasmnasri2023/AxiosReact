import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/images/placeholder.jpg";
import { deleteEvent } from "../service/api"; 

export default function Event({ event, onDelete }) {
  const [eventState, setEventState] = useState(event);
  const navigate = useNavigate();

  const images = import.meta.glob("../assets/images/*", { eager: true });

  const getImagePath = (img) => {
    return eventState.nbTickets === 0
      ? images["../assets/images/sold_out.png"]?.default || placeholder
      : images[`../assets/images/${img}`]?.default || placeholder;
  };

  const book = () => {
    setEventState((prev) => ({
      ...prev,
      nbTickets: prev.nbTickets - 1,
      nbParticipants: prev.nbParticipants + 1,
    }));
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${eventState.name}"?`)) {
      try {
        await deleteEvent(eventState.id); 
        alert("Event deleted successfully!");
        onDelete(eventState.id); 
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <Col sm={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" style={{ height: 200 }} src={getImagePath(eventState.img)} />
        <Card.Body>
          <Card.Title>{eventState.name}</Card.Title>
          <Card.Text>Price: {eventState.price} $</Card.Text>
          <Card.Text>Tickets Left: {eventState.nbTickets}</Card.Text>
          <Card.Text>Participants: {eventState.nbParticipants}</Card.Text>

          <Button variant="primary" onClick={book} disabled={eventState.nbTickets === 0}>
            Book Event
          </Button>
          <Button variant="danger" onClick={() => setEventState((e) => ({ ...e, like: !e.like }))}>
            {eventState.like ? "DISLIKE" : "LIKE"}
          </Button>
          <Button variant="success" onClick={() => navigate(`/updateEvent/${eventState.id}`)}>
            Update
          </Button>
          <Button variant="warning" onClick={handleDelete}>
            Delete Event
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
