// Récupération de l'ID du produit au sein de l'URL
const url = new URL(window.location.href);
const teddyId = url.searchParams.get("id");


// Appel de la fonction getData pour récupérer les données relatives au produit choisi par le client et les afficher sur la page produit
getData(`http://localhost:3000/api/teddies/${teddyId}`)
    .then(function(data) {
        let teddyCard = generateTeddyCard(data);
        listenClickAddToBasket(teddyCard, data);         
    })


// Mise à jour du badge du panier    
document
    .querySelector(".badge")
    .innerText = localStorage.getItem("quantity");