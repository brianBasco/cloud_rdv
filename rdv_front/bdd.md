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