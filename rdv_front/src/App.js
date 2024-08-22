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
  const [listeRdvs, setListeRdvs] = useState([])


  const fetchParticipations = async (userId) => {
    try {
      // Référence à la collection des participations d'un utilisateur
      const participationsRef = collection(db, "users", userId, "participations");
      // Récupérer les documents
      const snapshot = await getDocs(participationsRef);
      // Transformer les données en un tableau d'objets
      const participationsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Mettre à jour l'état avec les participations
      setParticipations(participationsList);
    } catch (error) {
      console.error("Erreur lors de la récupération des participations :", error);
    }
  };


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
    console.log("montage")
    
    const fetchDoodleAndUser = async () => {
      try {
        
        // Récupérer le user Ju
        const userRef = doc(db, 'users', 'or1MJdj3JKfI0sbhMUIeU49zVj22');
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            setUser(userSnap.data());
            console.log("setter !!")
            console.log(user.participations)
            // Récupérer ses Rdvs :
            // pour chaque participation, il faut récupérer le rdv correspondant
            //fetchParticipations(userRef)
          } else {
            console.error("Pas d'utilisateur!");
          }
        }
        catch (error) {
        console.error('Error fetching user:', error);
        };
      }
        
        /*
        // Récupérer le document Doodle
        const doodleRef = doc(db, 'rdv', 'mios');
        const doodleSnap = await getDoc(doodleRef);
        console.log(doodleSnap);

        if (doodleSnap.exists()) {
          const doodleData = doodleSnap.data();
          setDoodle(doodleData);

          // Récupérer le document User référencé, doit récuéper Marie
          const userRef = doodleData.created_by;
          const userSnap = await getDoc(userRef);
          console.log(userSnap);

          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            console.error('No such user!');
          }
        } else {
          console.error('No such doodle!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    */

    fetchDoodleAndUser();
  }, []);
/*
    useEffect(() => {
    const fetchDoodleAndUser = async () => {
      try {
        // Récupérer le document Doodle
        const doodleRef = doc(db, 'rdv', 'mios');
        const doodleSnap = await getDoc(doodleRef);

        if (doodleSnap.exists()) {
          const doodleData = doodleSnap.data();
          setDoodle(doodleData);

          // Récupérer le document User référencé, doit récuéper Marie
          const userRef = doodleData.created_by;
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            console.error('No such user!');
          }
        } else {
          console.error('No such doodle!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDoodleAndUser();
  }, []);
  */

  return (
    
    <div>
     { user ? (
        <div>
          <h2>Created by: {user.nom}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    {/*}
      {doodle && user ? (
        <div>
          <h1>Doodle: {doodle.lieu}</h1>
          <h2>Created by: {user.nom}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
       */}

       {/* 
      <Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>
    

      <ModalComponent show={show} handleClose={handleClose} handleSave={handleSave} />
      */}

      <div>
        <h2>Mes participations</h2>
        <ul>
          {participations.map((participation) => (
            <li key={participation.id}>
              {participation.eventName} - {participation.date} - {participation.status}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
