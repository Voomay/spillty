/* 
  VW Splitty - Gallery Filtering & Pagination
*/

document.addEventListener("DOMContentLoaded", () => {
    // Media Arrays
    const images = [
        "WhatsApp Image 2026-03-16 at 17.51.29.jpeg",
        "WhatsApp Image 2026-03-16 at 17.51.48 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.51.48.jpeg",
        "WhatsApp Image 2026-03-16 at 17.51.49 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.51.49 (2).jpeg",
        "WhatsApp Image 2026-03-16 at 17.51.49.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.53.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.54 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.54.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.55 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.55.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.57.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.58.jpeg",
        "WhatsApp Image 2026-03-16 at 17.54.59.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.00 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.00.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.01.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.02 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.02.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.03.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.04.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.07.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.11.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.18.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.21.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.25.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.26.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.31 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.31.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.51 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.51.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.52 (1).jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.52.jpeg",
        "WhatsApp Image 2026-03-16 at 17.55.56.jpeg"
    ];

    const videos = [
        "WhatsApp Video 2026-03-16 at 17.51.47.mp4",
        "WhatsApp Video 2026-03-16 at 17.52.19.mp4",
        "WhatsApp Video 2026-03-16 at 17.54.51.mp4",
        "WhatsApp Video 2026-03-16 at 17.54.56.mp4",
        "WhatsApp Video 2026-03-16 at 17.54.59.mp4"
    ];

    const galleryGrid = document.querySelector(".gallery-grid");
    const loadMoreBtn = document.getElementById("load-more");

    const ITEMS_LIMIT = 9;
    let visibleCount = ITEMS_LIMIT;

    function renderGallery() {
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = "";
        
        // Combine items for 'all' filter rendering
        const allItems = [
            ...images.map(img => ({ type: 'photo', src: img })),
            ...videos.map(vid => ({ type: 'video', src: vid }))
        ];

        // Render visible slice
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
        
        const filteredItems = allItems.filter(item => {
            if (activeFilter === "all") return true;
            return item.type === activeFilter;
        });

        const itemsToShow = filteredItems.slice(0, visibleCount);

        itemsToShow.forEach(item => {
            const div = document.createElement("div");
            div.className = `gallery-item ${item.type}`;
            if (item.type === 'photo') {
                div.innerHTML = `
                    <img src="${item.src}" alt="VW Splitty" style="width:100%; height:100%; object-fit:cover;">
                    <div class="overlay"><i class="fa-solid fa-camera"></i></div>
                `;
            } else {
                div.innerHTML = `
                    <video src="${item.src}" style="width:100%; height:100%; object-fit:cover;" controls muted></video>
                    <div class="overlay" style="background:transparent; pointer-events:none;"><i class="fa-solid fa-play"></i></div>
                `;
            }
            galleryGrid.appendChild(div);
        });

        // Toggle Load More Button visibility
        if (visibleCount >= filteredItems.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = "none";
        } else {
            if (loadMoreBtn) loadMoreBtn.style.display = "inline-block";
        }
    }

    // Initial Render
    renderGallery();

    // Toggle Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            // Reset visibility limit on filter change
            visibleCount = ITEMS_LIMIT; 
            renderGallery();
        });
    });

    // Load More Action
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            visibleCount += ITEMS_LIMIT; // Load next set
            renderGallery();
        });
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    const SLIDE_INTERVAL = 5000; // 5 seconds

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if (slides.length > 0) {
        setInterval(nextSlide, SLIDE_INTERVAL);
    }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-list a");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });
});
