import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addEvent } from "../service/api"; // Assurez-vous que cette fonction existe

// Schéma de validation
const EventSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.any(),
    nbTickets: z.preprocess((val) => Number(val) || 0, z.number().min(1, "At least 1 ticket is required")),
    price: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Price must be positive")),
});

export default function AddEvent() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(EventSchema),
    });

    const onSubmit = async (data) => {
        try {
            const eventData = {
                name: data.name,
                description: data.description,
                img: data.image?.[0]?.name || "",
                nbTickets: data.nbTickets,
                price: data.price,
                nbParticipants: 0,
                like: false,
            };

            console.log("Données envoyées :", eventData);
            const result = await addEvent(eventData);

            if (result && result.status === 201) {
                setSuccess(true);
                setError(null);
                setTimeout(() => navigate("/events"), 2000);
            } else {
                throw new Error("Échec de l'ajout de l'événement");
            }
        } catch (err) {
            setError(err.message || "Une erreur s'est produite");
            setSuccess(false);
        }
    };

    return (
        <Container className="mt-5">

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Événement ajouté avec succès !</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a Name" {...register("name")} />
                    {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter description" {...register("description")} />
                    {errors.description && <Form.Text className="text-danger">{errors.description.message}</Form.Text>}
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="0" {...register("price")} />
                    {errors.price && <Form.Text className="text-danger">{errors.price.message}</Form.Text>}
                </Form.Group>

                {/* Number of Tickets */}
                <Form.Group className="mb-3">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control type="number" placeholder="0" {...register("nbTickets")} />
                    {errors.nbTickets && <Form.Text className="text-danger">{errors.nbTickets.message}</Form.Text>}
                </Form.Group>

                {/* Image */}
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" {...register("image")} />
                </Form.Group>

                {/* Buttons */}
                <Button variant="primary" type="submit">
                    Add an Event
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate("/events")}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}
