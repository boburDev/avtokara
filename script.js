$(document).ready(function () {
  $("#otzivi-slider").owlCarousel({
    items: 4,
    itemsDesktop: [1200, 3],
    itemsDesktopSmall: [980, 2],
    itemsTablet: [768, 1.5],
    itemsTableSmall: [600, 1.5],
    pagination: true,
    // navigation: true,
    // navigationText: ["<", ">"],
    autoPlay: true,
  });
});

document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".mysticky");
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function changeActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  changeActiveLink();
  window.addEventListener("scroll", changeActiveLink);
});

const offcanvasLinks = document.querySelectorAll(".offcanvas-close");
offcanvasLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const offcanvas = document.querySelector(".offcanvas");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
    bsOffcanvas.hide(); // Offcanvas-ni yopish
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    try {
      const response = await fetch("https://api.usluga-avtokara.uz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });
      const data = await response.text();
      console.log(data);

      if (data === "Your information has been submitted!") {
        alert("Информация успешно отправлена!");
        document.getElementById("contactForm").reset();
      } else {
        alert("Ошибка при отправке данных.");
      }
    } catch (error) {}
  });

// styled
document.addEventListener("DOMContentLoaded", function () {
  const htmlLang = document.documentElement.lang; // HTML lang atributini olish

  const jsonFile = `products_${htmlLang}.json`; // Mos JSON faylni tanlash

  // Tilga qarab tugma matnlarini belgilash
  const buttonText = {
    uz: "Batafsil",
    ru: "Подробнее",
    en: "More details",
  };

  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) throw new Error("Fayl topilmadi");
      return response.json();
    })
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = ""; // Avvalgi mahsulotlarni tozalash

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("products-card");
        productCard.style.marginBottom = "20px"; // Har bir kartaning pastki qismiga 20px bo'sh joy qo‘shish

        productCard.innerHTML = `
              <div class="car-detail-img">
                  <img class="w-100" src="${product.image}" alt="${
          product.name
        }" />
              </div>
              <div class="text-center mt-5" style="font-size: 19px; font-weight: 500">
                  ${product.name}
              </div>
              <div class="text-center mt-1" style="font-size: 19px; font-weight: 500">
                  ${product.price}
              </div>
              <div class="text-center mt-1" style="font-size: 19px; font-weight: 500">
                  ${product.min_order}
              </div>
              <a class='detail-button' href="${product.detail_link}">
                  <button>${buttonText[htmlLang] || "More details"}</button>
              </a>
          `;

        productList.appendChild(productCard);
      });

      // Owl Carousel-ni qayta ishga tushirish
      if (window.jQuery) {
        $("#product-list").owlCarousel("destroy"); // Oldingi carousel'ni tozalash
        $("#product-list").owlCarousel({
          items: 4.5,
          itemsDesktop: [1024, 3],
          itemsDesktopSmall: [980, 2.5],
          itemsTablet: [768, 2],
          itemsTabletSmall: [600, 1],
          pagination: true,
          autoPlay: true,
        });
      } else {
        console.error("jQuery is not loaded.");
      }
    })
    .catch((error) => console.error("Ошибка загрузки JSON:", error));
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "doSomething") {
//     console.log("Received message:", message);

//     sendResponse({ status: "success" }); // Ensure a response is always sent
//   }
//   return true; // Keeps the message port open for async operations
// });
