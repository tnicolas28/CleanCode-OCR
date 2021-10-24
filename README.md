# OCR
## Fonctionnement
Installer les dépendances de l'application avec  la commande suivante: ``npm install``
Créer à la racine un fichier ocr-input représentant le fichier d'entrée, avec les codes à analysé dedans.
ensuite exécuter la commande suivante: ``npm start``
## Example de Fichier d'entrée
Voici un exemple de fichier quon peut avoir en entrée
```txt
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
  
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   || || |
  ||_  _|  | _||_|  ||_| _|
  
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_||_|
```
Pour cette entrée on devrait avoir en sortie
```txt
CODE      STATUS

123456789

12345670? ILL

123456788 ERR

183556788 ERR
```