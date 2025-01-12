import React from 'react';
import { getAuth, signOut } from "firebase/auth";

function Header() {

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log("Déconnecté avec succès");
            // Vous pouvez rediriger ou mettre à jour l'état ici
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };


    return (
        <div className="App-header">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex">

                    <span className="navbar-brand mb-0 h1">Logo</span>


                    <nav className="nav">
                        <a className="nav-link active" aria-current="page" href="/">RDV!</a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Gérer ses Rendez-vous</a></li>
                                <li><a className="dropdown-item" href="/">Contacts</a></li>
                            </ul>
                        </li>
                    </nav>



                    <span className="navbar-text ms-auto">

                        <button type="button" className="btn btn-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg></button>

                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Déconnexion
                        </button>
                    </span>

                </div>


            </nav>
        </div>
    );
}

const styles = {

    logoutButton: {
        backgroundColor: "#ff5c5c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 15px",
        cursor: "pointer",
    },
};

export default Header;

