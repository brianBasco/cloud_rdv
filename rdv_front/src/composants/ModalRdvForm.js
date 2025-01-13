import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';



const ModalRdvForm = ({ showModal, handleClose, currentUser }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (showModal) {
            setIsSubmitted(false); // Réinitialise isSubmitted lorsque le modal s'ouvre
        }
    }, [showModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("Vous devez être connecté pour ajouter un rendez-vous.");
            return;
        }

        try {
            const newAppointment = {
                //title,
                //date,
                //description,
                created_by: currentUser.uid, // Récupère uniquement l'UID, // L'UID de l'utilisateur connecté
                created_at: serverTimestamp(), // Date/heure générée par le serveur
            };

            await addDoc(collection(db, "rdv"), newAppointment);
            setIsSubmitted(true);
            //setTitle('');
            //setDate('');
            //setDescription('');
        } catch (err) {
            console.error("Erreur lors de l'ajout du rendez-vous :", err);
            //setError("Une erreur est survenue. Veuillez réessayer.");
        }
    };


    const renderContent = () => {
        if (isSubmitted) {
            return (
                <div className="text-center">
                    <h5>Rendez-vous ajouté avec succès !</h5>
                    <Button variant="primary" onClick={handleClose}>
                        Fermer
                    </Button>
                </div>
            );
        } else {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez le titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Lieu</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez le lieu"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </Form>
            );
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isSubmitted ? 'Succès' : 'Ajouter un RDV'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderContent()}
            </Modal.Body>
        </Modal>
    );
};

export default ModalRdvForm;
