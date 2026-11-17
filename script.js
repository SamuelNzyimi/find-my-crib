const html = document.documentElement;
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const themeToggle = document.querySelector(".theme-toggle");

function closeMenu() {
  if (!primaryNav) return;
  primaryNav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

themeToggle?.addEventListener("click", () => {
  const dark = html.dataset.theme !== "dark";
  html.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.textContent = dark ? "☼" : "◐";
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      faqItem.querySelector("b").textContent = "+";
    });
    if (!isOpen) item.classList.add("is-open");
    button.querySelector("b").textContent = isOpen ? "+" : "−";
  });
});

document.querySelectorAll(".start-step button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".start-step");
    const isOpen = item.classList.toggle("is-open");
    button.querySelector("b").textContent = isOpen ? "−" : "+";
  });
});

document.querySelector("#signup-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#signup-message");
  message.textContent = "Thanks — you’re on the list. We’ll be in touch when the next move is ready.";
  message.style.color = "var(--accent-deep)";
  event.currentTarget.reset();
});

const listings = [
  {
    id: "bright-bedsitter-karen",
    title: "Bright bedsitter in Karen",
    type: "bedsitter",
    typeLabel: "Bedsitter",
    location: "Karen",
    university: "cuea",
    universityLabel: "CUEA",
    distance: 10,
    landmark: "CUEA Main Gate",
    price: 12500,
    priceBasis: "per unit",
    amenities: ["water", "wifi", "security"],
    images: ["images/bedsitter.png", "images/display-1.png"],
    kicker: "Featured near campus",
    description: "A bright, practical home with enough room for studying, resting, and keeping your routine simple.",
    phone: "+254712345678",
    added: 6
  },
  {
    id: "greenview-shared-karen",
    title: "Greenview shared apartment",
    type: "shared",
    typeLabel: "Shared apartment",
    location: "Karen",
    university: "cuea",
    universityLabel: "CUEA",
    distance: 13,
    landmark: "CUEA South Gate",
    price: 8500,
    priceBasis: "per person",
    amenities: ["water", "wifi", "security"],
    images: ["images/display-1.png", "images/display-2.png"],
    kicker: "Best value",
    description: "A calm shared home with common spaces, reliable water, and a short walk to campus.",
    phone: "+254723456789",
    added: 5
  },
  {
    id: "valley-road-one-bedroom",
    title: "Valley Road 1 bedroom",
    type: "one-bedroom",
    typeLabel: "1 bedroom",
    location: "Kilimani",
    university: "uon",
    universityLabel: "University of Nairobi",
    distance: 16,
    landmark: "UON Main Campus",
    price: 22000,
    priceBasis: "per unit",
    amenities: ["water", "security"],
    images: ["images/display-2.png", "images/display-3.png"],
    kicker: "More space to settle in",
    description: "A comfortable one-bedroom unit close to shops, matatu routes, and the University of Nairobi.",
    phone: "+254734567890",
    added: 4
  },
  {
    id: "student-haven-shared",
    title: "Student Haven shared room",
    type: "shared",
    typeLabel: "Shared apartment",
    location: "Kahawa",
    university: "ku",
    universityLabel: "Kenyatta University",
    distance: 8,
    landmark: "KU Main Gate",
    price: 7000,
    priceBasis: "per person",
    amenities: ["water", "security"],
    images: ["images/display-3.png", "images/hero-1.png"],
    kicker: "Close to class",
    description: "A straightforward shared room for students who want to keep costs low and stay close to KU.",
    phone: "+254745678901",
    added: 3
  },
  {
    id: "royal-terrace-two-bedroom",
    title: "Royal Terrace 2 bedroom",
    type: "two-bedroom",
    typeLabel: "2 bedroom",
    location: "Roysambu",
    university: "ku",
    universityLabel: "Kenyatta University",
    distance: 21,
    landmark: "Thika Road Mall",
    price: 28000,
    priceBasis: "per unit",
    amenities: ["water", "wifi", "security"],
    images: ["images/hero-1.png", "images/display-1.png"],
    kicker: "Room for two",
    description: "A flexible two-bedroom home suited to friends sharing a place, with plenty of light and storage.",
    phone: "+254756789012",
    added: 2
  },
  {
    id: "campus-view-bedsitter",
    title: "Campus View bedsitter",
    type: "bedsitter",
    typeLabel: "Bedsitter",
    location: "Kasarani",
    university: "usiu",
    universityLabel: "USIU-Africa",
    distance: 12,
    landmark: "USIU Main Gate",
    price: 15000,
    priceBasis: "per unit",
    amenities: ["water", "wifi"],
    images: ["images/display-1.png", "images/bedsitter.png"],
    kicker: "Simple and connected",
    description: "A tidy bedsitter with Wi-Fi, nearby shops, and easy access to USIU-Africa.",
    phone: "+254767890123",
    added: 1
  }
];

const formatPrice = (price) => `KSh ${price.toLocaleString("en-KE")}`;
const amenityLabels = { water: "Water", wifi: "Wi-Fi", security: "Security" };

function listingCard(listing) {
  const slides = listing.images.map((image, index) => `<img src="${image}" alt="${listing.title} interior ${index + 1}" ${index ? "hidden" : ""}>`).join("");
  const amenities = listing.amenities.map((amenity) => `<span title="${amenityLabels[amenity]}">${amenity === "water" ? "♧" : amenity === "wifi" ? "⌁" : "✓"} ${amenityLabels[amenity]}</span>`).join("");
  return `<article class="listing-card" data-listing-id="${listing.id}">
    <div class="listing-card-image">
      <span class="listing-tag">AVAILABLE</span>
      <div class="listing-slider">${slides}</div>
      <button class="slider-button slider-prev" type="button" aria-label="Previous image">‹</button>
      <button class="slider-button slider-next" type="button" aria-label="Next image">›</button>
      <span class="slider-count">1 / ${listing.images.length}</span>
    </div>
    <div class="listing-card-body">
      <div class="listing-kicker">${listing.kicker}</div>
      <h3>${listing.title}</h3>
      <p class="listing-card-location">⌖ ${listing.location} · ${listing.distance} min walk to ${listing.landmark}</p>
      <div class="listing-card-meta"><span>${listing.typeLabel}</span><strong>${formatPrice(listing.price)} <small>/ ${listing.priceBasis}</small></strong></div>
      <div class="listing-amenity-row">${amenities}</div>
      <a class="button button-dark listing-detail-button" href="listing-detail.html?id=${listing.id}">View details <span>→</span></a>
    </div>
  </article>`;
}

function setupSliders() {
  document.querySelectorAll(".listing-card").forEach((card) => {
    const images = [...card.querySelectorAll(".listing-slider img")];
    let active = 0;
    const count = card.querySelector(".slider-count");
    const show = (next) => {
      active = (next + images.length) % images.length;
      images.forEach((image, index) => image.hidden = index !== active);
      count.textContent = `${active + 1} / ${images.length}`;
    };
    card.querySelector(".slider-prev").addEventListener("click", () => show(active - 1));
    card.querySelector(".slider-next").addEventListener("click", () => show(active + 1));
  });
}

function resetListingFilters(form) {
  form.reset();
  renderListings();
}

function renderListings() {
  const grid = document.querySelector("#listing-grid");
  if (!grid) return;
  const form = document.querySelector("#listing-search");
  const data = new FormData(form);
  const roomType = data.get("roomType");
  const location = String(data.get("location") || "").trim().toLowerCase();
  const university = data.get("university");
  const maxPrice = Number(data.get("price") || 0);
  const selectedAmenities = data.getAll("amenity");
  const sort = document.querySelector("#listing-sort")?.value || "newest";
  let visibleListings = listings.filter((listing) => {
    return (!roomType || listing.type === roomType)
      && (!location || listing.location.toLowerCase().includes(location))
      && (!university || listing.university === university)
      && (!maxPrice || listing.price <= maxPrice)
      && selectedAmenities.every((amenity) => listing.amenities.includes(amenity));
  });
  visibleListings.sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "distance" ? a.distance - b.distance : b.added - a.added);
  grid.innerHTML = visibleListings.map(listingCard).join("");
  document.querySelector("#results-count").textContent = visibleListings.length;
  document.querySelector("#listing-empty").hidden = visibleListings.length > 0;
  setupSliders();
}

function setupListingsPage() {
  const form = document.querySelector("#listing-search");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderListings();
    document.querySelector("#results").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("#listing-sort").addEventListener("change", renderListings);
  document.querySelector("#listing-reset").addEventListener("click", () => resetListingFilters(form));
  document.querySelector("#empty-reset").addEventListener("click", () => resetListingFilters(form));
  renderListings();
}

function setupDetailPage() {
  const title = document.querySelector("#detail-title");
  if (!title) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const listing = listings.find((item) => item.id === id) || listings[0];
  document.title = `Find My Crib — ${listing.title}`;
  document.querySelector("#detail-image").src = listing.images[0];
  document.querySelector("#detail-image").alt = `${listing.title} interior`;
  document.querySelector("#detail-kicker").textContent = listing.kicker;
  title.textContent = listing.title;
  document.querySelector("#detail-location").textContent = `${listing.location} · ${listing.distance} min walk to ${listing.landmark}`;
  document.querySelector("#detail-price").innerHTML = `${formatPrice(listing.price)} <small>/ month ${listing.priceBasis}</small>`;
  document.querySelector("#detail-description").textContent = listing.description;
  document.querySelector("#detail-call").href = `tel:${listing.phone}`;
  document.querySelector("#detail-facts").innerHTML = `<span>⌂ ${listing.typeLabel}</span><span>⌖ ${listing.universityLabel}</span>${listing.amenities.map((amenity) => `<span>${amenityLabels[amenity]}</span>`).join("")}`;
  document.querySelector("#detail-thumbnails").innerHTML = listing.images.map((image, index) => `<button type="button" class="${index === 0 ? "is-active" : ""}" data-image="${image}"><img src="${image}" alt="View ${index + 1}"></button>`).join("");
  document.querySelectorAll("#detail-thumbnails button").forEach((button) => button.addEventListener("click", () => {
    document.querySelector("#detail-image").src = button.dataset.image;
    document.querySelectorAll("#detail-thumbnails button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  }));
}

setupListingsPage();
setupDetailPage();
