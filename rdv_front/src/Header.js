import React from 'react';

function Header() {
    return (
        <div className="App-header">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container d-flex">

                    <span className="navbar-brand mb-0 h1">Logo</span>


                    <nav className="nav">
                        <a className="nav-link active" aria-current="page" href="{% url 'home' %}">RDV!</a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="{% url 'gerer_rdvs' %}">Gérer ses Rendez-vous</a></li>
                                <li><a className="dropdown-item" href="{% url 'contacts' %}">Contacts</a></li>
                                <li><a className="dropdown-item" href="{% url 'test_download' %}">Télécharger ics</a></li>
                            </ul>
                        </li>
                    </nav>


                    
                    <span className="navbar-text ms-auto">

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalStatic"
                            hx-get="{% url 'x_get_profil' %}" hx-target="#modalStatic"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg></button>
                    </span>

                </div>

               
            </nav>
        </div>
    );
}

export default Header;

