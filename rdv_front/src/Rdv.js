import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

import { db } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';


function Rdv(rdvId) {

    const [rdv, setRdv] = useState(null);
 
  useEffect(() => {
    console.log("montage Rdv")
    
    const fetchRdv = async (rdvId) => {
      try {
        const rdvRef = doc(db, 'rdv', rdvId);
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

    fetchRdv(rdvId);
  }, []);

  return (
    
    <div>
     { rdv ? (
        <div>
          <h2>Created by: {rdv.created_by}</h2>
          <p>{rdv.lieu}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Rdv;
