# Etat de la bdd

## Models :

### AUthentication :
- identifiant : email
- UID : String

### Utilisateurs :
- id : user.uid
- nom : string
A une collection de participations :
    #### Participations :
    - id : rdv.id

### rdv :
- created_at : date
- created_by : user.uid
- nom : string
- lieu : string
- jour : date
- heure_debut : time
- heure_fin : Time
# config :
# nombre min = minimum de participants à participer pour valider le rdv
nbre_min = (default=0)
#createur_participe = (default=False)

## users

- ju
- marie
- seb (User auth)
- sego

## Rdv mios (créé par Marie)

- ju : Présent
- Ségo : absent

## VSBA (créé par Marie)

- Ju : Présent

# Modèle V2 :

// Collection Users -- Pour l'Authentification avec Firebase
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password": "hashed_password",
}

// Collection Utilisateurs
{
  "_id": "users_id",
  "email": "user@example.com",
  "nom": "Seb",
  "participations": [
    {
      "rdv_id": ObjectId("...")
    },
  ],
  "creations": [
    {
      "rdv_id": ObjectId("...")
    },
  ],
}

// Collection RDV
{
  "_id": "ObjectId("...")",
  "title": "Réunion projet",
  "description": "Discussion mensuelle",
  "createdBy": Utilisateur_id, // Référence à Utilisateurs._id
  "startDate": ISODate("2024-02-07T14:00:00Z"),
  "endDate": ISODate("2024-02-07T15:00:00Z"),
  "location": {
    "type": "virtual|physical",
    "details": "Lien zoom ou adresse"
  },
  "participants": [
    {
      "type": "registered", // Utilisateur enregistré
      "utilisateur_id": ObjectId("..."), // Référence à utilisateurs._id
      "status": "accepted|pending|declined",
      "nom": "Seb
    }
  ]
}