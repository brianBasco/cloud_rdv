import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Modal, Button } from 'react-bootstrap'; // Importer les composants Bootstrap
import './Auth.css'; // Importer le fichier CSS

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Ajouter confirmPassword
    const [isRegistering, setIsRegistering] = useState(false);
    const [showModal, setShowModal] = useState(false); // État pour afficher la modal
    const [modalMessage, setModalMessage] = useState(''); // Message de la modal
    const [emailBorderColor, setEmailBorderColor] = useState(''); // État pour la bordure de l'email
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setModalMessage('Passwords do not match');
            setShowModal(true);
            return;
        }
        if (!/^(?=.*\d).{8,}$/.test(password)) {
            setModalMessage('Password must be at least 8 characters long and contain at least one number');
            setShowModal(true);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setModalMessage('User registered successfully');
            setShowModal(true);
            navigate('/'); // Rediriger vers la page principale
        } catch (error) {
            console.error('Error registering user:', error);
            setModalMessage('Error registering user');
            setShowModal(true);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setModalMessage('User logged in successfully');
            setShowModal(true);
            navigate('/'); // Rediriger vers la page principale
        } catch (error) {
            console.error('Error logging in user:', error);
            setModalMessage('Error logging in user');
            setShowModal(true);
        }
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            setEmailBorderColor('green');
        } else {
            setEmailBorderColor('red');
        }
    };

    return (
        <div className="auth-container">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                style={{ borderColor: emailBorderColor }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isRegistering && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}
            <button onClick={isRegistering ? handleRegister : handleLogin}>
                {isRegistering ? 'Register' : 'Login'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Auth;