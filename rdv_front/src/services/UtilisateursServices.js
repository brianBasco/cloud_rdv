
import { getDocs, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { query, where, setDoc } from "firebase/firestore";
// -------------------------------------------- Fonctions V2 faites par Claude :

// Fonction pour récupérer l'ID d'un document Utilisateur à partir de son email
// retourne : Utilisateur ou null
export async function getUtilisateurIdByEmail(db, email) {
    try {
        // Créer une référence à la collection utilisateurs
        const usersRef = collection(db, 'utilisateurs');

        // Créer une requête pour trouver le document avec l'email correspondant
        const q = query(usersRef, where('email', '==', email));

        // Exécuter la requête
        const querySnapshot = await getDocs(q);

        // Vérifier si un utilisateur a été trouvé
        if (!querySnapshot.empty) {
            // Retourner l'ID du premier document correspondant
            return querySnapshot.docs[0].id;
        }

        // Retourner null si aucun utilisateur n'est trouvé
        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur: ", error);
        throw error;
        //return null
    }
}

// exporter la liste des participations à partir de l'ID Utilisateur
export async function getUtilisateurParticipations(db, idUtilisateur) {
    try {
        // Accéder à la sous-collection 'participations' de l'utilisateur
        const participationsRef = collection(db, 'utilisateurs', idUtilisateur, 'participations');

        // Récupérer tous les documents de la sous-collection
        const querySnapshot = await getDocs(participationsRef);

        // Transformer le snapshot en tableau de données
        const participations = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return participations;
    } catch (error) {
        console.error('Erreur lors de la récupération des participations:', error);
        throw error;
    }
}



/**
 * Ajoute une participation à un utilisateur dans Firestore.
 * @param {Firestore} db - Instance Firestore.
 * @param {string} idUtilisateur - ID de l'utilisateur.
 * @param {string} idParticipation - ID du RDV à ajouter.
 */
export async function addUtilisateurParticipation(db, idUtilisateur, idParticipation) {
    try {
        const userRef = doc(db, "utilisateurs", idUtilisateur);

        await updateDoc(userRef, {
            participations: arrayUnion(idParticipation)
        });

        console.log("Participation ajoutée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la participation :", error);
        throw error;
    }
}

/**
 * Ajoute une participation à un utilisateur dans Firestore.
 * @param {Firestore} db - Instance Firestore.
 * @param {string} idUtilisateur - ID de l'utilisateur.
 * @param {string} idCreation - ID du Rdv créé à ajouter.
 */
export async function addUtilisateurCreation(db, idUtilisateur, idCreation) {
    try {
        const userRef = doc(db, "utilisateurs", idUtilisateur);

        await updateDoc(userRef, {
            creations: arrayUnion(idCreation)
        });

        console.log("Création ajoutée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la création à l'utilisateur :", error);
        throw error;
    }
}



// Fonction pour ajouter un nouvel utilisateur, retourne l'ID du nouvel utilisateur
export async function addUtilisateur(db, email) {
    try {
        // Créer un nouveau document avec un ID généré automatiquement
        const newUserRef = doc(collection(db, 'utilisateurs'));

        // Données initiales de l'utilisateur
        const userData = {
            email: email,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Créer le document utilisateur
        await setDoc(newUserRef, userData);

        // Retourner l'ID du nouvel utilisateur
        return newUserRef.id;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error;
    }
}