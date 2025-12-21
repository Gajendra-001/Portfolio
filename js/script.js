// ===== LOAD COMPONENTS =====
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    attachEventListeners();
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// ===== LOAD ALL COMPONENTS =====
async function loadAllComponents() {
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("home", "components/home.html");
  await loadComponent("about", "components/about.html");
  await loadComponent("contact", "components/contact.html");
  await loadComponent("footer", "components/footer.html");
  showPage("home");
}

// ===== PAGE NAVIGATION =====
function showPage(pageName) {
  document.querySelectorAll(".page-section").forEach((page) => {
    page.classList.add("hidden");
  });

  const selectedPage = document.getElementById(pageName);
  if (selectedPage) selectedPage.classList.remove("hidden");

  // Update active nav link (Simple Black/Gray logic)
document.querySelectorAll(".nav-link").forEach((link) => {
  // Reset all links
  link.classList.remove(
    "font-bold",
    "text-black",
    "bg-white"
  );
  link.classList.add(
    "text-gray-500",
    "bg-transparent"
  );

  // Active link check
  if (link.textContent.trim().toLowerCase() === pageName.toLowerCase()) {
    link.classList.add(
      "font-bold",
      "text-black",
      "bg-white"
    );
    link.classList.remove(
      "text-gray-500",
      "bg-transparent"
    );
  }
});


  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== ATTACH EVENT LISTENERS =====
function attachEventListeners() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageName = link.textContent.trim().toLowerCase();
      showPage(pageName);
    });
  });

  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("home");
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }
}

document.addEventListener("DOMContentLoaded", loadAllComponents);
window.showPage = showPage;