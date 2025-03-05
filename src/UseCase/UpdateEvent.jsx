import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEventById, editEvent } from "../service/api";

// Schéma de validation avec Zod
const EventSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  price: z.preprocess(
    (val) => Number(val) || 0,
    z.number().min(1, "Le prix doit être compris entre 1 et 1000.").max(1000, "Le prix ne peut pas dépasser 1000.")
  ),
  nbTickets: z.preprocess(
    (val) => Number(val) || 0,
    z.number().min(1, "Le nombre de tickets doit être compris entre 1 et 100.").max(100, "Le nombre de tickets ne peut pas dépasser 100.")
  ),
  image: z
    .any()
    .refine((file) => !file || (file.length > 0 && file[0].size <= 5 * 1024 * 1024), {
      message: "L'image ne doit pas dépasser 5MB.",
    }),
});

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EventSchema),
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id);
        if (event) {
          setValue("name", event.name);
          setValue("description", event.description);
          setValue("nbTickets", event.nbTickets);
          setValue("price", event.price);
        }
      } catch (err) {
        setError("Échec de la récupération des détails de l'événement.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedEvent = {
        id,
        name: data.name,
        description: data.description,
        img: data.image?.[0]?.name || "",
        nbTickets: parseFloat(data.nbTickets),
        price: parseFloat(data.price),
      };

      await editEvent(id, updatedEvent);
      setSuccess(true);
      setTimeout(() => navigate("/events"), 2000);
    } catch (err) {
      setError("Une erreur est survenue lors de la mise à jour de l'événement.");
    }
  };

  if (loading) return <Spinner animation="border" role="status" />;

  return (
    <Container className="mt-5">
      <h1>Modifier l'événement</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Événement mis à jour avec succès !</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" {...register("name")} />
          {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" {...register("description")} />
          {errors.description && <Form.Text className="text-danger">{errors.description.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prix</Form.Label>
          <Form.Control type="number" {...register("price")} />
          {errors.price && <Form.Text className="text-danger">{errors.price.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre de Tickets</Form.Label>
          <Form.Control type="number" {...register("nbTickets")} />
          {errors.nbTickets && <Form.Text className="text-danger">{errors.nbTickets.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" {...register("image")} />
          {errors.image && <Form.Text className="text-danger">{errors.image.message}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">Update</Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate("/events")}>Cancel</Button>
      </Form>
    </Container>
  );
}
