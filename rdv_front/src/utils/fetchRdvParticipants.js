/*

const fetchRdvParticipations = async (rdv) => {
    try {
      const ref = collection(db, "rdv", rdv.id, "joueurs");
      // Récupérer les documents
      const snapshot = await getDocs(ref);
      // Transformer les données en un tableau d'objets
      const liste = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return liste;
    } catch (error) {
      console.error("Erreur lors de la récupération des joueurs :", error);
    }
  };

  export default fetchRdvParticipations;
  */