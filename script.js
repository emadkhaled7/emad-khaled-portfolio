const typingElement = document.getElementById("typing");

const words = [
    "Flutter Developer",
    "Mobile App Developer",
    "Dart Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

        setTimeout(typeEffect, 80);
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 400);
            return;
        }

        setTimeout(typeEffect, 45);
    }
}

typeEffect();

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
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

revealElements.forEach(element => observer.observe(element));

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navigationLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveLink);

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
});

const heroImage = document.querySelector(".hero-image");

if (heroImage && window.innerWidth > 900) {
    document.addEventListener("mousemove", event => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;

        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
}

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.innerWidth > 900) {
    document.addEventListener("mousemove", event => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {
    card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * -5;
        const rotateY = (x / rect.width - 0.5) * 5;

        card.style.transform =
            `translateY(-10px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

const certificateModal = document.createElement("div");

certificateModal.className = "certificate-modal";

certificateModal.innerHTML = `
    <div class="certificate-modal-content">
        <button class="certificate-close" aria-label="Close certificate">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <img src="" alt="Certificate Preview">
        <span class="certificate-modal-hint">Press ESC or click outside to close</span>
    </div>
`;

document.body.appendChild(certificateModal);

const modalImage = certificateModal.querySelector("img");
const closeCertificate = certificateModal.querySelector(".certificate-close");
const certificateCards = document.querySelectorAll(".certificate-preview");

let lastFocusedElement = null;

function openCertificate(imagePath, card) {
    lastFocusedElement = card;
    modalImage.src = imagePath;
    certificateModal.classList.add("active");
    document.body.classList.add("modal-open");
    closeCertificate.focus();
}

function closeCertificateModal() {
    certificateModal.classList.remove("active");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }

    setTimeout(() => {
        if (!certificateModal.classList.contains("active")) {
            modalImage.src = "";
        }
    }, 350);
}

certificateCards.forEach(card => {
    card.addEventListener("click", () => {
        openCertificate(card.dataset.certificate, card);
    });

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openCertificate(card.dataset.certificate, card);
        }
    });
});

closeCertificate.addEventListener("click", closeCertificateModal);

certificateModal.addEventListener("click", event => {
    if (event.target === certificateModal) {
        closeCertificateModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && certificateModal.classList.contains("active")) {
        closeCertificateModal();
    }
});

modalImage.addEventListener("error", () => {
    modalImage.alt = "Certificate image could not be loaded";
});

const copyright = document.getElementById("copyright");

copyright.textContent = new Date().getFullYear();