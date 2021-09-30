# Parcours Développeur Web - OpenClassrooms #

## Projet n°5 - Construire un site e-commerce ##

### Scénario ###
Orinoco est une entreprise de commerce en ligne, spécialisée dans les applications thématiques ne vendant qu'un seul groupe de produit.  
Le fondateur de l'entreprise souhaite créer un premier **MVP** pour démontrer le fonctionnement de l'application à ses investisseurs.

### Mission ###
Chargée de la partie **front-end** du site, ma mission consiste à développer en utilisant les technologies **HTML**, **CSS** et **JavaScript**.  
Il me faut également planifier une suite de **tests unitaires**, pour couvrir au minimum 80% de la base de code, sans obligation d'écrire ces tests.  
Pour ce projet, j'ai choisi de recourir à **Bootstrap 5** pour me familiariser avec son utilisation.

### Compétences évaluées ###
- Gérer des événements JavaScript
- Interagir avec un service web avec JavaScript
- Valider des données issues de sources externes
- Créer un plan de test pour une application

### Architecture générale du dossier ###
Le dossier de l'application est scindé en **deux dossiers** distincts : *backend* et *frontend*.  
Le dossier *backend*, dont le contenu a été fourni par OpenClassrooms, a été cloné depuis <https://github.com/OpenClassrooms-Student-Center/JWDP5>.  
Le dossier *frontend*, contenant notamment les **quatre pages de l'application web** :
- une page d'*accueil*, listant l'ensemble des produits disponibles à la vente ;
- une page *produit*, affichant de manière dynamique le produit sélectionné par l'utilisateur et lui permettant de personnaliser l'article, de choisir une quantité et de l'ajouter au panier ;
- une page *panier*, contenant un résumé des produits contenus dans le panier, le prix total ainsi qu'un formulaire permettant de passer une commande. Les données du formulaire sont contrôlées avant d'être transmises au back-end ;
- une page de *confirmation de commande*, remerciant l'utilisateur pour sa commande et indiquant le prix total et l'identifiant de commande envoyé par le serveur. 


### Lancement de l'application ###
1. Ouvrir un terminal dans le dossier de travail
2. Se positionner dans le dossier backend (en utilisant la commande `cd backend`)
3. Lancer le serveur (en utilisant la commande `node server`)
