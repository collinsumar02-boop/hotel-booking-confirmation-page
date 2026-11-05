const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector(".copy-status");
const password = document.querySelector(".password-value").textContent;

function setMenuOpen(isOpen) {
  sidebar.classList.toggle("menu-is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

sidebar.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(password);
    copyButton.textContent = "Copied";
    copyStatus.textContent = "Wi-Fi password copied.";
  } catch {
    copyButton.textContent = "Failed";
    copyStatus.textContent = "Could not copy the Wi-Fi password. Please copy it manually.";
  }

  window.setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 2000);
});

document.querySelector("#print-button").addEventListener("click", () => window.print());

document.querySelector("#calendar-button").addEventListener("click", () => {
  const calendarEvent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maison Soleil//Booking//EN",
    "BEGIN:VEVENT",
    "UID:MS-2026-0421-AH@maisonsoleil.example",
    "DTSTAMP:20260101T000000Z",
    "DTSTART;VALUE=DATE:20260425",
    "DTEND;VALUE=DATE:20260429",
    "SUMMARY:Stay at Maison Soleil - La Garrigue",
    "LOCATION:12 Rue des Oliviers\\, Cassis",
    "DESCRIPTION:Check-in Saturday 25 April from 15:00. Check-out Wednesday 29 April by 11:00.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const file = new Blob([calendarEvent], { type: "text/calendar;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "maison-soleil-stay.ics";
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
});
