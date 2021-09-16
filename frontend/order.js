// Création de la confirmation de commande
window
    .addEventListener("load", function() {
        generateOrderConfirmation();
    });

// Suppression des données du localStorage après validation de la commande
document
    .querySelector(".btn__clear")
    .addEventListener("click", function() {
        localStorage.clear();
    });