import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Rdv2 from './composants/Rdv2';

import fetchRdvParticipations from './utils/fetchRdvParticipants';
import Header from './composants/Header';

/*
But de l'application :
s'Authentifier avec l'utilisateur Ju
récupère les rdvs de Ju : Mios et VSBA
Afficher les participants de Mios et VSBA

*/

function App() {



  //const [user_auth, setUser_auth] = useState('or1MJdj3JKfI0sbhMUIeU49zVj22');
  //const [doodle, setDoodle] = useState(null);
  const [user, setUser] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [rdvs, setRdvs] = useState([]);

  // ----------- Modal ------------
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add RDV
    console.log('RDV ajouté:', { title, date, location });
    handleClose();
  };

  // ----------- Authentification ------------
  // 2. Chercher les Rdvs liés au user_auth : Ju
  useEffect(() => {

    const fetchUser = async () => {
      console.log("montage du User");

      try {

        // Récupérer le user Ju
        const userRef = doc(db, 'users', 'or1MJdj3JKfI0sbhMUIeU49zVj22');
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap);
        } else {
          console.error("Pas d'utilisateur!");
        }
      }
      catch (error) {
        console.error('Error fetching user:', error);
      };
    }

    fetchUser();


  }, []);

  //Fetch participations if user exists
  useEffect(() => {
    console.log("montage des participations");
    const fetchParticipations = async () => {
      try {
        // Référence à la collection des participations d'un utilisateur
        console.log(user.id)
        const participationsRef = collection(db, "users", user.id, "participations");
        // Récupérer les documents
        const snapshot = await getDocs(participationsRef);
        // Transformer les données en un tableau d'objets
        const participationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          rdv: doc.data().rdv,
          //...doc.data(),
        }));
        console.log(participationsList);
        // Mettre à jour l'état avec les participations
        setParticipations(participationsList);
      } catch (error) {
        console.error("Erreur lors de la récupération des participations :", error);
      }
    };
    if (user != null) {
      fetchParticipations();
    }
  }, [user])


  //Fetch rdv 
  useEffect(() => {
    const fetchRdv = async (rdvId) => {
      try {
        const rdvRef = doc(db, 'rdv', rdvId);
        const rdvSnap = await getDoc(rdvRef);
        if (rdvSnap.exists()) {
          //setRdv(rdvSnap.data());
          return rdvSnap;
        } else {
          console.error("Ce Rdv n'existe pas");
        }
      }
      catch (error) {
        console.error('Error fetching rdv:', error);
      };
    }

    // Fonction principale pour ajouter des éléments à la liste
    async function addElementsToList(ids) {
      const list = [];

      // Créer un tableau de promesses pour récupérer chaque élément
      const promises = ids.map(async (id) => {
        //const element = await fetchElement(id);
        const element = await fetchRdv(id.rdv);
        // element est un snapshot de rdv
        console.log(element.id)
        list.push({ id: element.id, data: element.data() })
      });

      // Attendre que toutes les promesses soient résolues
      await Promise.all(promises);

      // Retourner la liste une fois tous les éléments ajoutés
      return list;
    }

    // Utilisation de la fonction
    if (participations.length > 0) {
      addElementsToList(participations).then((result) => {
        console.log("Tous les éléments ont été récupérés :", result);
        setRdvs(result);
      });
    }

  }, [participations]);


  return (

    <div>
      <Header />
      {user ? (
        <div>
          <h2>Created by: {user.nom}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="container mt-4">
        <Button variant="primary" onClick={handleShow}>
          Ajouter un RDV
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un RDV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>


      <div>
        <h2>Mes participations</h2>
        <ul>
          {rdvs.map(
            (rdv) =>
              <Rdv2 key={rdv.id} rdv={rdv} />
          )}
        </ul>

      </div>

    </div>
  );
};

export default App;
