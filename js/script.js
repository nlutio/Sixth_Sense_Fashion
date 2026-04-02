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