import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase.js'; // Importer auth

const Joueur = ({ joueur }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    // Logique pour modifier le joueur
    console.log('Modifier le joueur:', joueur.id);
  };

  return (
    <div>
      <p>{joueur.data.nom}</p>
      {/* <p>{joueur.data.statut}</p> */}
      {currentUser && currentUser.displayName === joueur.data.nom && (
        <button onClick={handleEdit}>Modifier</button>
      )}
    </div>
  );
};

export default Joueur;
