import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from './firebase.js';

// Fetch all appointments
/*
export const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
*/

export const fetchRdv = async (rdvId) => {
    try {
        // Référence au document RDV
        const rdvRef = doc(db, "rdv", rdvId);

        // Récupérer les données du document RDV
        const rdvSnap = await getDoc(rdvRef);

        if (rdvSnap.exists()) {
            console.log("Document RDV trouvé :", rdvSnap.data());
            return rdvSnap.data(); // Retourner les données si le document existe
        } else {
            console.error(`Document RDV avec l'ID "${rdvId}" n'existe pas.`);
            return null; // Retour explicite si le document n'existe pas
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du RDV :", error);
        throw new Error("Une erreur est survenue lors de la récupération du RDV.");
    }
};

export const fetchParticipants = async (rdvId) => {
    console.log("montage des joueurs");
    const snapshot = await getDocs(collection(db, 'rdv', rdvId, 'joueurs'));
    return snapshot.docs.map((doc) =>
    (
        {
            id: doc.id,
            data: doc.data(),
        }
    ));
}