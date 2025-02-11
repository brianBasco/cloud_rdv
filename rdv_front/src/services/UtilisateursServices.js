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
        //throw error;
        return null
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
        //throw error;
        return null;
    }
}

export async function addUtilisateurParticipation(db, idUtilisateur, idParticipation) { }

export async function addUtilisateur(db, email, nom) {
    try {
        // Créer un nouveau document avec un ID généré automatiquement
        const newUserRef = doc(collection(db, 'utilisateurs'));

        // Données initiales de l'utilisateur
        const userData = {
            email: email,
            nom: nom,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Créer le document utilisateur
        await setDoc(newUserRef, userData);

        // Retourner l'ID du nouvel utilisateur
        return newUserRef.id;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        //throw error;
        return null;
    }
}