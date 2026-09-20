/* =========================================
   MABUTANE VILLAS
   Main JavaScript
========================================= */


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


/* Close mobile menu after clicking a link */

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   BOOKING FORM
========================================= */

const bookingForm =
    document.getElementById("bookingForm");

const formStatus =
    document.getElementById("formStatus");


bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData =
        new FormData(bookingForm);

    const name =
        formData.get("name");

    const phone =
        formData.get("phone");

    const email =
        formData.get("email");

    const guests =
        formData.get("guests");

    const checkin =
        formData.get("checkin");

    const checkout =
        formData.get("checkout");

    const accommodation =
        formData.get("accommodation");

    const message =
        formData.get("message");


    if (!name || !phone || !checkin || !checkout) {

        formStatus.textContent =
            "Please complete the required fields.";

        return;

    }


    if (
        checkout &&
        checkin &&
        new Date(checkout) <= new Date(checkin)
    ) {

        formStatus.textContent =
            "Check-out must be after check-in.";

        return;

    }


    /*
       Build a WhatsApp booking enquiry.

       This means the form works without
       needing a backend or database.
    */

    const whatsappMessage =

        `Hello Mabutane Villas,%0A%0A` +

        `I would like to make a booking enquiry.%0A%0A` +

        `Name: ${encodeURIComponent(name)}%0A` +

        `Phone: ${encodeURIComponent(phone)}%0A` +

        `Email: ${encodeURIComponent(email || "Not provided")}%0A` +

        `Guests: ${encodeURIComponent(guests)}%0A` +

        `Check-in: ${encodeURIComponent(checkin)}%0A` +

        `Check-out: ${encodeURIComponent(checkout)}%0A` +

        `Accommodation: ${encodeURIComponent(
            accommodation || "Not specified"
        )}%0A` +

        `Special request: ${encodeURIComponent(
            message || "None"
        )}`;


    const whatsappURL =
        `https://wa.me/27828212968?text=${whatsappMessage}`;


    formStatus.textContent =
        "Opening WhatsApp...";


    setTimeout(() => {

        window.open(
            whatsappURL,
            "_blank"
        );

        formStatus.textContent =
            "Your enquiry has been prepared for WhatsApp.";

    }, 500);

});


/* =========================================
   DATE VALIDATION
========================================= */

const checkinInput =
    document.getElementById("checkin");

const checkoutInput =
    document.getElementById("checkout");


const today =
    new Date().toISOString().split("T")[0];


checkinInput.min = today;
checkoutInput.min = today;


checkinInput.addEventListener("change", () => {

    checkoutInput.min =
        checkinInput.value;

});


/* =========================================
   IMAGE FALLBACK
========================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.background =
            "#d8d5cd";

        image.style.objectFit =
            "cover";

    });

});


/* =========================================
   SMOOTH ANCHOR OFFSET
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetID =
            this.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

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