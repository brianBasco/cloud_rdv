import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import Joueur from './Joueur.js';
import { fetchParticipants, fetchRdv } from '../services.js';

// Le composant Rdv2 doit afficher les participants d'un rendez-vous
// Celui-ci reçoit l'id du Rdv en props
const Rdv2 = ({ id }) => {

  //console.log(rdv);
  const [joueurs, setJoueurs] = useState([])
  const [rdv, setRdv] = useState(null);

  useEffect(() => {
    console.log("id du rdv :");
    const getRdv = async () => {
      const data = await fetchRdv(id);
      console.log(data);
      setRdv(data);
    }
    getRdv()
  }, [id]);

  // Au montage du composant celui-ci doit chercher les participants grâce à l'Id du rdv
  useEffect(() => {
    const getParticipants = async () => {
      const data = await fetchParticipants(id);
      setJoueurs(data);
    }
    getParticipants()
  },
    [id]);

  useEffect(() => {
    console.log("joueurs mis à jour :");
    console.log(joueurs[0]);
  }
    , [joueurs]);

  if (!rdv) {
    return <div>Le rdv n'existe pas...</div>; // Affiche un état de chargement si les données ne sont pas disponibles
  }

  return (
    <div>
      <div className="card" style={{ width: 18 + 'rem' }}>
        <div className="card-body">
          <h5 className="card-title">{id}</h5>
          <p className="card-text">{id}</p>
          <div>

            <h2>Joueurs</h2>

            {
              joueurs.map(
                (joueur, index) =>
                  <Joueur key={index} joueur={joueur} />
              )}


          </div>
        </div>
      </div>


    </div>
  );
};

export default Rdv2;
