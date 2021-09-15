// Variable à portée globale destinée à contenir les informations de l'ourson
let teddyData;


// Cloner la matrice de la carte produit 
function cloneCardModel(id) {
    let cardModel = document.getElementById(id);  
    let cardClone = cardModel.cloneNode(true); // Clonage du noeud parent et de ses noeuds enfants grâce au paramètre deep valant true
    cardClone.classList.remove("d-none");    
    cardClone.removeAttribute("id");    
    return cardClone;
}


// Récupérer les données du backend via l'API
function getData(url) {    
    return fetch(url)
    .then(function(response) {
        if (response.ok) { 
            return response.json(); 
        }
    })    
    .catch(function(error) {
        console.log("Une erreur est survenue. Voici son contenu : \n" + error);
    })
}


// Page d'accueil
// Générer les cartes produits individuelles à partir des données retournées par l'API (lorsqu'un tableau est retourné)
function generateTeddyCards(teddies) {
    // teddies est un array contenant l'ensemble des données retournées par l'API
    // Boucle forEach pour itérer individuellement sur chaque objet de l'array
    teddies.forEach(teddy => {
        // Clonage de la matrice de la carte produit 
        let teddyCard = cloneCardModel("cardModel");
        // Assignation des valeurs aux différents attributs de la carte produit
        teddyCard.querySelector(".card__image").setAttribute("src", teddy.imageUrl);
        teddyCard.querySelector(".cardBody__title").innerText = teddy.name;
        teddyCard.querySelector(".cardBody__price").innerText = Math.round(teddy.price/100).toFixed(2) + " €";
        teddyCard.querySelector(".cardBody__description").innerText = teddy.description;
        teddyCard.querySelector(".card__link").setAttribute("href", `product.html?id=${teddy._id}`);       
        // Insertion de la carte produit au sein du DOM
        appendCard(teddyCard, "catalog");
    })
}


// Page produit
// Générer la carte produit individuelle à partir des données retournées par l'API(lorsqu'un objet est retourné)
function generateTeddyCard(teddy){    
    // teddy est un objet contenant l'ensemble des données retournées par l'API
    // Clonage de la matrice de la carte produit 
    let teddyCard = cloneCardModel("cardModel");
    // Assignation des valeurs aux différents attributs de la carte produit
    teddyCard.querySelector(".card__image").setAttribute("src", teddy.imageUrl);
    teddyCard.querySelector(".cardBody__title").innerText = teddy.name;
    teddyCard.querySelector(".cardBody__price").innerText = Math.round(teddy.price/100).toFixed(2) + " €";  
    // Génération dynamique des options de la liste déroulante
    let teddyColors = teddy.colors;
    teddyColors.forEach(color => {
        let option = document.createElement("option");
        option.setAttribute("value", color);
        option.innerText = color;        
        teddyCard.querySelector("#colorSelect").appendChild(option);
    })
    // Insertion de la carte produit au sein du DOM
    appendCard(teddyCard, "product");
    return teddyCard;  
}


// Insérer la carte produit dans le DOM
// teddyCard = object ; targetId = string
function appendCard(teddyCard, targetId){   
    document
        .getElementById(targetId)
        .appendChild(teddyCard);
}


// Ecouter le click sur "Ajouter au panier"
function listenClickAddToBasket(teddyCard, teddyData) {
    teddyCard
        .querySelector(".card__add")
        .addEventListener("click", function(event) {
            event.preventDefault();
            updateLocalStorage(teddyCard, teddyData);
            confirmAddToBasket();
            setTimeout( () => window.location = "basket.html", 1500);
        })
}


// Confirmer l'ajout au panier et rediriger sur la page panier
function confirmAddToBasket() {    
    let alertSuccess = document.querySelector("#alertAddToBasket");
    alertSuccess.classList.remove("d-none");
}


// Enregistrer ou mettre à jour les données dans le localStorage
function updateLocalStorage(teddyCard, teddyData) {
    // Définition d'un id personnalisé en fonction de la couleur de l'ourson
    let productId = teddyData._id;
    let productColor = teddyCard.querySelector("#colorSelect").value;
    let keyName = `${productId}-${productColor}`;
    let productArray = [];    
    let basket = localStorage;    
    // Si le panier n'est pas vide, on convertit les données du tableau en objets JavaScript (pour pouvoir accéder ensuite à leurs propriétés en notation dot)
    if (basket.productArray != undefined) {
        productArray = JSON.parse(basket.productArray);
    }    
    // On enregistre les données du produit dans le localStorage
    let product = {
        id: keyName,
        name: teddyData.name,
        price: teddyData.price,
        color: productColor,
        quantity: parseInt(teddyCard.querySelector("#quantity").value),
        image: teddyData.imageUrl,
    }
    if (productArray.filter(item => item.id === product.id).length > 0){
        productArray.forEach(element => {
            if (element.id === product.id) {
                let index = productArray.indexOf(element);
                productArray[index].quantity += product.quantity;
            }
        })
    } else {        
        productArray.push(product);
    }
    // On met à jour les données chiffrées (nombre d'articles dans le panier et montant total de la commande)
    updateTotalQuantityFromLocalStorage(productArray);
    // On créé ou on met à jour le tableau de produits stocké dans le localStorage
    localStorage.setItem("productArray", JSON.stringify(productArray));   
}


// Mettre à jour les données chiffrées dans le localStorage (nombre d'articles dans le panier et montant total de la commande)
function updateTotalQuantityFromLocalStorage(products){
    let sum = 0;
    let quantity = 0;
    let totalAmount = 0;
    // Calcul du nombre d'articles et du coût total du panier
    products.forEach(product => {      
        quantity += product.quantity;
        sum += (product.price/100) * product.quantity;
        totalAmount = sum.toFixed(2) + " €";
    })
    // Vérification du type de totalAmount (pour savoir s'il faut utiliser stringify)
    totalAmount = typeof totalAmount == "string" ? totalAmount : JSON.stringify(totalAmount);
    // Mise à jour des données du localStorage
    localStorage.setItem("quantity", JSON.stringify(quantity));
    localStorage.setItem("totalAmount", totalAmount);    
}


// Mettre à jour les données chiffrées apparaissant sur l'interface utilisateur (badge panier et montant total du panier)
// @value : string
// On donne le même nom à la classe HTML et à la clé du localStorage 
// (sinon, cela ne marche pas)
// UTILISATION :
// Si l'on a la balise HTML suivante : <td class="totalAmount"></td>
// et la clé du localStorage suivante : totalAmount,
// avec la fonction updateLocalStorageValueToFront("totalAmount"),
// on met à jour les deux éléments d'un coup
function updateLocalStorageValueToFront(value){
    let valueLocalStorage = localStorage.getItem(value);
    let selector = ('.' + value);
    document.querySelector(selector).innerText = valueLocalStorage;
}


// Récupérer l'id du produit sans suffixe de couleur (format requis par l'API)
function sanitizeProductId(productId){
    let index = productId.indexOf('-');
    return productId.substring(0, index );
}


// Générer la confirmation de commande
function generateOrderConfirmation() {
    let contact = JSON.parse(localStorage.getItem("contact"));
    let orderId = JSON.parse(localStorage.getItem("orderId"));
    let totalAmount = localStorage.getItem("totalAmount");
    
    document
        .querySelector("#first_name").innerText = contact.firstName;
    document
        .querySelector("#last_name").innerText = contact.lastName;
    document
        .querySelector("#order_id").innerText = orderId;
    document
        .querySelector("#total_amount").innerText = totalAmount;
    document
        .querySelector("#email").innerText = contact.email;
}