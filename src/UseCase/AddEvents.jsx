import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addEvent } from "../service/api";
import { useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; 

const EventSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.any(), 
    nbtickets: z.number().min(1, "At least 1 ticket is required"),
    price: z.number().min(0, "Price must be positive"),
});

export default function AddEvent() {
    const navigate = useNavigate(); 
    const {
        register,
        handleSubmit,  
    } = useForm({
        resolver: zodResolver(EventSchema),
    });

    const onSubmit = (data) => {
        console.log(data);

        addEvent({
            name: data.name,
            description: data.description,
            image: data.image?.[0]?.name || "", 
            nbtickets: data.nbtickets,
            price: data.price,
            nbParticipants: 0,
            like: false,
        })
       if (result.status === 201) {
            navigate("/events"); 
        }
    };

    return (
        <Container className='mt-5'>



        <h1>Add Event</h1>
        <Form onSubmit={handleSubmit(addEvent)}>


            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Form.Label>Name </Form.Label>

                <Form.Control type="text" placeholder="Enter name" {...register("name")} />


            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Form.Label>Description </Form.Label>

                <Form.Control type="text" placeholder="Enter description" {...register("description")} />

                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label>Image </Form.Label>

                    <Form.Control type="file" placeholder="Enter image" {...register("img")} />



                </Form.Group>

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Form.Label>Number of tickets </Form.Label>

                <Form.Control type="number" placeholder="Enter number of tickets"  {...register("nbTickets")} />



            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Form.Label>price </Form.Label>

                <Form.Control type="number" placeholder="Enter number"   {...register("price")} />



            </Form.Group>

            <Button variant="primary" type="submit">

                Submit

            </Button>

        </Form>

    </Container>

    );
}
