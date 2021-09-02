// ###########################################
//   Génération dynamique des cartes produits
// ###########################################

// FONCTION 1 : Cloner la matrice de carte produit 
function cloneCardModel(id) {
    let cardModel = document.getElementById(id);  
    let cardClone = cardModel.cloneNode(true); // Clonage du noeud parent et de ses noeuds enfants grâce au paramètre deep valant true
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
        // data est un array contenant l'ensemble des données retournées par l'API
        generateTeddyCards(data);
    })
    .catch(function(error) {
        console.log("Une erreur est survenue. Voici son contenu : \n" + error);
    }) 
}

// FONCTION 3 : Générer les cartes produits individuelles
function generateTeddyCards(teddies) {
    // teddies est un array contenant l'ensemble des données retournées par l'API
    // Boucle forEach pour itérer individuellement sur chaque objet de l'array
    teddies.forEach(teddy => {
        // Clonage de la matrice de la carte produit 
        let teddyCard = cloneCardModel("cardModel");          
        // Assignation de valeurs aux différents attributs de la carte produit
        teddyCard.querySelector(".card__image").setAttribute("src", teddy.imageUrl);
        teddyCard.querySelector(".cardBody__title").innerText = teddy.name;
        teddyCard.querySelector(".cardBody__price").innerText = Math.round(teddy.price/100).toFixed(2) + " €"; // Conversion du prix de centimes en Euros et arrondissement du résultat à 2 chiffres après la virgule
        teddyCard.querySelector(".cardBody__description").innerText = teddy.description;
        // Insertion de la carte produit au sein du DOM
        appendCard(teddyCard);
    })
}

// FONCTION 4 : Insérer la carte produit dans le DOM
function appendCard(teddyCard){   
    document
        .getElementById("catalog")
        .appendChild(teddyCard);
}