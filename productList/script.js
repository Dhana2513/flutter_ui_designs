// DOM Elements
const productListScreen = document.getElementById('product-list-screen');
const addProductScreen = document.getElementById('add-product-screen');
const productDetailsScreen = document.getElementById('product-details-screen');
const productList = document.getElementById('product-list');
const productDetails = document.getElementById('product-details');
const searchInput = document.getElementById('search-input');
const addProductBtn = document.getElementById('add-product-btn');
const backToListBtn = document.getElementById('back-to-list-btn');
const backToListFromDetailsBtn = document.getElementById('back-to-list-from-details-btn');
const productForm = document.getElementById('product-form');

// Sample product data based on the provided JSON
const productsData = {
    "products": [
        {
            "id": 1,
            "title": "Essence Mascara Lash Princess",
            "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            "category": "beauty",
            "price": 9.99,
            "discountPercentage": 7.17,
            "rating": 4.94,
            "stock": 5,
            "tags": ["beauty", "mascara"],
            "brand": "Essence",
            "sku": "RCH45Q1A",
            "weight": 2,
            "dimensions": {"width": 23.17, "height": 14.43, "depth": 28.01},
            "warrantyInformation": "1 month warranty",
            "shippingInformation": "Ships in 1 month",
            "availabilityStatus": "Low Stock",
            "reviews": [
                {"rating": 2, "comment": "Very unhappy with my purchase!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "John Doe"},
                {"rating": 2, "comment": "Not as described!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Nolan Gonzalez"},
                {"rating": 5, "comment": "Very satisfied!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Scarlett Wright"}
            ],
            "returnPolicy": "30 days return policy",
            "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        },
        {
            "id": 2,
            "title": "Eyeshadow Palette with Mirror",
            "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            "category": "beauty",
            "price": 19.99,
            "discountPercentage": 5.5,
            "rating": 3.28,
            "stock": 44,
            "tags": ["beauty", "eyeshadow"],
            "brand": "Glamour Beauty",
            "sku": "MVCFH27F",
            "weight": 3,
            "dimensions": {"width": 12.42, "height": 8.63, "depth": 29.13},
            "warrantyInformation": "1 year warranty",
            "shippingInformation": "Ships in 2 weeks",
            "availabilityStatus": "In Stock",
            "reviews": [
                {"rating": 4, "comment": "Very satisfied!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Liam Garcia"},
                {"rating": 1, "comment": "Very disappointed!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Nora Russell"},
                {"rating": 5, "comment": "Highly impressed!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Elena Baker"}
            ],
            "returnPolicy": "30 days return policy",
            "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
        },
        {
            "id": 3,
            "title": "Powder Canister",
            "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
            "category": "beauty",
            "price": 14.99,
            "discountPercentage": 18.14,
            "rating": 3.82,
            "stock": 59,
            "tags": ["beauty", "face powder"],
            "brand": "Velvet Touch",
            "sku": "9EN8WLT2",
            "weight": 8,
            "dimensions": {"width": 24.16, "height": 10.7, "depth": 11.07},
            "warrantyInformation": "2 year warranty",
            "shippingInformation": "Ships in 1-2 business days",
            "availabilityStatus": "In Stock",
            "reviews": [
                {"rating": 5, "comment": "Very happy with my purchase!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Ethan Thompson"},
                {"rating": 4, "comment": "Great value for money!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Levi Hicks"},
                {"rating": 5, "comment": "Highly impressed!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Hazel Gardner"}
            ],
            "returnPolicy": "60 days return policy",
            "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
        },
        {
            "id": 4,
            "title": "Red Lipstick",
            "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
            "category": "beauty",
            "price": 12.99,
            "discountPercentage": 19.03,
            "rating": 2.51,
            "stock": 68,
            "tags": ["beauty", "lipstick"],
            "brand": "Chic Cosmetics",
            "sku": "O5IF1NTA",
            "weight": 5,
            "dimensions": {"width": 14.37, "height": 13.94, "depth": 14.6},
            "warrantyInformation": "Lifetime warranty",
            "shippingInformation": "Ships in 2 weeks",
            "availabilityStatus": "In Stock",
            "reviews": [
                {"rating": 5, "comment": "Great product!", "date": "2024-05-23T08:56:21.619Z", "reviewerName": "Leo Rivera"},
                {"rating": 4, "comment": "Very pleased!", "date": "2024-05-23T08:56:21.619Z", "reviewerName": "Oscar Powers"},
                {"rating": 5, "comment": "Very pleased!", "date": "2024-05-23T08:56:21.619Z", "reviewerName": "Carter Rivera"}
            ],
            "returnPolicy": "90 days return policy",
            "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
        }
    ]
};

// Current product data
let products = [...productsData.products];
let nextProductId = products.length + 1;
let selectedProductId = null;

// Initialize the app
function init() {
    renderProductList();
    setupEventListeners();
}

// Render the product list
function renderProductList(filteredProducts = null) {
    const productsToRender = filteredProducts || products;
    productList.innerHTML = '';

    productsToRender.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.dataset.id = product.id;

        // Calculate discounted price
        const discountedPrice = product.price * (1 - product.discountPercentage / 100);
        
        // Determine stock status class
        let stockStatusClass = 'in-stock';
        if (product.stock <= 0) {
            stockStatusClass = 'out-of-stock';
        } else if (product.stock < 10) {
            stockStatusClass = 'low-stock';
        }

        productItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-brand">${product.brand}</div>
                </div>
                <div>
                    <div class="product-price-container">
                        <span class="product-price">$${discountedPrice.toFixed(2)}</span>
                        ${product.discountPercentage > 0 ? `<span class="product-discount">-${product.discountPercentage}%</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating.toFixed(1)}</span>
                    </div>
                    <span class="product-stock ${stockStatusClass}">
                        ${product.availabilityStatus}
                    </span>
                </div>
            </div>
        `;

        productItem.addEventListener('click', () => showProductDetails(product.id));
        productList.appendChild(productItem);
    });
}

// Show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedProductId = productId;
    
    // Calculate discounted price
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    
    // Generate stars for rating
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating - fullStars >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }

    // Generate tags HTML
    const tagsHTML = product.tags.map(tag => `<span class="product-detail-tag">${tag}</span>`).join('');
    
    // Generate reviews HTML
    const reviewsHTML = product.reviews.map(review => {
        // Generate stars for review rating
        let reviewStarsHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                reviewStarsHTML += '<i class="fas fa-star"></i>';
            } else {
                reviewStarsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        const reviewDate = new Date(review.date).toLocaleDateString();
        
        return `
            <div class="product-review-item">
                <div class="product-review-header">
                    <span class="product-review-name">${review.reviewerName}</span>
                    <span class="product-review-date">${reviewDate}</span>
                </div>
                <div class="product-review-rating">${reviewStarsHTML}</div>
                <div class="product-review-comment">${review.comment}</div>
            </div>
        `;
    }).join('');

    productDetails.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="product-detail-image">
        
        <div class="product-detail-header">
            <h3 class="product-detail-title">${product.title}</h3>
            <div class="product-detail-brand">${product.brand}</div>
        </div>
        
        <div class="product-detail-price-container">
            <span class="product-detail-price">$${discountedPrice.toFixed(2)}</span>
            ${product.discountPercentage > 0 ? 
                `<span class="product-detail-original-price">$${product.price.toFixed(2)}</span>
                <span class="product-detail-discount">-${product.discountPercentage}%</span>` : ''}
        </div>
        
        <div class="product-detail-rating">
            ${starsHTML} <span>(${product.rating.toFixed(1)})</span>
        </div>
        
        <div class="product-detail-section">
            <h4 class="product-detail-section-title">Description</h4>
            <p class="product-detail-description">${product.description}</p>
        </div>
        
        <div class="product-detail-section">
            <h4 class="product-detail-section-title">Tags</h4>
            <div class="product-detail-tags">
                ${tagsHTML}
            </div>
        </div>
        
        <div class="product-detail-section">
            <h4 class="product-detail-section-title">Product Information</h4>
            <div class="product-detail-info">
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">SKU</span>
                    <span class="product-detail-info-value">${product.sku}</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Category</span>
                    <span class="product-detail-info-value">${product.category}</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Stock</span>
                    <span class="product-detail-info-value">${product.stock} units</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Weight</span>
                    <span class="product-detail-info-value">${product.weight} oz</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Dimensions</span>
                    <span class="product-detail-info-value">${product.dimensions.width}" × ${product.dimensions.height}" × ${product.dimensions.depth}"</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Warranty</span>
                    <span class="product-detail-info-value">${product.warrantyInformation}</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Shipping</span>
                    <span class="product-detail-info-value">${product.shippingInformation}</span>
                </div>
                <div class="product-detail-info-item">
                    <span class="product-detail-info-label">Return Policy</span>
                    <span class="product-detail-info-value">${product.returnPolicy}</span>
                </div>
            </div>
        </div>
        
        <div class="product-detail-section">
            <h4 class="product-detail-section-title">Reviews</h4>
            <div class="product-detail-reviews">
                ${reviewsHTML}
            </div>
        </div>
    `;

    // Show product details screen
    productListScreen.style.display = 'none';
    addProductScreen.style.display = 'none';
    productDetailsScreen.style.display = 'block';
}

// Show add product screen
function showAddProductScreen() {
    productForm.reset();
    productListScreen.style.display = 'none';
    productDetailsScreen.style.display = 'none';
    addProductScreen.style.display = 'block';
}

// Show product list screen
function showProductListScreen() {
    productDetailsScreen.style.display = 'none';
    addProductScreen.style.display = 'none';
    productListScreen.style.display = 'block';
}

// Add new product
function addProduct(event) {
    event.preventDefault();
    
    const newProduct = {
        id: nextProductId++,
        title: document.getElementById('product-title').value,
        description: document.getElementById('product-description').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        discountPercentage: parseFloat(document.getElementById('product-discount').value) || 0,
        rating: 0,
        stock: parseInt(document.getElementById('product-stock').value),
        tags: [document.getElementById('product-category').value.toLowerCase()],
        brand: document.getElementById('product-brand').value,
        sku: generateSKU(),
        weight: Math.floor(Math.random() * 10) + 1,
        dimensions: {
            width: Math.floor(Math.random() * 30) + 10,
            height: Math.floor(Math.random() * 20) + 5,
            depth: Math.floor(Math.random() * 30) + 10
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock",
        reviews: [],
        returnPolicy: "30 days return policy",
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/thumbnail.png"
    };
    
    products.unshift(newProduct);
    showProductListScreen();
    renderProductList();
}

// Generate a random SKU
function generateSKU() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < 7; i++) {
        sku += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return sku;
}

// Search products
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProductList();
        return;
    }
    
    const filteredProducts = products.filter(product => {
        return (
            product.title.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
    
    renderProductList(filteredProducts);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    addProductBtn.addEventListener('click', showAddProductScreen);
    backToListBtn.addEventListener('click', showProductListScreen);
    backToListFromDetailsBtn.addEventListener('click', showProductListScreen);
    
    // Form submission
    productForm.addEventListener('submit', addProduct);
    
    // Search
    searchInput.addEventListener('input', searchProducts);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);