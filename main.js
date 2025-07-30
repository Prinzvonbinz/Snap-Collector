const categories = {
  Restaurants: ["McDonald's", "Burger King", "Starbucks", "KFC", "Subway", "Dunkin’ Donuts", "Vapiano", "Five Guys", "Pizza Hut", "Chipotle", "Taco Bell", "Pret A Manger", "Shake Shack", "Wagamama", "Tim Hortons", "Nordsee", "Hans im Glück", "Domino’s", "L’Osteria", "Chilis"],
  Läden: ["Lidl", "Aldi", "Rewe", "Edeka", "Penny", "Netto", "Real", "Kaufland", "DM", "Rossmann", "Müller", "Toom", "Obi", "Hornbach", "IKEA", "MediaMarkt", "Saturn", "Tchibo", "Zara", "C&A"],
  Bäume: ["Eiche", "Buche", "Ahorn", "Kiefer", "Tanne", "Fichte", "Birke", "Kastanie", "Linde", "Ulme", "Esche", "Weide","Lärche","Pfaffenhütchen"],
  Tiere: ["Fuchs", "Reh", "Wildschwein", "Eichhörnchen", "Hase", "Igel", "Dachs", "Waschbär", "Taube", "Amsel", "Spatz", "Rabe", "Schaf", "Ziege", "Kuh", "Schwein", "Adler", "Hund", "Katze"],
  Automarken: ["Porsche", "Ferrari", "Lamborghini", "BMW", "Audi", "Mercedes-Benz", "Volkswagen", "Opel", "Renault", "Peugeot"],
  Elektronik: ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Lenovo", "Asus", "Microsoft", "Xiaomi"],
  Getränke: ["Coca-Cola", "Pepsi", "Fanta", "Sprite", "Red Bull", "Monster", "Lipton", "Nestea", "Apollinaris", "Volvic"],
  Natur: ["Fluss", "See", "Wald", "Berg", "Tal", "Klippe", "Insel", "Wasserfall", "Vulkan", "Wiese"]
};

let photos = {};
let selectedItem = "";

// Lade Daten bei Start
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("photoSave");
  if (saved) {
    try {
      photos = JSON.parse(saved);
    } catch {
      photos = {};
    }
  }
});

function startGame() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("gallery").classList.remove("hidden");
  generateGallery();
  updateProgress();
}

function showInstructions() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("instructions").classList.remove("hidden");
}

function backToMenu() {
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("gallery").classList.add("hidden");
  document.getElementById("instructions").classList.add("hidden");
}

function generateGallery() {
  const gallery = document.getElementById("gallery-content");
  gallery.innerHTML = "";

  for (const category in categories) {
    // Kategorie-Überschrift
    const heading = document.createElement("h2");
    heading.innerText = category;
    heading.style.marginTop = "2rem";
    heading.style.marginBottom = "0.5rem";
    heading.style.color = "#222";
    gallery.appendChild(heading);

    // Karten-Container
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px";

    for (const name of categories[category]) {
      const div = document.createElement("div");
      div.className = "card";
      div.dataset.name = name.toLowerCase();

      const img = document.createElement("img");
      img.src = photos[name] || "";
      img.alt = name;
      img.style.background = photos[name] ? "none" : "#ccc";

      const label = document.createElement("div");
      label.innerText = name;

      div.appendChild(img);
      div.appendChild(label);
      div.onclick = () => {
        selectedItem = name;
        document.getElementById("photo-input").click();
      };

      container.appendChild(div);
    }

    gallery.appendChild(container);
  }
}

document.getElementById("photo-input").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file || !selectedItem) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    photos[selectedItem] = evt.target.result;
    localStorage.setItem("photoSave", JSON.stringify(photos));
    generateGallery();
    updateProgress();
  };
  reader.readAsDataURL(file);

  e.target.value = ""; // Reset file input
});

function updateProgress() {
  const total = Object.values(categories).flat().length;
  const filled = Object.keys(photos).length;
  const percent = Math.floor((filled / total) * 100);
  document.getElementById("progress").innerText = `Fortschritt: ${percent}%`;

  if (percent === 100) {
    alert("Du hast alles vervollständigt! Glückwunsch! Du bist nun ein echter Snap Collector");
  }
}

function filterGallery() {
  const query = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.dataset.name;
    card.style.display = name.includes(query) ? "block" : "none";
  });
        }
