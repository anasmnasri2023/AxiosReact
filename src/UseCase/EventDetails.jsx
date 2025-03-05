import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getallEvents } from "../service/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import placeholder from "../assets/images/placeholder.jpg";

export default function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer l'ID de l'événement depuis l'URL ou l'état de navigation
  const { id } = useParams();
  const location = useLocation();
  const eventFromState = location.state?.event;

  // Charger les détails de l'événement
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Si l'événement est passé via la navigation d'état, l'utiliser directement
        if (eventFromState) {
          setEvent(eventFromState);
          setLoading(false);
          return;
        }

        // Sinon, récupérer l'événement par son ID
        if (id) {
          const response = await getallEvents(id);
          setEvent(response.data);
        } else {
          throw new Error("Aucun identifiant d'événement trouvé");
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Impossible de charger les détails de l'événement");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, eventFromState]);

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (!event) {
    return <div className="text-warning text-center mt-5">Aucun événement trouvé</div>;
  }

  // Fonction pour gérer la réservation
  const handleBooking = () => {
    if (event.nbTickets > 0) {
      setEvent(prevEvent => ({
        ...prevEvent,
        nbTickets: prevEvent.nbTickets - 1,
        nbParticipants: prevEvent.nbParticipants + 1
      }));
    }
  };

  // Chemins d'image flexibles
  const getImagePath = () => {
    if (event.img) {
      // Essayer différents formats de chemin d'image
      const imagePaths = [
        `../assets/images/${event.img}`,
        event.img,
        placeholder
      ];

      for (let path of imagePaths) {
        try {
          return path;
        } catch {
          continue;
        }
      }
    }
    return placeholder;
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Img 
          variant="top" 
          src={getImagePath()}
          style={{ 
            height: 400, 
            objectFit: 'cover',
            backgroundColor: '#f4f4f4' 
          }}
        />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>
            <strong>Prix :</strong> {event.price} €
          </Card.Text>
          <Card.Text>
            <strong>Billets disponibles :</strong> {event.nbTickets}
          </Card.Text>
          <Card.Text>
            <strong>Participants :</strong> {event.nbParticipants}
          </Card.Text>
          <Card.Text>
            <strong>Description :</strong> {event.description}
          </Card.Text>
          <Button 
            variant="primary" 
            onClick={handleBooking}
            disabled={event.nbTickets === 0}
          >
            {event.nbTickets === 0 ? "Complet" : "Réserver"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}