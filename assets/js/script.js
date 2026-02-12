/* ---------------- MUSIC ---------------- */

const music = document.getElementById("bgMusic");

window.addEventListener("load", () => {
    music.play().catch(() => { });
});

document.body.addEventListener("click", () => {
    music.play();
}, { once: true });

function toggleMusic() {
    music.paused ? music.play() : music.pause();
}

/* ---------------- SLIDESHOW (KEN BURNS) ---------------- */

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function activateSlide(index) {
    slides.forEach(slide => slide.style.opacity = 0);

    const activeSlide = slides[index];

    anime({
        targets: activeSlide,
        opacity: [0, 1],
        scale: [1.1, 1.2],
        translateX: [-20, 20],
        duration: 8000,
        easing: "easeInOutSine"
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    activateSlide(currentSlide);
}

activateSlide(0);
setInterval(nextSlide, 6000);

/* ---------------- MESSAGE ---------------- */

const messageText = `
  Nkem,
  
  From the moment we started dating,
  something shifted in my world.
  
  You’re 5’1 of pure trouble 😌 —
  small but somehow capable of disturbing my peace
  and restoring it at the same time.
  
  Yes, you can be annoying sometimes…
  but even that makes me smile when I’m alone.
  
  
  You’re sweet.
  You’re caring.
  And you make loving you effortless.
  A hụrụ m gị n’anya
  
  You may be short…
  but you stand tallest in my life.
  
  So Nkem…
  
  Will you be my Valentine? ❤️
  `;

const messageElement = document.getElementById("message");
let i = 0;

function typeWriter() {
    if (i < messageText.length) {
        messageElement.innerHTML += messageText.charAt(i);
        i++;
        setTimeout(typeWriter, 28);
    } else {
        revealButtons();
    }
}
typeWriter();

/* Intro animations */
anime({
    targets: '#title',
    opacity: [0, 1],
    translateY: [-40, 0],
    duration: 2000,
    easing: 'easeOutExpo'
});

anime({
    targets: '#message',
    opacity: [0, 1],
    delay: 1000,
    duration: 2000,
    easing: 'easeOutExpo'
});

function revealButtons() {
    const btns = document.getElementById("buttons");
    btns.style.display = "block";

    anime({
        targets: btns,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)'
    });
}

/* ---------------- FLOATING HEARTS ---------------- */

for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 5 + Math.random() * 5 + 's';
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
}

/* ---------------- YES BUTTON ---------------- */

function sayYes() {

    anime({
        targets: 'body',
        scale: [1, 1.05, 1],
        duration: 600
    });

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.background = `hsl(${Math.random() * 360},100%,70%)`;
        document.body.appendChild(confetti);

        anime({
            targets: confetti,
            translateX: (Math.random() - 0.5) * 900,
            translateY: (Math.random() - 0.5) * 900,
            scale: [1, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            complete: () => confetti.remove()
        });
    }

    document.querySelector(".container").innerHTML =
        "<h1 id='finalText'>She Said YES 😭❤️</h1>";

    setTimeout(() => {
        anime({
            targets: '#finalText',
            opacity: [0, 1],
            scale: [1, 1.2, 1],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine'
        });
    }, 800);
}

/* ---------------- CHAOTIC NO BUTTON ---------------- */

const noBtn = document.getElementById("noBtn");
const yesBtn = document.querySelector(".yes");
let scaleSize = 1;
let yesScale = 1;

const funnyMessages = [
    "Too short 😌",
    "5'1 can't reach it 😭",
    "Try jumping maybe?",
    "Peace behave 😭",
    "Don't be stubborn 😤",
    "Just press Yes ❤️",
    "Small but mighty stubborn?",
    "Ok, you win... JK 😂",
    "Press Yes already! 😡",
    "Fine, stay single 😤",
    "Just kidding, love you! 😘",
    "Please? 🥺"
];

let msgIndex = 0;

noBtn.addEventListener("mouseover", () => {
    // Move button out of transformed container so position:fixed works relative to viewport
    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Move button to random position within visible viewport
    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "10";
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;
    noBtn.style.left = (20 + Math.random() * maxX) + "px";
    noBtn.style.top = (20 + Math.random() * maxY) + "px";

    // Shrink No button
    scaleSize -= 0.1;
    noBtn.style.transform = `scale(${Math.max(0.1, scaleSize)})`;

    // Grow Yes button
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Update text
    if (msgIndex < funnyMessages.length) {
        noBtn.innerText = funnyMessages[msgIndex++];
    } else {
        noBtn.innerText = "You know you love me ❤️";
    }
});
