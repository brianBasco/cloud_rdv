//import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalComponent = ({ show, handleClose, handleSave }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div id="RdvForm">


<div className="container">
    <div className="form-text">Les champs marqués d'une étoile <b>(*)</b> sont obligatoires</div>
</div>

<form className="form p-2" >
    
    <div className="mb-3">
        <label className="form-label">Nom</label>
        <span><b>*</b></span>
        
    </div>

    <div className="mb-3">
        <label className="form-label">Date</label>
        <span><b>*</b></span>
        
    </div>
    <div className="mb-3">
        <label className="form-label">form.heure</label>
        <span><b>*</b></span>
        
    </div>
    <div className="mb-3">
        <label className="form-label">form.heure_fin.label</label>
        <span className="form-text">(Optionnel)</span>
        
    </div>

    <div className="mb-3">
        <label className="form-label">Lieu</label>
        <span><b>*</b></span>
       
    </div>
    <div className="mb-3 form-check">
        <label className="form-check-label" for="createur_participe">Vous participez ?</label>
        <input type="checkbox" className="form-check-input" id="createur_participe" name="createur_participe" checked />
    </div>

    <button type="submit" className="btn btn-primary">Créer RDV</button>


</form>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;