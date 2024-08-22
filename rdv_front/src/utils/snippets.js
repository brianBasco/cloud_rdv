// Fonction pour rajouter des données au user :
const ajout = () => {
    // Données supplémentaires à ajouter
    const additionalUserInfo = {
        name: "John Doe",
        address: "123 Main St",
        phoneNumber: "+1234567890"
    };
    //const [documentData, setDocumentData] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log(uid)
            getU(uid);
        } else {
            // User is signed out
            // ...
        }
    });
};


const getU = async (uid) => {
    const citiesRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(citiesRef, where("userRef", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}


  // Exécution de la fonction après chargement du DOM
  useEffect(() => {

    // Authentification du User, exemple Seb
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "seb@gmail.com", "jordan")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("credentials erronés")
      });



    const fetchDoodleAndUser = async () => {
      try {
        // Récupérer le document Doodle
        const doodleRef = doc(db, 'rdv', 'mios');
        const doodleSnap = await getDoc(doodleRef);

        if (doodleSnap.exists()) {
          const doodleData = doodleSnap.data();
          setDoodle(doodleData);

          // Récupérer le document User référencé, doit récuéper Marie
          const userRef = doodleData.created_by;
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            console.error('No such user!');
          }
        } else {
          console.error('No such doodle!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDoodleAndUser();
  }, []);