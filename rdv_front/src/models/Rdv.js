import { serverTimestamp } from "firebase/firestore"; // Si tu utilises Firebase

/**
 * Modèle représentant un rendez-vous.
 */
class Rdv {
    /**
     * @param {string} title - Le titre du rendez-vous.
     * @param {Date} date - La date du rendez-vous.
     * @param {string} description - La description du rendez-vous.
     * @param {string} created_by - L'identifiant ou nom du créateur.
     */
    constructor(title, date, description, created_by) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.created_by = created_by;
        this.created_at = serverTimestamp(); // Génère un timestamp au moment de la création
    }

    /**
     * Retourne une description formatée du rendez-vous.
     * @returns {string}
     */
    getSummary() {
        return `📅 ${this.title} - ${this.date.toLocaleDateString()} \n📝 ${this.description}`;
    }
}

export default Rdv;
