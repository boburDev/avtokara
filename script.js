// Navbar scroll effekti
document.addEventListener("scroll", () => {
    const navbar = document.querySelector(".mysticky");
    if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

// Aktiv navigatsiya linklarni o'zgartirish
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function changeActiveLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) { }
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index]?.classList.add("active");
    }

    changeActiveLink();
    window.addEventListener("scroll", changeActiveLink);
});

// Offcanvas-ni yopish
document.querySelectorAll(".offcanvas-close").forEach((link) => {
    link.addEventListener("click", () => {
        const offcanvas = document.querySelector(".offcanvas");
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        bsOffcanvas.hide();
    });
});

// Kontakt formasini jo‘natish
document.getElementById("contactForm")?.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    try {
        const response = await fetch("https://api.usluga-avtokara.uz/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone })
        });

        const data = await response.text();
        if (data === "Your information has been submitted!") {
            alert("Информация успешно отправлена!");
            document.getElementById("contactForm").reset();
        } else {
            alert("Ошибка при отправке данных.");
        }
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
    }
});


const data = [
    {
        image: "./assets/images/image 5.png",
        title: "Автокара 3 тонн",
        price: "Цена от 250,000 сум/час",
        minOrder: "Минмальный заказ от 4 часов",
        link: "./car-detail.html"
    },
    {
        image: "./assets/images/image-removebg-preview (3) 1.png",
        title: "Автокара 3.5 тонн",
        price: "Цена от 300,000 сум/час",
        minOrder: "Минмальный заказ от 4 часов",
        link: "./car-detail.html"
    },
    {
        image: "./assets/images/image-removebg-preview (6) 1.png",
        title: "Автокара 5 тонн",
        price: "Цена от 350,000 сум/час",
        minOrder: "Минмальный заказ от 4 часов",
        link: "./car-detail.html"
    }
];

// Mahsulotlarni yuklash
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("testimonial-slider");
    console.log(slider);
    
    if (!slider) return;

    slider.innerHTML = data
        .map(
            (product) => `
                <div class="products-card" style="min-height: 529px">
                    <div class="car-detail-img" style="overflow: hidden; display: flex; align-items: center">
                        <img class="w-100" src="${product.image}" alt=""/>
                    </div>
                    <div style="min-height: 180px">
                        <div class="text-center mt-5" style="font-size: 19px; font-weight: 500">
                            ${product.title}
                        </div>
                        <div class="text-center mt-1" style="font-size: 19px; font-weight: 500">
                            ${product.price}
                        </div>
                        <div class="text-center mt-1" style="font-size: 19px; font-weight: 500">
                            ${product.minOrder}
                        </div>
                    </div>
                    <a href="${product.link}">
                        <button>Подробнее</button>
                    </a>
                </div>
            `
        )
        .join("");
    console.log(slider);
        
    // Now initialize Owl Carousel after adding products
    $("#testimonial-slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });
});
