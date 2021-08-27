// ######################################
//   VERSION 2 (ORDRE ANTICHRONOLOGIQUE)
// ######################################

// FONCTION 1 : Cloner la matrice de carte produit 
function cloneCardModel(id) {
    let cardModel = document.getElementById(id);   
    let cardClone = cardModel.cloneNode(true);
    cardClone.classList.remove("d-none");    
    cardClone.removeAttribute("id");
    
    return cardClone;
}

// FONCTION 2 : Récupérer les données relatives aux produits proposés par le site
function getData(url) {
    fetch(url)
    .then(function(response) {
        if (response.ok) { 
            return response.json(); 
        }
    })
    .then(function(data) {
        // (data) est un array contenant l'ensemble des données retournées par l'API    
        console.log(data);
        generateTeddyCards(data);
    })
    //.then( data => generateTeddyCard(data) )
    .catch(function(error) {
        window.alert("Une erreur est survenue. Voici son contenu : \n" + error);
    })

 
}

let result = getData(url)


// Appel de la fonction getData pour récupérer et afficher les objets sur la page d'accueil
// D'OU DOIT-ON L'APPELER???
getData("http://localhost:3000/api/teddies");




// FONCTION 3 : Générer les cartes produits individuelles
function generateTeddyCards(teddies) {
    // (teddies) est un array contenant l'ensemble des données retournées par l'API
    let teddyCard = cloneCardModel("cardModel");

    teddies.forEach(teddy => {
        teddyCard.getElementByTagName("img") = teddy.imageUrl;
        // ... Utiliser querySelector avec combinateurs CSS pour viser les bonnes balises
        appendCard(teddyCard);
    }
}

// FONCTION 4 : Insérer la carte produit dans le DOM
function appendCard(teddyCard){   
    document
        .getElementById("catalog")
        .appendChild(teddyCard);
}








// ######################################
// VERSION 1
// ######################################

// FONCTION 1 : 
// Cloner la matrice de carte produit et l'adapter pour la rendre prête à être modifiée (enlever id et d-none)
function cloneCardModel(id) {
    // Cibler l'élément à cloner
    let cardModel = document.getElementById(id);    
    // Cloner l'élément en incluant ses enfants (grâce au boolean deep valant true)
    let cardClone = cardModel.cloneNode(true);
    // Enlever la class d-none pour faire apparaitre l'élément
    cardClone.classList.remove("d-none");
    // Enlever l'ID #teddyCardModel car un ID doit être unique sur la page
    cardClone.removeAttribute("id");
    // Retourner l'élément
    return cardClone;
}


// FONCTION 2 : 
// Récupérer les données à insérer dans la carte produit
function getData(url) {
    // Création d'une requête HTTP avec la méthode GET pour récupérer des données depuis l'API
    fetch(url)
    // Récupération du résultat de la requête grâce à l'objet Promise retourné par l'API Fetch (données au format JSON)
    // Fonction .then de l'objet Promise exécutée lorsqu'un résultat valide est obtenu
    .then(function(response) {
        // On vérifie que la requête s'est bien passée (code de statut compris entre 200 et 299)
        if (response.ok) { 
            // Si c'est le cas, on récupère le résultat au format JSON (génération d'une nouvelle Promise, dont le résultat sera récupéré par la fonction .then suivante)
            return response.json(); 
        }
    })
    .then(function(data) {
        // (data) est un array contenant l'ensemble des données retournées par l'API    
        console.log(data);
        // Boucle For pour itérer sur chaque objet du tableau
        // Appel fonction generateTeddyCard()     
    })
    // Fonction .catch de l'objet Promise appelée si une erreur survient lors de la requête
    .catch(function(error) {
        window.alert("Une erreur est survenue. Voici son contenu : \n" + error);
    })
}

getData("http://localhost:3000/api/teddies");


// FONCTION 3 : Générer les cartes Ourson en insérant dans la div clônée les informations reçues du backend 
function generateTeddyCard(teddyCard, teddy) {
    divOurson
}

// FONCTION 4 : Insérer la div Ourson dans le DOM
function appendCards(teddies){   
    teddies.forEach(teddy => {
        let teddyCard = cloneCardModel("cardModel");
        let teddyCardContent = generateTeddyCard(teddyCard, teddy);
        catalog.appendChild(newCard);
    } )
}



