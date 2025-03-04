import React, { useEffect, useState } from "react";
import Event from "./Event";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { getallEvents } from "../service/api";

export default function Events() {
  const [showAlert, setShowAlert] = useState(false);
  const [welcomeAlert, setWelcomeAlert] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvenement = async () => {
      try {
        const result = await getallEvents();
        setEvents(result.data);  // Stocker les événements récupérés
        console.log(result.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };
    fetchEvenement();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const showAlertBook = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div>
      {welcomeAlert && <Alert variant="info">Welcome to our App EVENT</Alert>}
      {showAlert && <Alert variant="info">You have booked an event!</Alert>}
      <Row>
        {events.length == 0 && events.map((eventItem, index) => (
          <Event key={index} event={eventItem} fnt={showAlertBook} />
        ))}
      </Row>
    </div>
  );
}
