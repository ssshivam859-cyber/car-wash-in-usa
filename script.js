/* =========================================================
   MAGIC CAR WASH & LUBE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        /* Close menu after clicking a link */
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    /* =====================================================
       SCROLL REVEAL
       Content is visible by default, so the page never
       becomes blank if IntersectionObserver is unavailable.
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .review-card, .contact-card, .about-content, .about-image"
    );

    revealElements.forEach(element => {
        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.transform = "none";
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.visibility = "visible";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(element);

        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header = document.querySelector(".header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HEADER SHADOW ON SCROLL
    ===================================================== */

    const header = document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(0, 60, 120, 0.12)";

        } else {

            header.style.boxShadow =
                "0 5px 30px rgba(0, 60, 120, 0.06)";

        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       PHONE BUTTON
    ===================================================== */

    document.querySelectorAll(
        'a[href^="tel:"]'
    ).forEach(button => {

        button.addEventListener("click", () => {

            console.log(
                "Calling Magic Car Wash & Lube..."
            );

        });

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";

        });

    });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

    console.log(
        "✨ Magic Car Wash website loaded successfully."
    );

});