$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        items: 4.5,
        itemsDesktop: [1024, 3],

        itemsDesktopSmall: [980, 2.5],
        itemsTablet: [768, 2],
        itemsTabletSmall: [600, 1],
        pagination: true,
        // navigation: true,
        // navigationText: ["<", ">"],
        autoPlay: true
    });
});
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
        autoPlay: true
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
        while (--index && window.scrollY + 50 < sections[index].offsetTop) { }
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
    }

    changeActiveLink();
    window.addEventListener("scroll", changeActiveLink);
});