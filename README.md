# Front de gestion de lightsail de cicd

# Description
Cet outil permet de gérer voir l'état et de gérer les lightsails déployé dans le cas de la cicd d'un projet.

# Secret
Plusieurs secrets sont attendus.

- PROJECT_TAG : le tag à utiliser pour identifier les lightsails concernés
- PROJECT_ACCESS_KEY_ID : id de l'utilisateur iam associé au projet
- PROJECT_SECRET_ACCESS_KEY : secret de l'utilisateur iam associé au projet
- PROJECT_SCHEDULER_GROUP : nom du groupe des scheduler

# en dev :
Penser à ajouter les secrets à la sandbox

 npx ampx sandbox secret set PROJECT_TAG
 npx ampx sandbox secret set PROJECT_ACCESS_KEY_ID
 npx ampx sandbox secret set PROJECT_SECRET_ACCESS_KEY