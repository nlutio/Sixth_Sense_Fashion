/* CSC 106 – Sixth Sense Fashion House
   Purpose: Basic JavaScript Interaction */

// 1. Dynamic Greeting (Home Page)
const greeting = document.getElementById("greeting");

if (greeting) {
  const hour = new Date().getHours();
  let message = "Welcome to Sixth Sense Fashion House";

  if (hour < 12) message = "Good Morning, Welcome to Sixth Sense";
  else if (hour < 18) message = "Good Afternoon, Welcome to Sixth Sense";
  else message = "Good Evening, Welcome to Sixth Sense";

  greeting.textContent = message;
}

// 2. Highlight Active Navigation Link
const navLinks = document.querySelectorAll(".site-header a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.opacity = "1";
    link.style.fontWeight = "500";
  }
});

// 3. Basic Form Validation (Appointments Page)
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");

    for (let input of inputs) {
      if (!input.value.trim()) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    }

    alert("Thank you! Your inquiry has been submitted.");
    form.reset();
  });
}

// 4. Minimal Cart (Product Pages)
const products = document.querySelectorAll(".product");

if (products.length) {
  const navRight = document.querySelector(".nav-right");
  const fallbackMount = document.querySelector("header") || document.body;
  const cartHost = navRight || fallbackMount;

  const cartToggle = document.createElement("button");
  cartToggle.className = "cart-toggle";
  cartToggle.type = "button";
  cartToggle.innerHTML = 'Cart <span class="cart-count">0</span>';

  const cartBackdrop = document.createElement("div");
  cartBackdrop.className = "cart-backdrop";

  const cartToast = document.createElement("div");
  cartToast.className = "cart-toast";
  cartToast.textContent = "Added to cart";

  const cartTray = document.createElement("aside");
  cartTray.className = "cart-tray";
  cartTray.innerHTML = `
    <div class="cart-head">
      <h3>Your Cart</h3>
      <button type="button" class="cart-close">Close</button>
    </div>
    <ul class="cart-items"></ul>
    <div class="cart-foot">
      <div class="cart-total">
        <span>Total</span>
        <span class="cart-total-value">₦0</span>
      </div>
      <button type="button" class="cart-checkout">Checkout</button>
    </div>
  `;

  cartHost.appendChild(cartToggle);
  document.body.appendChild(cartBackdrop);
  document.body.appendChild(cartTray);
  document.body.appendChild(cartToast);

  const cartItemsWrap = cartTray.querySelector(".cart-items");
  const cartTotalValue = cartTray.querySelector(".cart-total-value");
  const cartCount = cartToggle.querySelector(".cart-count");
  const cartClose = cartTray.querySelector(".cart-close");
  const checkoutBtn = cartTray.querySelector(".cart-checkout");

  const cart = [];
  let toastTimer;

  function priceToNumber(rawPrice) {
    return Number(String(rawPrice).replace(/[^0-9]/g, "")) || 0;
  }

  function formatNaira(value) {
    return `₦${value.toLocaleString("en-NG")}`;
  }

  function toggleCart(open) {
    cartTray.classList.toggle("open", open);
    cartBackdrop.classList.toggle("open", open);
  }

  function updateCartView() {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = itemCount;
    cartTotalValue.textContent = formatNaira(total);

    if (!cart.length) {
      cartItemsWrap.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
      return;
    }

    cartItemsWrap.innerHTML = cart
      .map(
        (item, index) => `
          <li class="cart-item" data-cart-index="${index}">
            <div class="cart-item-top">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">${formatNaira(item.price * item.quantity)}</span>
            </div>
            <div class="cart-item-controls">
              <span class="cart-qty">Qty: ${item.quantity}</span>
              <button type="button" class="cart-remove">Remove</button>
            </div>
          </li>
        `
      )
      .join("");
  }

  function addToCart(productData) {
    const found = cart.find(
      item => item.name === productData.name && item.price === productData.price
    );

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...productData, quantity: 1 });
    }

    updateCartView();
    showToast();
  }

  function showToast() {
    clearTimeout(toastTimer);
    cartToast.classList.add("show");

    toastTimer = setTimeout(function () {
      cartToast.classList.remove("show");
    }, 1000);
  }

  products.forEach((product, index) => {
    const sectionTitle =
      product.closest("section")?.querySelector("h2")?.textContent?.trim() || "Collection";
    const priceText = product.querySelector(".price")?.textContent?.trim() || "₦0";
    const priceValue = priceToNumber(priceText);
    const imageAlt = product.querySelector("img")?.alt?.trim();
    const name = imageAlt && imageAlt !== "Product 1" ? imageAlt : `${sectionTitle} Item ${index + 1}`;

    let addBtn = product.querySelector(".add-to-cart-btn");
    if (!addBtn) {
      addBtn = document.createElement("button");
      addBtn.className = "add-to-cart-btn";
      addBtn.type = "button";
      addBtn.textContent = "Add to Cart";
      product.appendChild(addBtn);
    }

    const itemData = { name, price: priceValue };

    product.addEventListener("click", function () {
      addToCart(itemData);
    });

    addBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      addToCart(itemData);
    });
  });

  cartToggle.addEventListener("click", function () {
    toggleCart(true);
  });

  cartClose.addEventListener("click", function () {
    toggleCart(false);
  });

  cartBackdrop.addEventListener("click", function () {
    toggleCart(false);
  });

  cartItemsWrap.addEventListener("click", function (event) {
    const removeBtn = event.target.closest(".cart-remove");
    if (!removeBtn) return;

    const item = removeBtn.closest(".cart-item");
    const index = Number(item?.dataset.cartIndex);

    if (!Number.isNaN(index)) {
      cart.splice(index, 1);
      updateCartView();
    }
  });

  checkoutBtn.addEventListener("click", function () {
    alert("Demo checkout only. No live payment integration.");
  });

  updateCartView();
}