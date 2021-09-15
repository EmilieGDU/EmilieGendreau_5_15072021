// Gestion de l'affichage du panier
window
    .addEventListener("load", function() {
        let productArray = [];    
        let basket = localStorage;
        // Si le panier n'est pas vide
        if (basket.productArray != undefined) {                    
            // On masque la notification de panier vide
            document
                .querySelector(".emptyBasket")
                .classList.add("d-none");
            
            // On convertit les données JSON du localStorage en objets JavaScript (pour pouvoir accéder à leurs propriétés via la notation dot)
            productArray = JSON.parse(basket.productArray);

            // On génère le tableau récapitulatif correspondant
            let basketArray = document.querySelector(".basketArray tbody");
           
            productArray.forEach((product) => {
                let tableRow = document.createElement("tr");
                
                let tableHeader = document.createElement("th");
                tableHeader.setAttribute("scope", "row");  
                tableHeader.setAttribute("style", "width: 250px; height: 175px");
                let tableImage = document.createElement("img");
                tableImage.classList.add("img-fluid", "img-thumbnail");
                tableImage.setAttribute("src", product.image);
                tableHeader.appendChild(tableImage);
                
                let tableDataPrice = document.createElement("td");
                tableDataPrice.classList.add("ps-5", "pt-3");
                tableDataPrice.innerText = Math.round(product.price/100).toFixed(2) + " €";
                
                let tableDataQuantity = document.createElement("td");
                tableDataQuantity.classList.add("ps-5", "pt-3");
                tableDataQuantity.innerText = product.quantity;

                let tableDataSum = document.createElement("td");
                tableDataSum.classList.add("ps-5", "pt-3");
                tableDataSum.innerText = Math.round((product.price/100) * product.quantity).toFixed(2) + " €";

                let tableDeleteItem = document.createElement("td");
                let tableDeleteButton = document.createElement("button");
                tableDeleteButton.setAttribute("type", "button");
                tableDeleteButton.classList.add("btn", "btn-warning", "deleteButton");
                tableDeleteButton.innerText = "Supprimer";
                tableDeleteItem.appendChild(tableDeleteButton);                
                
                // Gestion de la suppression des produits
                tableDeleteButton.addEventListener("click", function() {
                    // On supprime la ligne du tableau côté HTML
                    tableRow.remove();
                    // On supprime la ligne correspondante dans le localStorage
                    let products = JSON.parse(localStorage.getItem("productArray"));
                    let remainProducts = products.filter(productToFilter => productToFilter.id != product.id, product);
                    // On met à jour les données chiffrées (localStorage et interface utilisateur)
                    updateTotalQuantityFromLocalStorage(remainProducts);
                    updateLocalStorageValueToFront("quantity");
                    updateLocalStorageValueToFront("totalAmount");
                    localStorage.removeItem("productArray"); 
                    localStorage.setItem("productArray", JSON.stringify(remainProducts)); 

                    // S'il n'y a plus de produits dans le panier, on masque le tableau HTML et on affiche la notification de panier vide
                    if (localStorage.getItem("quantity") === "0") {
                        document
                            .querySelector(".basketArray")
                            .classList.add("d-none");
                        document
                            .querySelector(".basket__buttons")
                            .classList.add("d-none");
                        document
                            .querySelector(".emptyBasket")
                            .classList.remove("d-none");
                    }               
                })

                tableRow.appendChild(tableHeader);
                tableRow.appendChild(tableDataPrice);
                tableRow.appendChild(tableDataQuantity);
                tableRow.appendChild(tableDataSum);
                tableRow.appendChild(tableDeleteItem);

                basketArray.appendChild(tableRow);
            })        
            
            // Mise à jour du badge du panier    
            document
                .querySelector(".badge")
                .innerText = localStorage.getItem("quantity");

            // Mise à jour du montant total du panier 
            document
                .querySelector(".totalAmount")
                .innerText = localStorage.getItem("totalAmount");

            // On affiche le contenu du panier et les commandes associées
            document
                .querySelector(".basketArray")
                .classList.remove("d-none");
            document
                .querySelector(".basket__buttons")
                .classList.remove("d-none");
        }
    })


// Redirection sur la page d'accueil pour commencer les achats
document
    .querySelector(".btn__catalog")
    .addEventListener("click", function() {
        window.location = "index.html";
    });


// Redirection sur la page d'accueil pour poursuivre les achats
document
    .querySelector(".btn__continue")
    .addEventListener("click", function() {
        window.location = "index.html";
    });


// Affichage du formulaire pour passer la commande
document
    .querySelector(".btn__order")
    .addEventListener("click", function() {
        document
            .querySelector(".basket__form")
            .classList.remove("d-none");
        });


// Traitement du formulaire
// Récupération et enregistrement des données saisies dans le formulaire
document
    .querySelector(".btn__submit")
    .addEventListener("click", function() {
        // Récupération de tous les champs du formulaire sous forme de NodeList
        let formInputs = document.querySelectorAll('#contact-form input');
        // Création de l'objet requis par l'API
        // API expects request to contain:
        // contact: {
        //    firstName: string,
        //    lastName: string,
        //    address: string,
        //    city: string,
        //    email: string
        // }
        // products: [string] <-- array of product _id

        // Création de l'objet contact
        let contact = {};
        // Parcours du formulaire et génération dynamique de l'objet contact
        formInputs.forEach(input => {
            let inputProperty = input.getAttribute('id');
            let inputValue = input.value;
            // On attribue à l'objet contact une propriété portant le même nom que l'id de l'input.
            // On lui assigne comme valeur celle de l'input courant. 
            contact[inputProperty] = inputValue;
            // On a donc :
            // contact {
            //  inputProperty: inputValue,
            //  lastName: DUPONT
            // }
        });

        // Création de l'array products        
        let finalBasket = JSON.parse(localStorage.productArray);
        let products = [];
        finalBasket.forEach(product => {
            let id = sanitizeProductId(product.id);
            products.push(id);
        });

        // Création de l'objet attendu par l'API
        // order.contact = contact ; order.products = products
        let order = JSON.stringify({contact, products});
                
        
        // Transmission des données au backend (objet de contact + tableau de produits)
        // Requête POST
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: order
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } 
        })
        .then(function(data) {
            localStorage.setItem("contact", JSON.stringify(data.contact));
            localStorage.setItem("products", JSON.stringify(data.products));
            localStorage.setItem("orderId", JSON.stringify(data.orderId));
            window.location = "order.html";
        })
        .catch(function(error) {
            console.log(error);
        })
    });