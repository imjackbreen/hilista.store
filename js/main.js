// Product data
const products = [
    {
        id: 1,
        name: "The Scout About A Frame Tent",
        price: 156.89,
        description: "A durable A-Frame camping tent - The Scout About™ offers reliable and comfortable shelter in a classic a-frame design. Made with a waterproof poly-cotton canvas fabric and quality build, you can enjoy outdoor adventures with peace of mind.What are you waiting for? Go explore - in style.",
        image: "https://i.etsystatic.com/22165222/r/il/622174/5005045881/il_794xN.5005045881_82l7.jpg",
        details: {
            fabric: "19oz PVC material",
            material: "Polycotton",
            shipping: "Free shipping worldwide"
        }
    },
    {
        id: 2,
        name: "Automatic Camping Polyester Tent",
        price: 65.99,
        description: "This is a all season tent Great for hiking, camping & family activities brand new Ship in 1-3 days Enjoy the beautiful nature with your family with this tent. Remember to buy covers. Big enough for 3 people. Very easy to assemble out the box",
        image: "https://i.etsystatic.com/56980963/r/il/c711c6/6655008288/il_794xN.6655008288_90eb.jpg",
        details: {
            material: "polyester",
            shipping: "Free shipping worldwide"
        }
    },
    {
        id: 3,
        name: "2 Person Swag Tent",
        price: 34.83,
        description: "Experience the ultimate camping comfort with the Outback Camping Double Swag. With its durable construction, spacious design, and easy setup, this swag is perfect for adventurers who want a hassle-free camping experience. Don't compromise on quality - choose the Outback Camping Double Swag for your next outdoor adventure. This product comes with a free carry bag & 12 month warranty! When you purchase from us, you are supporting a small business thats main focus is you, the customer. If the double swag is too large, feel free to check out our alternative, the single person swag!",
        image: "https://i.etsystatic.com/48801060/r/il/1648a6/5641465795/il_794xN.5641465795_bt6e.jpg",
        details: {
            Specs: "450GSM PVC Flooring",
            warrenty: "12 month warranty",
            Color: "Green",
            Foam: "2 Foam Mattress",
            shipping: "Free shipping worldwide"
        }
    },
    {
        id: 4,
        name: "Canvas Olive Green Tent",
        price: 156.33,
        description: "Experience the outdoors with this clever, versatile 2-piece tent set, specially designed for bushcraft enthusiasts and demanding outdoor adventurers. This set not only offers you a weatherproof shelter, but can also be flexibly adapted to different needs.",
        image: "https://i.etsystatic.com/33309693/r/il/a605be/6652943436/il_794xN.6652943436_5y95.jpg",
        details: {
            Color: "Olive Green",
            material: "85% cotton",
            Weight: "2700g",
            Capacity : "For 2 people"
        }
    } ,
    {
        id: 5,
        name: "Spider Star Shade Tent",
        price: 256.99,
        description: "Discover the perfect solution for your outdoor adventures with our Waterproof Stainless Steel Frame Star Spider Shade Tent. This versatile tent is designed to meet your needs for weddings, events, or camping.",
        image: "https://i.etsystatic.com/57519999/r/il/ad9a3c/6622961682/il_794xN.6622961682_mwpz.jpg",
        details: {
            Style: "Star Spider Shade",
            Steel : "Durable Stainless Steel Frame",
            Features: "Waterproof",
            shipping: "Free shipping worldwide"
        }
    } 
];

// Shopping cart state
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Initialize the application
function init() {
    displayProducts();
    
    // Check if we're on a product page
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        displayProductDetails(parseInt(productId));
    }

    // Setup checkout form if on checkout page
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        displayCartItems();
        setupCheckoutForm();
    }
}

// Display products in the grid
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.log('Products grid not found');
        return;
    }

    console.log('Displaying products...');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
      <a href="./pages/product.html?id=${product.id}" class="product-link text-decoration-none">
        <div class="card h-100 shadow-sm hover-shadow transition">
          <img src="${product.image}" alt="${product.name}" class="card-img-top p-3" style="height: 250px; object-fit: cover;">
          <div class="card-body d-flex flex-column gap-2">
            <h3 class="card-title h5 text-dark">${product.name}</h3>
            <p class="card-text text-muted">${product.description.split(' ').slice(0,20).join(' ')}...</p>
            <div class="mt-auto">
              <p class="h4 mb-3 text-primary">$${product.price}</p>
              <button class="btn btn-primary w-100">Add to Cart</button>
            </div>
          </div>
        </div>
      </a>
    `;
        productsGrid.appendChild(productElement);
    });
}

// Display product details
function displayProductDetails(productId) {
    console.log('Displaying product details for ID:', productId);
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.log('Product not found');
        return;
    }

    const productDetails = document.getElementById('productDetails');
    if (!productDetails) {
        console.log('Product details container not found');
        return;
    }

    productDetails.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-detail-image">
      </div>
      <div class="product-info-container">
        <h1>${product.name}</h1>
        <p class="product-price">$${product.price}</p>
        <p class="product-description">${product.description}</p>
        <button class="cta-button add-to-cart-btn" data-product-id="${product.id}" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
        
        <div class="product-tabs">
          <div class="tab-headers">
            <button class="tab-header active" data-tab="details">Details</button>
            <button class="tab-header" data-tab="shipping">Shipping</button>
          </div>
          <div class="tab-content active" data-tab="details">
            ${Object.entries(product.details)
              .filter(([key]) => key.toLowerCase() !== 'shipping')
              .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
              .join('')}
          </div>
          <div class="tab-content" data-tab="shipping">
            <p>${product.details.shipping || 'Contact us for shipping information'}</p>
          </div>
        </div>
      </div>
    </div>
  `;

    setupTabs();
    setupAddToCartButton();
}

// Setup product tabs
function setupTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tab = header.dataset.tab;

            // Update active states
            document.querySelectorAll('.tab-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            header.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
        });
    });
}

// Setup add to cart button
function setupAddToCartButton() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (!addToCartBtn) {
        console.log('Add to cart button not found');
        return;
    }

    addToCartBtn.addEventListener('click', () => {
        const productId = parseInt(addToCartBtn.dataset.productId);
        console.log('Add to cart clicked for product ID:', productId);

        const product = products.find(p => p.id === productId);
        if (product) {
            console.log('Product found:', product);

            // Add product to cart
            cart.push(product);
            console.log('Product added to cart. New cart:', cart);

            updateCartCount();

            // Save cart to localStorage before redirecting
            saveCartToLocalStorage();

            // Redirect to checkout page
            window.location.href = '/checkout.html';
        } else {
            console.log('Product not found for ID:', productId);
        }
    });
}

// Update cart count in the UI
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Display cart items in checkout
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="cart-item-price">$${item.price}</div>
    `;
        cartItems.appendChild(itemElement);
    });

    updateOrderSummary();
}

// Update order summary totals
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal; // Free shipping, so total equals subtotal

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Setup checkout form
function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // In a real application, you would:
        // 1. Validate the form data
        // 2. Process the payment
        // 3. Create the order in your database
        // 4. Send confirmation email

        // For now, we'll just redirect to the thank you page
        window.location.href = '../pages/thankyou.html';
    });

    // Format card number input
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            e.target.value = value.replace(/(\d{4})/g, '$1 ').trim();
        });
    }

    // Format expiry date input
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    // Format CVV input
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            e.target.value = value;
        });
    }
}

// Function to display cart items on checkout page
function displayCartItemsOnCheckout() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) {
        console.log('Cart items container not found');
        return;
    }

    // Clear the container
    cartItemsContainer.innerHTML = '';

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Cart from localStorage:', cart);

    if (cart.length === 0) {
        console.log('Cart is empty');
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    // Calculate totals
    let subtotal = 0;

    // Add each item to the container
    cart.forEach(item => {
        console.log('Processing item:', item);

        // Check if item has all required properties
        if (!item.name || !item.price) {
            console.log('Item missing required properties:', item);
            return;
        }

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        // Create a safer HTML structure that handles missing properties
        itemElement.innerHTML = `
      <div class="cart-item-image">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div class="no-image">No image</div>'}
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        ${item.description ? `<p class="cart-item-description">${item.description.substring(0, 100)}...</p>` : ''}
        ${item.details ? `
          <div class="cart-item-specs">
            ${item.details.material ? `<span><strong>Material:</strong> ${item.details.material}</span>` : ''}
            ${item.details.dimensions ? `<span><strong>Dimensions:</strong> ${item.details.dimensions}</span>` : ''}
          </div>
        ` : ''}
      </div>
      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
    `;

        cartItemsContainer.appendChild(itemElement);
        console.log('Item added to container');

        // Add to subtotal
        subtotal += item.price;
    });

    console.log('Subtotal calculated:', subtotal);

    // Update totals
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        console.log('Subtotal updated');
    } else {
        console.log('Subtotal element not found');
    }

    if (totalElement) {
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
        console.log('Total updated');
    } else {
        console.log('Total element not found');
    }
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    // Initialize products if on the right page
    init();

    // Setup add to cart button if on product page
    setupAddToCartButton();

    // Display cart items on checkout page
    console.log('Attempting to display cart items on checkout');
    displayCartItemsOnCheckout();
});