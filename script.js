// cart starts

let cart = [];

function addToCart(name, price, img) {
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }

  renderCart();
  toggleCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>Rp ${item.price.toLocaleString()}</p>
          <div class="qty-control">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <div class="cart-subtotal">
          Rp ${subtotal.toLocaleString()}
        </div>
      </div>
    `;
  });

  totalPrice.innerText = "Total: Rp " + total.toLocaleString();
  updateWA(total);
}

function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function updateWA(total) {
  let message = "Halo Sweet Heartt 🍞, saya mau order:%0A";

  cart.forEach((item) => {
    message += `- ${item.name} (${item.qty} pcs)%0A`;
  });

  message += `%0ATotal: Rp ${total.toLocaleString()}`;

  document.getElementById("checkoutWA").href =
    "https://wa.me/6285848939275?text=" + message;
}

function toggleCart() {
  document.getElementById("cartPopup").classList.toggle("active");
}

// cart ends

// popup love starts
function showLovePopup() {
  const popup = document.getElementById("lovePopup");

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

function likeProduct(el) {
  el.classList.toggle("active"); // hati jadi pink
  showLovePopup();
}
// popup love ends

// icon share starts
function shareProduct(name) {
  const message = `Halo! Aku mau share produk ini nih: ${name} 🍞✨`;

  const url = "https://wa.me/?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}
// icon share ends
