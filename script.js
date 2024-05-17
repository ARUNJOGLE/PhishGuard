// Function to toggle dark theme
function toggleTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (themeToggle.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
}

// Function to parse CSV data
function parseCsv(data) {
  const lines = data.trim().split("\n");
  const headers = lines[0].split(",");
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j].trim();
    }
    result.push(obj);
  }
  return result;
}

// Function to normalize URL
function normalizeUrl(url) {
  return url.toLowerCase().replace(/\/$/, ""); // Remove trailing slash and convert to lowercase
}

// Function to check URL security
function checkUrl() {
  const urlInput = document.getElementById("urlInput").value.trim();
  const normalizedInput = normalizeUrl(urlInput);
  const loader = document.getElementById("loader");
  const result = document.getElementById("result");

  loader.style.display = "block";
  result.textContent = "";

  setTimeout(() => {
    loader.style.display = "none";

    if (!urlInput) {
      result.textContent = "Please enter a URL";
      result.style.color = "orange";
    } else if (!/^https?:\/\//i.test(urlInput)) {
      result.textContent =
        "Invalid URL format. Please include 'http://' or 'https://'";
      result.style.color = "red";
    } else {
      // Check against parsed data if needed
      const found = parsedData.find(
        (row) => normalizeUrl(row.url) === normalizedInput
      );

      if (found) {
        if (found.phishingOrNot.toUpperCase() === "TRUE") {
          result.textContent = "This is found to be not a secure one";
          result.style.color = "red";
        } else {
          result.textContent = "This is found to be a secure one";
          result.style.color = "green";
        }
      } else {
        result.textContent = "This is found to be a moderated one";
        result.style.color = "orange";
      }
    }
  }, 2000); // Simulate loading time
}

// Theme toggle initialization
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("change", toggleTheme);
});

let parsedData = [];

// Fetch and parse CSV data
fetch("data.csv")
  .then((response) => response.text())
  .then((data) => {
    parsedData = parseCsv(data);
    console.log("Parsed CSV data:", parsedData); // Debug statement
  })
  .catch((error) => console.error("Error fetching CSV:", error));
