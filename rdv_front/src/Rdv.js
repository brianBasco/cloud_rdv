import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

import { db } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';


const Rdv = ( {rdvId} ) => {

    
    const [rdv, setRdv] = useState(null);
 
  useEffect(() => {
    console.log("montage Rdv")
    console.log(rdvId);
    const fetchRdv = async () => {
        
      try {
        //console.log(rdvId.path);
        const rdvRef = doc(db, 'rdv', rdvId.rdv);
        //const rdvRef = doc(db, 'rdv', rdvId.id);
        const rdvSnap = await getDoc(rdvRef);
        if (rdvSnap.exists()) {
            setRdv(rdvSnap.data());
          } else {
            console.error("Ce Rdv n'existe pas");
          }
        }
        catch (error) {
        console.error('Error fetching rdv:', error);
        };
      }

    fetchRdv();
    console.log(rdv);
  }, []);

  return (
    <div>
          
          <p>{rdv.lieu}</p>
    </div>

  
  );
};

export default Rdv;
