# Note sur le dev d'application amplify

# ref
- https://docs.amplify.aws/react/start/manual-installation/
- https://docs.amplify.aws/react/deploy-and-host/sandbox-environments/features/


# clonage du projet
TODO

# sandbox
- on peut travailler directement sur la prod ou sur une sandbox

- se connecter à aws avec le profil, exemple "AdministratorAccessCICDAmplify"
- aws sso login --profile AdministratorAccessCICDAmplify
- npx ampx sandbox --profile AdministratorAccessCICDAmplify

npx dotenvx run --env-file=.env.local -- ampx sandbox



# de l'env de vite
- vite va permettre le développement eet debug de l'application en local sans à avoir à faire un redeploiement sur amplify
- vite va se connecter aux services distants (prod ou sandbox)

- utilisation del a dernière version de node installé : 
  - nvm use node
- lancement du serveur
  - npm run dev
