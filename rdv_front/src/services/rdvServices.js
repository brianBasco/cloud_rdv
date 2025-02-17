import Rdv from "../models/Rdv";

/**
 * Ajoute une participation à un utilisateur dans Firestore.
 * @param {Firestore} db - Instance Firestore.
 * @param {Rdv} newRdv - rdv à créer.
 */
export async function addRdv(db, newRdv) {
    try {
        await addDoc(collection(db, "rdv"), newRdv);
        console.log("Rdv ajouté avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'ajout du RDV :", error);
        throw error;
    }
}