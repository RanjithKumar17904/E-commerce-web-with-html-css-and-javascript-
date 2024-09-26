let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let checkoutButton = document.querySelector('.checkout');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'TURMERIC POWDER 1KG', image: '1.PNG', price: 120 },
    { id: 2, name: 'SAMBAR POWDER 1KG', image: '2.PNG', price: 120 },
    { id: 3, name: 'RASAM POWDER', image: '3.PNG', price: 220 },
    { id: 4, name: 'DHAL POWDER 1KG', image: '4.PNG', price: 123 },
    { id: 5, name: 'MINT POWDER 1KG', image: '5.PNG', price: 320 },
    { id: 6, name: 'FINGER MILLET 1KG', image: '6.PNG', price: 120 },
    { id: 7, name: 'RICE PACKET 1KG', image: '7.PNG', price: 300 },
    { id: 8, name: 'KAMBU POWDER 1KG', image: '8.PNG', price: 200 },
    { id: 9, name: 'WHEAT FLOUR 1KG', image: '9.PNG', price: 50 },
    { id: 10, name: 'VATHAL POWDER 1KG', image: '10.PNG', price: 60 },
    { id: 11, name: 'MILLET MIX 1KG', image: '11.PNG', price: 40 },
    { id: 12, name: 'MALLI POWDER 1KG', image: '12.PNG', price: 80 }
];

let listCarts = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button class="btn" onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCart(key) {
    if (listCarts[key] == null) {
        // copy product from list to list cart
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCart.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCarts[key];
    } else {
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}

function checkout() {
    let totalQuantity = 0;
    let totalAmount = 0;
    let message = 'Checkout Summary:\n\n';

    listCarts.forEach(item => {
        if (item) {
            totalQuantity += item.quantity;
            totalAmount += item.price;
            message += `Product: ${item.name}\nPrice: ${item.price / item.quantity}\nQuantity: ${item.quantity}\nTotal: ${item.price}\n\n`;
        }
    });

    message += `Total Quantity: ${totalQuantity}\nTotal Amount: ${totalAmount.toLocaleString()}`;
    
    let confirmation = confirm(message + "\n\nDo you want to proceed?");
    if (confirmation) {
        let whatsappMessage = encodeURIComponent(message + "\n\nTotal Quantity: " + totalQuantity + "\nTotal Amount: " + totalAmount.toLocaleString());
        let phoneNumber = '919940947158'; // WhatsApp number in international format
        let whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        window.location.href = whatsappURL; // Redirect to WhatsApp with the message
    }
}

checkoutButton.addEventListener('click', checkout);
