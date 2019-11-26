async function GetProducts() {
    try {
        let result = await fetch("products.json")
        let data = await result.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

displayProducts = (products) => {
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product-container");
        productDiv.setAttribute("data-price", product.price);
        productDiv.setAttribute("data-title", product.title);
        productDiv.setAttribute("data-thumb", product.imageurl);
        productDiv.innerHTML = `
        <img src=${product.imageurl} class="thumbnail">
        <h2>${product.title}</h2>
        <h4>Beschrijving</h4>
        <p>${product.description}</p>
        <h4>Prijs</h4>
        <p class="stock">€${product.price}</p>
        <p class="stock">Nog ${product.stock} stuks op voorraad</p>
        <button class="add-to-cart-btn">In mijn winkelmandje</button>
        `;
        productsContainer.appendChild(productDiv);
        productDiv.addEventListener("click", addToCart);
    });
}

GetProducts().then((productResult) => {
    displayProducts(productResult.products)
    const addToCartButton = document.querySelectorAll(".add-to-cart-btn");
});

//Functions
openModal = () => {
    modal.style.display = "flex";
}

closeModal = () => {
    modal.style.display = "none";
}

openShoppingCart = () => {
    shoppingCart.classList.toggle("open")
}

addToCart = (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {

        shoppingCart.classList.add("open");

        itemAdded = {title: event.target.parentNode.getAttribute("data-title"), price: event.target.parentNode.getAttribute("data-price"), imageurl: event.target.parentNode.getAttribute("data-thumb"), quantity: 1};

        cartTitles = cart.map(item => item.title);

        if (cartTitles.indexOf(itemAdded.title) !== -1) {
            cart[cartTitles.indexOf(itemAdded.title)].quantity++;
        } else {
            cart.push(itemAdded);
        }

        console.log("cart", cart);

        cartCount++;
        cartTotal = cartTotal + parseFloat(cart[cart.length - 1].price);
        
        cartItemsContainer.innerHTML = "";
        cart.forEach((item) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.setAttribute("class", "cart-item");
            cartItemDiv.innerHTML = `
            <img src=${item.imageurl} class="cart-thumb">
            <input type="number" name="quantity" min="1" value=${item.quantity}>
            <h3>${item.title}</h3>
            <p>€${Math.round((item.price * item.quantity) * 100) / 100}</p>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        })

        roundedTotal = Math.round(cartTotal * 100) / 100;
        totalAmount.innerHTML = `€${roundedTotal.toString()}`;

        cartCounterText.innerHTML = cartCount.toString();
    }
}

addProduct = (event) => {
    const productTitle = event.target.parentNode.children[2].value;
    const productDescription = event.target.parentNode.children[4].value
    const productPrice = event.target.parentNode.children[6].value
    const productStock = event.target.parentNode.children[8].value
    const newProduct = `{
        "id": 1,
        "title": "${productTitle}",
        "price": ${productPrice},
        "description": "${productDescription}",
        "stock": ${productStock},
        "imageurl": "./images/hp-laptop.jpg"
    }`
}

changeItemsPerRow = () => {
    let selectedValue = rowSelecter.options[rowSelecter.selectedIndex].value;
    const productItemContainers = document.querySelectorAll(".product-container");
    const productThumbnails = document.querySelectorAll(".thumbnail");

    if(selectedValue == 2) {
        for (var i=0; i < productItemContainers.length; i++) {
            productItemContainers[i].style.flex = "1 400px";
            productThumbnails[i].style.width = "300px";
            productThumbnails[i].style.height= "300px";
        }
    }

    if(selectedValue == 4) {
        for (var i=0; i < productItemContainers.length; i++) {
            productItemContainers[i].style.flex = "1 200px";
            productThumbnails[i].style.width = "200px";
            productThumbnails[i].style.height= "200px";
        }
    }

    if(selectedValue == 6) {
        for (var i=0; i < productItemContainers.length; i++) {
            productItemContainers[i].style.flex = "1 30px";
            productThumbnails[i].style.width = "100px";
            productThumbnails[i].style.height= "100px";
        }
    }
}

//Dom elements
const addButton = document.querySelector("#add-btn");
const closeButton = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-bg");
const shoppingCart = document.querySelector(".shopping-cart-container");
const closeShoppingCart = document.querySelector("#close");
const productsContainer = document.querySelector(".products");
const cartButton = document.querySelector("#cart-btn");
const cartItemsContainer = document.querySelector(".cart-items");
const rowSelecter = document.querySelector(".products-select");

const cart = [];
let cartCount = 0;
let cartTotal = 0;
const cartCounterText = document.querySelector(".cart-counter");
const totalAmount = document.querySelector("#totalAmount");
const modalContent = document.querySelector(".modal-content");

//Event listeners
addButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
closeShoppingCart.addEventListener("click", openShoppingCart);
cartButton.addEventListener("click", openShoppingCart);
modalContent.addEventListener("click", addProduct);
rowSelecter.addEventListener("change", changeItemsPerRow);