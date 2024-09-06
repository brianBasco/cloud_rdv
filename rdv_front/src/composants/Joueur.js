import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase.js';

const Joueur = ( {joueur} ) => {

console.log(joueur.id);

  return (
    <div>
     <p>{joueur.data.nom}</p>
     {/* <p>{joueur.data.statut}</p> */}

    </div>
  );
};

export default Joueur;
