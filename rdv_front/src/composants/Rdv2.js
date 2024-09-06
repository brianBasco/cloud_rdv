import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase.js';
import Joueur from './Joueur.js';

const Rdv2 = ( {rdv} ) => {

    console.log(rdv);
    const [joueurs, setJoueurs] = useState([])

    // Au montage du composant celui-ci doit chercher les participants grâce à l'Id du rdv
    useEffect( () => {
      const fetchParticipants = async () => {
        console.log("montage des joueurs");
        try{
          const ref = collection(db, 'rdv', rdv.id, 'joueurs');
          const snapshot = await getDocs(ref);
          const liste = snapshot.docs.map((doc) =>
          (
            {
              id: doc.id,
              data: doc.data(),
            }
          ));
          setJoueurs(liste);
        }
            catch (error) {
            console.error('Error fetching joueurs:', error);
            };
      }
    fetchParticipants()
  },
  [rdv]);

  useEffect( () => {
    console.log("joueurs mis à jour :");
    console.log(joueurs[0]);
  }
  , [joueurs]);

  return (
    <div>
      <div className="card" style={{width: 18 +'rem'}}>
  <div className="card-body">
    <h5 className="card-title">{rdv.data.nom}</h5>
    <p className="card-text">{rdv.data.lieu}</p>
    <div>
            
        <h2>Joueurs</h2>
                
          {
          joueurs.map(
            (joueur, index) => 
              <Joueur key={index} joueur={ joueur } />
          )}
            
        
      </div>
  </div>
</div>
         

    </div>
  );
};

export default Rdv2;
