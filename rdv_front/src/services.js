import { getDocs, collection } from "firebase/firestore";
import { db } from './firebase.js';

// Fetch all appointments
export const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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