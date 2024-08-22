import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Participations = ({ userId }) => {
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const fetchParticipations = async () => {
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

    fetchParticipations();
  }, [userId]);

  return (
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
  );
};

export default Participations;
