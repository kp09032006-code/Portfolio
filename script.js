document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Typing effect
  const typingText = document.getElementById("typingText");
  const words = [
    "IT Student",
    "Data Analytics Learner",
    "SQL & Excel Enthusiast",
    "Python Problem Solver"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const current = words[wordIndex];

    if (deleting) {
      typingText.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let speed = deleting ? 45 : 85;

    if (!deleting && charIndex === current.length) {
      speed = 1300;
      deleting = true;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 350;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Assistant widget
  const assistantToggle = document.getElementById("assistantToggle");
  const assistantBox = document.getElementById("assistantBox");
  const assistantClose = document.getElementById("assistantClose");
  const assistantMessages = document.getElementById("assistantMessages");
  const assistantInput = document.getElementById("assistantInput");
  const assistantSend = document.getElementById("assistantSend");

  assistantToggle.addEventListener("click", () => {
    assistantBox.classList.add("open");
    assistantInput.focus();
  });

  assistantClose.addEventListener("click", () => {
    assistantBox.classList.remove("open");
  });

  const responses = [
    {
      keys: ["skill", "skills", "technology", "tech"],
      answer: "Krisha works with SQL, Microsoft Excel, Power BI, and Python basics. Her main focus is Data Analytics and practical IT project building."
    },
    {
      keys: ["education", "college", "cgpa", "course"],
      answer: "Krisha is a B.Tech Information Technology student at MBIT with a CGPA of 7.18. She scored 82% in Secondary School and 57.38% in Higher Secondary."
    },
    {
      keys: ["project", "translation", "voice", "file"],
      answer: "Her projects include Agrovision: Smart Crop Health Monitoring System and Double Layer Steganography using Python and database/security logic."
    },
    {
      keys: ["certificate", "certification", "ibm"],
      answer: "Krisha has completed the Complete Web Development Course and IBM SkillsBuild AI Tutorial certification."
    },
    {
      keys: ["contact", "email", "phone", "linkedin", "github"],
      answer: "You can contact Krisha at kp09032006@gmail.com or +91 6359521767. Her GitHub is patelkrisha2506-eng and LinkedIn is patel-krisha-97."
    }
  ];

  function addAssistantMessage(message, type) {
    const bubble = document.createElement("div");
    bubble.className = type === "user" ? "user-message" : "bot-message";
    bubble.textContent = message;
    assistantMessages.appendChild(bubble);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function answerQuestion() {
    const question = assistantInput.value.trim();
    if (!question) return;

    addAssistantMessage(question, "user");
    assistantInput.value = "";

    const lower = question.toLowerCase();
    const match = responses.find((item) =>
      item.keys.some((key) => lower.includes(key))
    );

    const answer = match
      ? match.answer
      : "I can answer questions about Krisha's skills, education, project, certification, and contact details.";

    setTimeout(() => addAssistantMessage(answer, "bot"), 450);
  }

  assistantSend.addEventListener("click", answerQuestion);

  assistantInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      answerQuestion();
    }
  });
});
