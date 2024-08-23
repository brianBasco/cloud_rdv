import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import ModalComponent from './ModalComponent';
import { Button } from 'react-bootstrap';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Rdv from './Rdv';
import Rdv2 from './composants/Rdv2';
import fetchRdvParticipations from './utils/fetchRdvParticipants';

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


  


  /*
    // states pour le Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    // Logic for saving changes
    setShow(false);
  };
*/
  // Exécution de la fonction après chargement du DOM
  // 1. Authentification
  /*
  useEffect(() => {

    if(user_auth == null) {
    // Authentification du User, exemple Seb
    const auth = getAuth();
    //signInWithEmailAndPassword(auth, "seb@gmail.com", "jordan")
    signInWithEmailAndPassword(auth, "ju@gmail.com", "jordan")
      .then(
        (userCredential) => {
        // Signed in 
        //const userAuth = userCredential.user;
        //setUser_auth(userCredential.user);
        console.log("utilisateur identifié : ")
        console.log(userCredential.user.uid)
        setUser_auth(userCredential.user.uid);
      },
      (error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }}, []);
  */



  // 2. Chercher les Rdvs liés au user_auth : Ju
  useEffect(() => {
    console.log("montage du User")
    
    const fetchUser = async () => {
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
useEffect( ()=> {
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
  if(user != null) {
  fetchParticipations();
  }
},[user])


  //Fetch rdv 
  useEffect(() => {
    const fetchRdv = async (rdvId) => {
      try {
        const rdvRef = doc(db, 'rdv', rdvId);
        const rdvSnap = await getDoc(rdvRef);
        if (rdvSnap.exists()) {
            //setRdv(rdvSnap.data());
            return rdvSnap.data();
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
          list.push(element); // Ajouter l'élément récupéré à la liste
        });

        // Attendre que toutes les promesses soient résolues
        await Promise.all(promises);

        // Retourner la liste une fois tous les éléments ajoutés
        return list;
      }

      // Utilisation de la fonction
      if(participations.length > 0) {
      addElementsToList(participations).then((result) => {
        console.log("Tous les éléments ont été récupérés :", result);
        setRdvs(result);
      });
    }

  }, [participations]);

  // Fetch les joueurs du Rdv
  useEffect( () => {

    // Utilisation de la fonction
    if(rdvs.length > 0) {
      addElementsToList(rdvs).then((result) => {
        console.log("Tous les joueurs ont été récupérés :", result);
        setRdvs(result);
      });
    fetchRdvParticipations();
  },
   []);

  return (
    
    <div>
     { user ? (
        <div>
          <h2>Created by: {user.nom}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
   
       {/* 
      <Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>
    

      <ModalComponent show={show} handleClose={handleClose} handleSave={handleSave} />
      */}

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
