/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});


/* Close mobile menu when clicking a link */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });

});


/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchInput");
const foodCards = document.querySelectorAll(".food-card");

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase().trim();

    foodCards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


/* ================= CATEGORY FILTER ================= */

const categoryButtons =
    document.querySelectorAll(".category");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.category;

        foodCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

        searchInput.value = "";

    });

});


/* ================= CART ================= */

let cart = [];

const cartBtn =
    document.getElementById("cartBtn");

const cartElement =
    document.getElementById("cart");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


/* Open Cart */

cartBtn.addEventListener("click", () => {

    cartElement.classList.add("active");
    cartOverlay.classList.add("active");

});


/* Close Cart */

closeCart.addEventListener("click", closeCartFunction);

cartOverlay.addEventListener("click", closeCartFunction);

function closeCartFunction() {

    cartElement.classList.remove("active");
    cartOverlay.classList.remove("active");

}


/* ================= ADD TO CART ================= */

const addButtons =
    document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);

        const existingItem =
            cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cartElement.classList.add("active");
        cartOverlay.classList.add("active");

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your cart is empty</p>
            </div>
        `;

    }


    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <div class="cart-item-price">
                    ₹${item.price}
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "₹" + total;

}


/* ================= QUANTITY ================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= CHECKOUT ================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");

const orderModal =
    document.getElementById("orderModal");

const closeModal =
    document.getElementById("closeModal");

const modalTotal =
    document.getElementById("modalTotal");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add some food first!");

        return;

    }

    const total =
        calculateTotal();

    modalTotal.textContent =
        "₹" + total;

    orderModal.classList.add("active");

});


/* Close Modal */

closeModal.addEventListener("click", () => {

    orderModal.classList.remove("active");

});


/* Click outside modal */

orderModal.addEventListener("click", (event) => {

    if (event.target === orderModal) {

        orderModal.classList.remove("active");

    }

});


/* ================= CALCULATE TOTAL ================= */

function calculateTotal() {

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });

    return total;

}


/* ================= ORDER FORM ================= */

const orderForm =
    document.getElementById("orderForm");

orderForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("customerAddress").value;

    const payment =
        document.getElementById("paymentMethod").value;


    let orderMessage =
        "ROYAL TASTE RESTAURANT%0A%0A";

    orderMessage +=
        "Customer: " + name + "%0A";

    orderMessage +=
        "Phone: " + phone + "%0A";

    orderMessage +=
        "Address: " + address + "%0A";

    orderMessage +=
        "Payment: " + payment + "%0A%0A";


    orderMessage += "ORDER:%0A";


    cart.forEach(item => {

        orderMessage +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            (item.price * item.quantity) +
            "%0A";

    });


    orderMessage +=
        "%0ATotal: ₹" +
        calculateTotal();


    /*
       ഇവിടെ YOUR_WHATSAPP_NUMBER മാറ്റണം.
       Example:
       919876543210
    */

    const whatsappNumber =
        "919876543210";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        orderMessage;


    alert(
        "Order ready! You will be redirected to WhatsApp."
    );


    window.open(
        whatsappURL,
        "_blank"
    );


    /* Reset */

    cart = [];

    updateCart();

    orderForm.reset();

    orderModal.classList.remove("active");

    closeCartFunction();

});


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert(
        "Thank you! Your message has been received."
    );

    contactForm.reset();

});