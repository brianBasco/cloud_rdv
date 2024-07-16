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
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

const App = () => {

  const [doodle, setDoodle] = useState(null);
  const [user, setUser] = useState(null);

    // states pour le Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    // Logic for saving changes
    setShow(false);
  };

   // Fonction pour rajouter des données au user :
   const ajout = () => {
    // Données supplémentaires à ajouter
const additionalUserInfo = {
    name: "John Doe",
    address: "123 Main St",
    phoneNumber: "+1234567890"
};
//const [documentData, setDocumentData] = useState(null);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid)
    getU(uid);
  } else {
    // User is signed out
    // ...
  }
});



};

const getU = async(uid) => {
  const citiesRef = collection(db, "users");
// Create a query against the collection.
const q = query(citiesRef, where("userRef", "==", uid));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
}

  useEffect(() => {

// Authentification du User, exemple Seb
const auth = getAuth();
signInWithEmailAndPassword(auth, "seb@gmail.com", "jordan")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("credentials erronés")
  });

 

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

  return (
    <div>
      {doodle && user ? (
        <div>
          <h1>Doodle: {doodle.lieu}</h1>
          <h2>Created by: {user.nom}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>

      <Button variant="primary" onClick={ajout}>Ajouter infos user</Button>

      <ModalComponent show={show} handleClose={handleClose} handleSave={handleSave} />
    </div>
  );
};

export default App;
