// Appel de la fonction getData pour récupérer les données des objets à afficher sur la page d'accueil
getData(`http://localhost:3000/api/teddies`)
    .then(function(data) {
        generateTeddyCards(data);
    })


// Mise à jour du badge du panier    
document
    .querySelector(".badge")
    .innerText = localStorage.getItem("quantity");