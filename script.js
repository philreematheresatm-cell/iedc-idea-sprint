// Set the confirmed event date/time here when organisers announce it.
// Example: "2026-11-07T09:00:00+05:30"
const EVENT_DATE = null;

const scheduleData = {
  day1: [
    ["09:00 AM","Check-in & welcome","Meet the organisers, get settled, and kick off the sprint."],
    ["10:00 AM","Opening & problem discovery","Explore the challenge space and learn how to frame a useful problem."],
    ["12:00 PM","Team formation","Find collaborators, share skills, and choose a direction."],
    ["02:00 PM","Idea jam","Sketch concepts, test assumptions, and choose your strongest idea."],
    ["06:00 PM","Prototype checkpoint","Turn the concept into a tangible early version and gather feedback."],
    ["09:00 PM","Build session","Keep iterating, documenting, and shaping the story behind your solution."]
  ],
  day2: [
    ["12:00 AM","Midnight makers' check-in","Review progress, reset priorities, and keep the scope realistic."],
    ["06:00 AM","Final build sprint","Polish the prototype and make the core idea easy to understand."],
    ["09:00 AM","Pitch preparation","Structure your story, rehearse the demo, and prepare for questions."],
    ["11:00 AM","Showcase & presentations","Present your concept and demonstrate what your team has created."],
    ["01:00 PM","Feedback & closing","Reflect on what you learned and discover your next steps."]
  ]
};
const ideas = {
  campus: [
    ["Make campus life smoother.","Design a simple way for students to discover study spaces, resources, or events.","⌂"],
    ["Less waiting, more learning.","Find a campus queue or bottleneck and imagine a clearer way to manage it.","↗"],
    ["Help newcomers feel at home.","Create a tool or experience that helps new students find people, places, and support.","⌘"]
  ],
  planet: [
    ["Make waste less wasteful.","Imagine a student-friendly system that makes sorting, reusing, or sharing materials easier.","♻"],
    ["Save one drop at a time.","Spot a water or energy habit that could be improved with a small intervention.","≈"],
    ["A greener daily commute.","Create an idea that makes low-impact travel easier for students.","✳"]
  ],
  health: [
    ["Make a little room to breathe.","Design a low-pressure way to encourage breaks, connection, or healthy study routines.","♡"],
    ["Healthy habits, tiny steps.","Help busy students make one positive daily habit easier to start and sustain.","＋"],
    ["Find support more easily.","Explore how students could discover trusted wellbeing resources without feeling overwhelmed.","⌕"]
  ],
  tech: [
    ["Make confusing things clear.","Choose a common digital task that feels harder than it should and simplify it.","⌘"],
    ["Technology for the overlooked.","Design a small tool that makes an everyday service more accessible.","⌁"],
    ["Automate the annoying bit.","Find a repetitive student task and sketch a responsible way to reduce the effort.","⚡"]
  ]
};
const $ = s => document.querySelector(s);

// Mobile navigation
const menu = $(".menu"), nav = $(".nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menu.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menu.setAttribute("aria-expanded","false"); menu.textContent = "☰";
}));

// Countdown: intentionally shows placeholders until the real event date is confirmed.
function updateCountdown() {
  if (!EVENT_DATE) {
    ["days","hours","minutes","seconds"].forEach(id => $("#"+id).textContent = "—");
    $("#countdown-note").textContent = "Event date will be announced soon.";
    return;
  }
  const target = new Date(EVENT_DATE).getTime();
  if (Number.isNaN(target)) { $("#countdown-note").textContent = "Please check the event date in script.js."; return; }
  const distance = target - Date.now();
  if (distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => $("#"+id).textContent = "00");
    $("#countdown-note").textContent = "The sprint has started — let's go!";
    return;
  }
  $("#days").textContent = String(Math.floor(distance / 86400000)).padStart(2,"0");
  $("#hours").textContent = String(Math.floor(distance / 3600000) % 24).padStart(2,"0");
  $("#minutes").textContent = String(Math.floor(distance / 60000) % 60).padStart(2,"0");
  $("#seconds").textContent = String(Math.floor(distance / 1000) % 60).padStart(2,"0");
  $("#countdown-note").textContent = "Time left until Idea Sprint 2026.";
}
updateCountdown(); setInterval(updateCountdown,1000);

// Interactive Day 1 / Day 2 schedule. These times are illustrative placeholders.
function renderSchedule(day) {
  $("#timeline").innerHTML = scheduleData[day].map((item,i) =>
    `<article class="timeline-item" style="animation-delay:${i*45}ms"><div class="timeline-time">${item[0]}</div><div class="node"></div><div><h3>${item[1]}</h3><p>${item[2]}</p></div></article>`
  ).join("");
  document.querySelectorAll(".tab").forEach(button => {
    const active = button.dataset.day === day;
    button.classList.toggle("active",active);
    button.setAttribute("aria-selected",String(active));
  });
}
document.querySelectorAll(".tab").forEach(button => button.addEventListener("click", () => renderSchedule(button.dataset.day)));
renderSchedule("day1");

// Idea generator
let sparkCount = 1;
function generateIdea() {
  const pool = ideas[$("#theme").value] || ideas.campus;
  const current = pool[Math.floor(Math.random()*pool.length)];
  $("#idea-title").textContent = current[0];
  $("#idea-description").textContent = current[1];
  $("#idea-icon").textContent = current[2];
  $("#spark-number").textContent = String(++sparkCount).padStart(3,"0");
}
$("#generate").addEventListener("click",generateIdea);
$("#another").addEventListener("click",generateIdea);

// Frontend-only form validation: no data is sent or stored.
$("#registration-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = $("#full-name").value.trim();
  const email = $("#email").value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const checks = [
    ["name-error", name.length >= 2 ? "" : "Please enter your name (at least 2 characters)."],
    ["email-error", validEmail ? "" : "Please enter a valid email address."],
    ["year-error", $("#year").value ? "" : "Please select your year of study."],
    ["interest-error", $("#interest").value ? "" : "Please choose an area of interest."],
    ["consent-error", $("#consent").checked ? "" : "Please confirm the demo-form notice."]
  ];
  let valid = true;
  checks.forEach(([id,message]) => { $("#"+id).textContent = message; if (message) valid = false; });
  const status = $("#form-message");
  if (valid) {
    status.textContent = "All checks passed! This is only a demo: your details have not been submitted. Add the official registration link or backend before publishing.";
    status.style.color = "var(--cyan)";
  } else {
    status.textContent = "Please check the highlighted fields and try again.";
    status.style.color = "#ff78d5";
  }
});
