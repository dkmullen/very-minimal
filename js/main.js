const themeToggle = document.querySelector("#theme-toggle");
const lightIcon = document.querySelector("#light-theme-icon");
const darkIcon = document.querySelector("#dark-theme-icon");

function isDarkTheme() {
  return document.body.classList.contains("dark");
}

function changeThemeIcon() {
  const isDark = isDarkTheme();
  lightIcon.style.display = isDark ? "block" : "none";
  darkIcon.style.display = isDark ? "none" : "block";
}

changeThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  changeThemeIcon();
});