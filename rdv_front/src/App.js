import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from './middlewares/AuthContext';
import { db } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Rdv2 from './composants/Rdv2';

import fetchRdvParticipations from './utils/fetchRdvParticipants';
import Header from './composants/Header';
import ModalRdvForm from './composants/ModalRdvForm';
import { redirect } from 'react-router-dom';

/*
But de l'application :
s'Authentifier avec l'utilisateur Ju
récupère les rdvs de Ju : Mios et VSBA
Afficher les participants de Mios et VSBA

*/

function App() {

  const [participations, setParticipations] = useState([]);

  // ----------- Modal ------------
  const [showModal, setShowModal] = useState(false);
  //const [isSubmitted, setIsSubmitted] = useState(false);
  const handleShow = () => {
    //   setIsSubmitted(false); // Réinitialisation du formulaire
    setShowModal(true);
  }
  const handleClose = () => setShowModal(false);
  const { currentUser } = useAuth();


  // 1. Chercher les particpations liées à l'utilisateur connecté
  useEffect(() => {
    const fetchUserParticipations = async (userId) => {
      console.log(`Récupération des participations de l'utilisateur ${currentUser.uid}...`);

      if (!currentUser || !currentUser.uid) {
        //console.error("Utilisateur non connecté ou UID manquant");
        alert("Un problème est survenu, veuillez vous reconnecter");
      }

      try {
        // Référence à la sous-collection "participations" sous un document "user"
        const participationsRef = collection(db, "users", currentUser.uid, "participations");

        // Récupérer tous les documents de la sous-collection
        const querySnapshot = await getDocs(participationsRef);

        // Transformer les documents en un tableau d'objets
        const participations = querySnapshot.docs.map(doc => { return { id: doc.id } });
        console.log("Participations récupérées :", participations);

        // Retourner ou utiliser les données comme vous le souhaitez
        //return participations;
        setParticipations(participations);
      } catch (error) {
        console.error("Erreur lors de la récupération des participations :", error);
      }
    };

    fetchUserParticipations();
  }, [currentUser]);

  return (

    <div>
      <Header />

      <div className="container mt-4">
        <Button variant="primary" onClick={handleShow}>
          Ajouter un RDV
        </Button>
      </div>

      <ModalRdvForm showModal={showModal} handleClose={handleClose} currentUser={currentUser} />

      <div>
        <h2>Mes participations</h2>
        {participations.length === 0 ? (
          <p>Chargement des participations...</p>
        ) : (
          <ul>
            {participations.map((rdv) => (
              <Rdv2 key={rdv.id} id={rdv.id} />
            ))}
          </ul>
        )}

      </div>

    </div>
  );
};

export default App;
