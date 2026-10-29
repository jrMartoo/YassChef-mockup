// ==========================================
// 1. SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

const hiddenElements = document.querySelectorAll('.slide-up');
hiddenElements.forEach((el) => observer.observe(el));


// ==========================================
// 2. SHOPPING CART & WHATSAPP CHECKOUT
// ==========================================
let cart = [];

// Add item to cart
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
    
    // Slide up the cart dashboard when an item is added
    document.getElementById('cart-dashboard').classList.add('active');
}

// Update the cart UI (list and total)
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear current list
    cartItems.innerHTML = '';
    let total = 0;

    // Loop through cart items and add them to the list
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>KSh ${item.price.toLocaleString()}</span>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    // Update total price
    cartTotal.innerText = `Total: KSh ${total.toLocaleString()}`;
}

// Checkout function (Sends to WhatsApp)
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some items first.");
        return;
    }

    // 1. Build the message
    let message = "Hello Yass Chef! I would like to place an order:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} (KSh ${item.price.toLocaleString()})\n`;
        total += item.price;
    });

    message += `\n*Total: KSh ${total.toLocaleString()}*\n\nPlease confirm my order and let me know the delivery details.`;

    // 2. Encode the message so it works in a URL
    const encodedMessage = encodeURIComponent(message);

    // 3. Open WhatsApp with their number
    const phoneNumber = "254720713141"; // Yass Chef's number
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}