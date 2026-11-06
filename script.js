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

        message.classList.remove("success-animation");

        message.textContent =
            "✓ DEMO SUBMITTED SUCCESSFULLY! Your details have not been sent or stored.";

        // Restart animation
        void message.offsetWidth;

        message.classList.add("success-animation");

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
/* =================================
   IEDC IDEA SPRINT - GAME ZONE
================================= */

(() => {

    const display = document.getElementById("game-display");
    const gameButtons = document.querySelectorAll("[data-game]");
    const popup = document.getElementById("game-popup");
    const popupClose = document.getElementById("game-popup-close");

    if (!display || gameButtons.length === 0) return;

    let quizTimer = null;
    let currentGame = 0;

    function clearGame() {
        clearInterval(quizTimer);
        currentGame++;
    }
    function closeGamePopup() {
    clearGame();
    popup.classList.remove("active");
}

popupClose.addEventListener("click", closeGamePopup);

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        closeGamePopup();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("active")) {
        closeGamePopup();
    }
});

    gameButtons.forEach(button => {
    button.addEventListener("click", () => {

        clearGame();

        popup.classList.add("active");

        const game = button.dataset.game;

        if (game === "brain") startBrainSprint();
        if (game === "memory") startMemoryMatrix();
        if (game === "code") startCodeBreaker();

    });
});

    /* =================================
       GAME 1: BRAIN SPRINT
    ================================= */

    const questions = [
        {
            question: "Which language is mainly used for web page structure?",
            options: ["Python", "HTML", "C++", "Java"],
            answer: "HTML"
        },
        {
            question: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Control Processing User"
            ],
            answer: "Central Processing Unit"
        },
        {
            question: "Which one is an operating system?",
            options: ["HTML", "CSS", "Linux", "JavaScript"],
            answer: "Linux"
        },
        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: "Queue"
        },
        {
            question: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automatic Internet",
                "Advanced Interface",
                "Applied Information"
            ],
            answer: "Artificial Intelligence"
        }
    ];

    function startBrainSprint() {

        let index = 0;
        let score = 0;
        let answered = false;

        function showQuestion() {

            if (index >= questions.length) {
                display.innerHTML = `
                    <h3>CHALLENGE COMPLETED!</h3>
                    <p class="game-status">
                        Your score: ${score} / 50
                    </p>
                    <button class="game-btn" id="retry-quiz">
                        PLAY AGAIN ↻
                    </button>
                `;

                document.getElementById("retry-quiz")
                    .addEventListener("click", startBrainSprint);

                return;
            }

            answered = false;

            const q = questions[index];
            let time = 15;

            display.innerHTML = `
                <h3>BRAIN SPRINT</h3>

                <p class="game-status">
                    QUESTION ${index + 1} / ${questions.length}
                </p>

                <h4>${q.question}</h4>

                <p id="quiz-time">Time: ${time}s</p>

                <div id="quiz-options">
                    ${q.options.map(option => `
                        <button class="game-option" data-answer="${option}">
                            ${option}
                        </button>
                    `).join("")}
                </div>

                <p id="quiz-feedback" class="game-status"></p>
            `;

            const gameId = currentGame;

            const optionButtons =
                display.querySelectorAll("[data-answer]");

            function answerQuestion(option) {

                if (answered || gameId !== currentGame) return;

                answered = true;
                clearInterval(quizTimer);

                if (option === q.answer) {
                    score += 10;
                    document.getElementById("quiz-feedback").textContent =
                        "CORRECT! +10 POINTS";
                } else {
                    document.getElementById("quiz-feedback").textContent =
                        "WRONG! Correct answer: " + q.answer;
                }

                optionButtons.forEach(btn => btn.disabled = true);

                setTimeout(() => {
                    if (gameId !== currentGame) return;
                    index++;
                    showQuestion();
                }, 1200);
            }

            optionButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    answerQuestion(btn.dataset.answer);
                });
            });

            quizTimer = setInterval(() => {

                if (gameId !== currentGame || answered) return;

                time--;

                const timer = document.getElementById("quiz-time");

                if (timer) timer.textContent = "Time: " + time + "s";

                if (time <= 0) {
                    answerQuestion("");
                }

            }, 1000);
        }

        showQuestion();
    }

    /* =================================
       GAME 2: MEMORY MATRIX
    ================================= */

    function startMemoryMatrix() {

        const symbols = [
            "🚀", "💡", "⚡", "🎯",
            "🌍", "🧠", "💻", "🔥"
        ];

        const cards = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5);

        let firstCard = null;
        let secondCard = null;
        let moves = 0;
        let matches = 0;
        let locked = false;

        const gameId = currentGame;

        display.innerHTML = `
            <h3>MEMORY MATRIX</h3>
            <p class="game-status">
                Find all matching pairs!
            </p>
            <p id="memory-moves">Moves: 0</p>

            <div id="memory-board"
                style="
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:10px;
                max-width:400px;
                margin:20px auto;">
            </div>

            <p id="memory-status" class="game-status"></p>
        `;

        const board = document.getElementById("memory-board");

        cards.forEach(symbol => {

            const card = document.createElement("button");

            card.textContent = "?";
            card.className = "game-option";

            card.style.fontSize = "24px";
            card.style.padding = "20px 5px";

            card.addEventListener("click", () => {

                if (
                    locked ||
                    card === firstCard ||
                    card.textContent !== "?" ||
                    gameId !== currentGame
                ) return;

                card.textContent = symbol;

                if (!firstCard) {
                    firstCard = card;
                    return;
                }

                secondCard = card;
                moves++;

                document.getElementById("memory-moves").textContent =
                    "Moves: " + moves;

                if (firstCard.textContent === secondCard.textContent) {

                    firstCard.disabled = true;
                    secondCard.disabled = true;

                    firstCard = null;
                    secondCard = null;

                    matches++;

                    if (matches === 8) {
                        document.getElementById("memory-status").textContent =
                            "YOU WON! Completed in " + moves + " moves!";
                    }

                } else {

                    locked = true;

                    setTimeout(() => {

                        if (gameId !== currentGame) return;

                        firstCard.textContent = "?";
                        secondCard.textContent = "?";

                        firstCard = null;
                        secondCard = null;

                        locked = false;

                    }, 800);

                }

            });

            board.appendChild(card);

        });

    }

    /* =================================
       GAME 3: CODE BREAKER
    ================================= */

    function startCodeBreaker() {

        const secret = [];

        while (secret.length < 4) {

            const digit = Math.floor(Math.random() * 10);

            if (!secret.includes(digit)) {
                secret.push(digit);
            }

        }

        let attempts = 8;

        display.innerHTML = `
            <h3>CODE BREAKER</h3>

            <p class="game-status">
                Crack the secret 4-digit code!
            </p>

            <p>Rules: Use four different digits. You have 8 attempts.</p>

            <input
                type="text"
                id="code-input"
                class="game-input"
                maxlength="4"
                placeholder="0000"
                inputmode="numeric"
            >

            <button class="game-btn" id="guess-code">
                SUBMIT ↗
            </button>

            <p id="code-status" class="game-status">
                Attempts remaining: 8
            </p>

            <div id="code-history"></div>
        `;

        const input = document.getElementById("code-input");
        const submit = document.getElementById("guess-code");
        const status = document.getElementById("code-status");
        const history = document.getElementById("code-history");

        function makeGuess() {

            const guess = input.value;

            if (!/^\d{4}$/.test(guess) ||
                new Set(guess).size !== 4) {

                status.textContent =
                    "Enter exactly 4 different digits!";

                return;
            }

            const digits = guess.split("").map(Number);

            let exact = 0;
            let misplaced = 0;

            digits.forEach((digit, index) => {

                if (digit === secret[index]) {
                    exact++;
                } else if (secret.includes(digit)) {
                    misplaced++;
                }

            });

            attempts--;

            history.innerHTML += `
                <p>
                    ${guess} —
                    Correct position: ${exact},
                    Wrong position: ${misplaced}
                </p>
            `;

            if (exact === 4) {

                status.textContent =
                    "ACCESS GRANTED! YOU CRACKED THE CODE!";

                submit.disabled = true;
                input.disabled = true;

            } else if (attempts === 0) {

                status.textContent =
                    "GAME OVER! Secret code: " + secret.join("");

                submit.disabled = true;
                input.disabled = true;

            } else {

                status.textContent =
                    "Attempts remaining: " + attempts;

            }

            input.value = "";

        }

        submit.addEventListener("click", makeGuess);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") makeGuess();
        });

    }

})();
/* =================================
   IEDC IDEA SPRINT FAQ ASSISTANT
================================= */
/* =================================
   IEDC IDEA SPRINT FAQ ASSISTANT
   UPGRADED VERSION
================================= */

(() => {

    const toggle = document.getElementById("chatbot-toggle");
    const box = document.getElementById("chatbot-box");
    const close = document.getElementById("chatbot-close");
    const send = document.getElementById("chatbot-send");
    const input = document.getElementById("chatbot-input");
    const messages = document.getElementById("chatbot-messages");

    if (!toggle || !box || !close || !send || !input || !messages) return;

    // OPEN AND CLOSE CHATBOT

    toggle.addEventListener("click", () => {
        box.classList.toggle("active");
    });

    close.addEventListener("click", () => {
        box.classList.remove("active");
    });


    // FAQ DATABASE

    const faq = [

        {
            keywords: ["idea sprint", "about the event", "what is this event"],
            answer: "IDEA SPRINT '26 is a student ideathon concept presented by IEDC Bootcamp CEC. Its theme is innovation, creativity and turning ideas into action."
        },

        {
            keywords: ["date", "when is the event", "event day"],
            answer: "The planned event date is 15 November 2026. Please confirm the final date and timings with the IEDC Bootcamp CEC organizers."
        },

        {
            keywords: ["duration", "how long", "24 hours"],
            answer: "Idea Sprint is designed as a 24-hour ideathon experience where students explore problems, develop ideas and present solutions!"
        },

        {
            keywords: ["register", "registration", "join", "sign up"],
            answer: "You can explore the Register section on this website. Remember, the current registration form is only a demo and does not submit or store your details."
        },

        {
            keywords: ["team", "group", "members", "collaborate"],
            answer: "Idea Sprint encourages teamwork! Connect with other students, share your strengths and work together to develop an innovative idea. Confirm official team-size rules with the organizers."
        },

        {
            keywords: ["schedule", "timing", "agenda", "plan"],
            answer: "Visit the Schedule section to explore the two-day event plan. The timings currently displayed are illustrative and must be confirmed by the organizers."
        },

        {
            keywords: ["idea lab", "generate idea", "creative idea"],
            answer: "Visit the Idea Lab! Choose a theme such as Smart Campus, Sustainability, Health or Future Technology and generate a creative project prompt."
        },

        {
            keywords: ["game zone", "games", "play", "mini games"],
            answer: "Our Game Zone has three mini games: Brain Sprint, Memory Matrix and Code Breaker. Give them a try!"
        },

        {
            keywords: ["iedc", "bootcamp"],
            answer: "IEDC stands for Innovation and Entrepreneurship Development Centre. It encourages students to explore innovation, creativity and entrepreneurship."
        },

        {
            keywords: ["who can participate", "eligibility", "students"],
            answer: "This concept website is designed around student participation. Please check with IEDC Bootcamp CEC organizers for official eligibility requirements."
        },

        {
            keywords: ["location", "venue", "where"],
            answer: "The website is presented by IEDC Bootcamp CEC. Please contact the organizers for the confirmed event venue."
        },

        {
            keywords: ["fee", "fees", "payment", "cost"],
            answer: "Registration fees have not been confirmed on this concept website. Please contact the organizers for official details."
        },

        {
            keywords: ["prize", "prizes", "winner", "award"],
            answer: "Prize and award details have not been confirmed here. Please check with the IEDC organizers for official announcements."
        },

        {
            keywords: ["contact", "help", "organizer"],
            answer: "For official event information, contact the IEDC Bootcamp CEC organizers through their official communication channels."
        },

        {
            keywords: ["thank", "thanks"],
            answer: "You're welcome! Keep innovating, keep experimenting and keep creating! ✨"
        },

        {
            keywords: ["hello", "hi", "hey"],
            answer: "Heyyy! 👋 Welcome to IDEA SPRINT '26! What would you like to know?"
        }

    ];


    // FIND THE BEST ANSWER

    function getAnswer(question) {

        const text = question.toLowerCase().trim();

        let bestMatch = null;
        let highestScore = 0;

        faq.forEach(item => {

            item.keywords.forEach(keyword => {

                if (text.includes(keyword.toLowerCase())) {

                    if (keyword.length > highestScore) {
                        highestScore = keyword.length;
                        bestMatch = item.answer;
                    }

                }

            });

        });

        return bestMatch ||
            "Hmm! I don't have an answer for that yet. Please contact the IEDC Bootcamp CEC organizers for more information. 💗";
    }


    // DISPLAY MESSAGES

    function addMessage(text, className) {

        const message = document.createElement("div");

        message.className = className;
        message.textContent = text;

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;

    }


    // SEND MESSAGE

   function sendMessage() {

    const question = input.value.trim();

    if (!question) return;

    addMessage(question, "user-message");

    input.value = "";

    // Create typing animation
    const typing = document.createElement("div");

    typing.className = "bot-message typing-indicator";
    typing.innerHTML = "<span></span><span></span><span></span>";

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {

        typing.remove();

        const answer = getAnswer(question);

        addMessage(answer, "bot-message");

    }, 1000);

}


    send.addEventListener("click", sendMessage);

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            sendMessage();
        }

    });


    // SUGGESTED QUESTIONS

    const suggestions = [
        "What is Idea Sprint?",
        "When is the event?",
        "How can I register?",
        "What games are available?"
    ];

    const suggestionBox = document.createElement("div");

    suggestionBox.className = "chatbot-quick-questions";

    suggestions.forEach(question => {

        const button = document.createElement("button");

        button.className = "chatbot-suggestion";
        button.textContent = question;

        button.addEventListener("click", () => {

            input.value = question;
            sendMessage();

        });

        suggestionBox.appendChild(button);

    });

    messages.appendChild(suggestionBox);

})();
/* CYBERPUNK SCROLL PROGRESS */

const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width = progress + "%";

});
