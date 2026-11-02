document.addEventListener("DOMContentLoaded", () => {

    // Neon scroll progress bar
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);

    function updateProgress() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
        progress.style.width = percent + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    // Neon glow follows your mouse
    window.addEventListener("pointermove", (event) => {
        document.documentElement.style.setProperty("--mouse-x", event.clientX + "px");
        document.documentElement.style.setProperty("--mouse-y", event.clientY + "px");
    });

    // Scroll reveal animations
    const elements = document.querySelectorAll(
        ".section, .countdown, .feature-card, .schedule-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        elements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        elements.forEach((element) => element.classList.add("visible"));
    }

    // Idea Lab
    const ideas = {
        campus: [
            "Create an app that helps students find empty study spaces.",
            "Design a smart system that reduces food waste on campus.",
            "Build a digital guide for new students."
        ],
        planet: [
            "Create a system that encourages people to recycle.",
            "Design a way to reduce plastic waste.",
            "Build a smart water-saving solution."
        ],
        health: [
            "Create a tool that helps students build healthy habits.",
            "Design an app that encourages better sleep.",
            "Make health information easier for students to access."
        ],
        technology: [
            "Build an AI assistant for everyday student problems.",
            "Create an interactive digital learning tool.",
            "Design technology that helps your local community."
        ]
    };

    const generateButton = document.getElementById("generate");
    const themeSelect = document.getElementById("theme");
    const ideaResult = document.getElementById("idea-result");

    if (generateButton && themeSelect && ideaResult) {
        generateButton.addEventListener("click", () => {
            const options = ideas[themeSelect.value] || ideas.campus;
            const randomIdea = options[Math.floor(Math.random() * options.length)];

            ideaResult.textContent = randomIdea;
            ideaResult.classList.remove("pop");
            void ideaResult.offsetWidth;
            ideaResult.classList.add("pop");
        });
    }

    // Registration form validation
    const form = document.getElementById("registration-form");
    const message = document.getElementById("form-message");

    if (form && message) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            message.textContent =
                "Demo submitted successfully! Your details have not been sent or stored.";

            form.reset();
        });
    }

    // 3D crystal movement
    const crystal = document.querySelector(".crystal");
    const heroArt = document.querySelector(".hero-art");

    if (
        crystal &&
        heroArt &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        heroArt.addEventListener("pointermove", (event) => {
            const rect = heroArt.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            crystal.style.animationPlayState = "paused";
            crystal.style.transform =
                `translateY(-5px) rotateX(${-y * 12}deg) rotateY(${x * 16}deg)`;
        });

        heroArt.addEventListener("pointerleave", () => {
            crystal.style.animationPlayState = "running";
            crystal.style.transform = "";
        });
    }

});

// LIVE EVENT COUNTDOWN
const eventDate = new Date("2026-11-15T09:00:00+05:30").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const noteElement = document.getElementById("countdown-note");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (distance <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        if (noteElement) {
            noteElement.textContent = "THE EVENT HAS STARTED!";
        }

        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);


/* NEON PARTICLE BACKGROUND */

const particleCanvas = document.createElement("canvas");
particleCanvas.id = "particle-canvas";

Object.assign(particleCanvas.style, {
position: "fixed",
inset: "0",
width: "100%",
height: "100%",
pointerEvents: "none",
zIndex: "0",
opacity: "0.65"
});

document.body.prepend(particleCanvas);

const particleContext = particleCanvas.getContext("2d");
let particles = [];

function resizeParticleCanvas() {
const ratio = Math.min(window.devicePixelRatio || 1, 2);


particleCanvas.width = window.innerWidth * ratio;
particleCanvas.height = window.innerHeight * ratio;

particleContext.setTransform(ratio, 0, 0, ratio, 0, 0);

const particleCount = Math.min(
    65,
    Math.floor(window.innerWidth / 18)
);

particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.8 + 0.5,
    speed: Math.random() * 0.5 + 0.15,
    color: Math.random() > 0.5 ? "#ff28bd" : "#28f0f5"
}));


}

function animateParticles() {
particleContext.clearRect(
0, 0, window.innerWidth, window.innerHeight
);


particles.forEach((particle) => {
    particle.y -= particle.speed;

    if (particle.y < -5) {
        particle.y = window.innerHeight + 5;
        particle.x = Math.random() * window.innerWidth;
    }

    particleContext.beginPath();
    particleContext.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
    );

    particleContext.fillStyle = particle.color;
    particleContext.shadowBlur = 12;
    particleContext.shadowColor = particle.color;
    particleContext.fill();
});

particleContext.shadowBlur = 0;
requestAnimationFrame(animateParticles);


}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
resizeParticleCanvas();
animateParticles();
window.addEventListener("resize", resizeParticleCanvas);
} else {
particleCanvas.remove();
}

// NEON CURSOR TRAIL
(() => {
// Skip the trail on touch devices and when reduced motion is preferred.
if (
window.matchMedia("(pointer: coarse)").matches ||
window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
return;
}


const trailColors = ["#ff28bd", "#28f0f5"];
let lastDotTime = 0;

document.addEventListener("pointermove", (event) => {
    const now = performance.now();

    // Limit the number of dots for smoother performance.
    if (now - lastDotTime < 35) return;
    lastDotTime = now;

    const dot = document.createElement("span");
    const color = trailColors[Math.floor(Math.random() * trailColors.length)];

    Object.assign(dot.style, {
        position: "fixed",
        left: event.clientX + "px",
        top: event.clientY + "px",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
        pointerEvents: "none",
        zIndex: "99999",
        transform: "translate(-50%, -50%) scale(1)",
        opacity: "1",
        transition: "transform 450ms ease-out, opacity 450ms ease-out"
    });

    document.body.appendChild(dot);

    requestAnimationFrame(() => {
        dot.style.transform = "translate(-50%, -50%) scale(0)";
        dot.style.opacity = "0";
    });

    window.setTimeout(() => dot.remove(), 500);
});

})();


// VISIBLE NEON SHOOTING STARS
(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Add the animation styles
    const style = document.createElement("style");
    style.textContent = `
        @keyframes neonShoot {
            0% {
                opacity: 0;
                transform: translate(0, 0) rotate(-35deg);
            }
            15% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translate(-250px, 250px) rotate(-35deg);
            }
        }

        .neon-shooting-star {
            position: fixed;
            width: 130px;
            height: 3px;
            border-radius: 50%;
            background: linear-gradient(
                90deg,
                transparent,
                #28f0f5,
                #ffffff,
                #ff28bd
            );
            box-shadow:
                0 0 8px #28f0f5,
                0 0 18px #ff28bd,
                0 0 30px #28f0f5;
            pointer-events: none;
            z-index: 99999;
            animation: neonShoot 1.4s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    function createStar() {
        const star = document.createElement("div");
        star.className = "neon-shooting-star";

        star.style.top = (10 + Math.random() * 65) + "vh";
        star.style.left = (25 + Math.random() * 70) + "vw";

        document.body.appendChild(star);

        star.addEventListener("animationend", () => {
            star.remove();
        });
    }

    // Show the first star after one second
    setTimeout(() => {
        createStar();

        // Continue creating stars
        setInterval(createStar, 2200);
    }, 1000);
})();

// NEON TYPING TEXT EFFECT
(() => {
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = "Innovate. Create. Inspire.";
        return;
    }

    const messages = [
        "Innovate. Create. Inspire.",
        "Turn Ideas Into Reality.",
        "Build The Future Together.",
        "24 Hours. Infinite Possibilities."
    ];

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentMessage = messages[messageIndex];

        if (!deleting) {
            typingElement.textContent =
                currentMessage.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentMessage.length) {
                deleting = true;
                setTimeout(typeEffect, 1600);
                return;
            }
        } else {
            typingElement.textContent =
                currentMessage.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
            }
        }

        setTimeout(typeEffect, deleting ? 35 : 75);
    }

    typeEffect();
})();

// CYBERPUNK LOADING SCREEN
(() => {
    const loader = document.getElementById("loader");
    const progress = document.getElementById("loader-progress");
    const percentage = document.getElementById("loader-percent");

    if (!loader || !progress || !percentage) return;

    let value = 0;

    const timer = setInterval(() => {
        value += Math.floor(Math.random() * 12) + 5;

        if (value >= 100) {
            value = 100;
            clearInterval(timer);

            setTimeout(() => {
                loader.classList.add("loader-hidden");
            }, 350);
        }

        progress.style.width = value + "%";
        percentage.textContent = value + "%";

    }, 100);
})();