const BuggyComponent = () => {
    throw new Error("Erreur simulée !");
    return <div>Ce contenu ne sera jamais rendu.</div>;
};

export default BuggyComponent;