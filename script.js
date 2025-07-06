// Birthday countdown
const birthday = new Date("2025-10-08T00:00:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  let timeLeft = birthday - now;

  if (timeLeft < 0) {
    countdown.innerHTML = "🎉 It's their Birthday Today! 🎉";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Image rotation
const image = document.getElementById("daily-image");
const day = new Date().getDate();
//image.src = `images/img${(day % 5) + 1}.png`; // Rotate image by date
image.src = `images/img1.png`;


image.onerror = function () {
  console.warn("Image not found:", image.src);
  image.src = "images/fallback.jpg";
};

// Daily fact logic
fetch('data/facts.json')
  .then(res => res.json())
  .then(facts => {
    const today = new Date();
  //  const index = today.getDate() % facts.length;
	const index = Math.min(today.getDate() - 1, facts.length - 1);
	console.log("Today's index:", index);
  console.log("Selected fact item:", facts[index]);

    // Handle both formats:
    // If array of strings → facts[index]
    // If array of objects → facts[index].fact
    const factItem = facts[index];
    const factText = typeof factItem === 'string' ? factItem : factItem.fact;

    document.getElementById("fact").innerText = factText || "No fact available.";
  })
  .catch(err => {
    console.error("Could not load facts:", err);
    document.getElementById("fact").innerText = "⚠️ Failed to load today's fact.";
  });
