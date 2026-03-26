const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

createSplashScreenOnce();

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

const chatbotPanel = document.querySelector("[data-chatbot]");
const chatbotOpen = document.querySelector("[data-chatbot-open]");
const chatbotClose = document.querySelector("[data-chatbot-close]");
const chatbotForm = document.querySelector("[data-chatbot-form]");
const chatbotMessages = document.querySelector("[data-chatbot-messages]");

if (chatbotOpen && chatbotPanel) {
  chatbotOpen.addEventListener("click", () => chatbotPanel.classList.remove("hidden"));
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener("click", () => chatbotPanel.classList.add("hidden"));
}

const chatbotReplies = [
  "Zytrix can help with AI tools, automation, website development, and student projects.",
  "You can log in to explore the dashboard and try the Resume AI Tool.",
  "For custom builds, use the contact page or WhatsApp button for a faster response.",
  "We design responsive startup experiences with futuristic UI and practical workflows."
];

if (chatbotForm && chatbotMessages) {
  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = chatbotForm.elements.message;
    const value = input.value.trim();

    if (!value) {
      return;
    }

    appendChatMessage(value, "user");
    input.value = "";

    const reply = chatbotReplies[Math.floor(Math.random() * chatbotReplies.length)];
    window.setTimeout(() => appendChatMessage(reply, "bot"), 400);
  });
}

function appendChatMessage(message, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${sender}`;
  bubble.textContent = message;
  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

const resumeForm = document.getElementById("resumeForm");
const resumeOutput = document.getElementById("resumeOutput");

if (resumeForm && resumeOutput) {
  resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("candidateName").value.trim();
    const skills = document.getElementById("candidateSkills").value.trim();
    const education = document.getElementById("candidateEducation").value.trim();
    const skillList = skills.split(",").map((item) => item.trim()).filter(Boolean);

    resumeOutput.innerHTML = `
      <h2>${escapeHtml(name)}</h2>
      <p><strong>Professional Summary</strong></p>
      <p>${escapeHtml(name)} is a motivated candidate with a focus on modern digital execution, continuous learning, and AI-assisted productivity.</p>
      <p><strong>Key Skills</strong></p>
      <ul>${skillList.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("")}</ul>
      <p><strong>Education</strong></p>
      <p>${escapeHtml(education)}</p>
    `;
  });
}

const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

if (contactForm && contactFeedback) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    contactFeedback.textContent = "Sending your message...";
    contactFeedback.className = "form-feedback";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/zytrix.tec@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      contactFeedback.textContent = "Message sent successfully to Zytrix.";
      contactFeedback.className = "form-feedback success";
      contactForm.reset();
    } catch (error) {
      contactFeedback.textContent = "Message could not be sent right now. Please try again.";
      contactFeedback.className = "form-feedback error";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}

const siteSearchEntries = [
  { keywords: ["ai", "ai tools"], target: "index.html#ai-tools" },
  { keywords: ["resume", "resume ai", "resume builder", "cv"], target: "resume-ai-service.html" },
  { keywords: ["chatbot", "chatbots", "bot"], target: "chatbots-service.html" },
  { keywords: ["generator", "generators", "ai generator"], target: "index.html#ai-tools" },
  { keywords: ["automation"], target: "index.html#automation" },
  { keywords: ["python", "python automation"], target: "index.html#automation" },
  { keywords: ["whatsapp", "whatsapp bot", "whatsapp bots"], target: "whatsapp-bots-service.html" },
  { keywords: ["instagram", "instagram automation", "insta"], target: "index.html#automation" },
  { keywords: ["development", "website development", "web development"], target: "index.html#development" },
  { keywords: ["portfolio", "portfolio website", "portfolio websites"], target: "portfolio-websites-service.html" },
  { keywords: ["business website", "business websites"], target: "index.html#development" },
  { keywords: ["web app", "web apps", "app"], target: "index.html#development" },
  { keywords: ["student", "student tools"], target: "index.html#student-tools" },
  { keywords: ["mini project", "mini projects", "project"], target: "mini-projects-service.html" },
  { keywords: ["coding", "coding help", "debugging"], target: "coding-help-service.html" },
  { keywords: ["contact", "hire", "quote"], target: "contact.html" }
];

const siteSearchForms = document.querySelectorAll("[data-site-search]");

siteSearchForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const rawQuery = String(formData.get("query") || "").trim().toLowerCase();

    if (!rawQuery) {
      return;
    }

    const match = siteSearchEntries.find((entry) =>
      entry.keywords.some((keyword) => rawQuery.includes(keyword) || keyword.includes(rawQuery))
    );

    if (!match) {
      window.location.href = "contact.html";
      return;
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const [targetPage, targetHash] = match.target.split("#");

    if (!targetPage || targetPage === currentPage) {
      if (targetHash) {
        const targetElement = document.getElementById(targetHash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    }

    window.location.href = match.target;
  });
});

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createSplashScreenOnce() {
  const splashSeenKey = "zytrix_splash_seen";

  if (sessionStorage.getItem(splashSeenKey) === "true") {
    return;
  }

  sessionStorage.setItem(splashSeenKey, "true");

  const splash = document.createElement("div");
  splash.className = "site-splash";
  splash.innerHTML = `
    <div class="site-splash-inner">
      <div class="site-splash-mark">
        <span class="splash-ring splash-ring-one"></span>
        <span class="splash-ring splash-ring-two"></span>
        <span class="splash-core">Z</span>
      </div>
      <h1>Zytrix</h1>
      <p>AI • Automation • Development</p>
    </div>
  `;

  document.body.appendChild(splash);

  window.setTimeout(() => {
    splash.classList.add("site-splash-hide");
    window.setTimeout(() => splash.remove(), 700);
  }, 2000);
}
