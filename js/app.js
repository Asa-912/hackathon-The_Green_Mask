document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM ELEMENTS =====
    const homeView = document.getElementById('home-view');
    const scanView = document.getElementById('scan-view');
    const navStats = document.getElementById('nav-stats');
    const locationsGrid = document.getElementById('locations-grid');
    const backToHomeBtn = document.getElementById('back-to-home');
    const scanTitle = document.getElementById('scan-title');
    const surfaceImg = document.getElementById('surface-img');
    const beneathImg = document.getElementById('beneath-img');
    const reportName = document.getElementById('report-name');
    const reportToxicity = document.getElementById('report-toxicity');
    const factsList = document.getElementById('facts-list');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const completeBtn = document.getElementById('complete-scan-btn');
    
    // Slider elements (may be null on home page)
    const comparisonSlider = document.getElementById('comparison-slider');
    const surfaceLayer = document.getElementById('surface-layer');
    const sliderHandle = document.getElementById('slider-handle');
    const damageLabel = document.querySelector('.damage-label');

    // ===== STATE =====
    let currentLocationId = null;
    let isDragging = false;
    let sliderPosition = 50;

    // ===== ROUTING =====
    function showHome() {
        homeView.classList.add('active');
        scanView.classList.remove('active');
        navStats.textContent = "Environmental Scanning Initiative";
        renderHomeGrid();
    }

    function showScan(locationId) {
        const location = ENVIRONMENTAL_DATA[locationId];
        if (!location) {
            console.error(`Location '${locationId}' not found`);
            return;
        }

        currentLocationId = locationId;
        homeView.classList.remove('active');
        scanView.classList.add('active');

        // Update header
        const currentIndex = LOCATION_ORDER.indexOf(locationId) + 1;
        navStats.textContent = `Location ${currentIndex} of ${LOCATION_ORDER.length}`;
        scanTitle.textContent = location.name;

        // Update images
        surfaceImg.src = location.surfaceImage;
        beneathImg.src = location.beneathImage;

        // Update report
        reportName.textContent = location.name;
        reportToxicity.textContent = location.toxicity;
        factsList.innerHTML = location.hiddenFacts.map(fact => `<li>${fact}</li>`).join('');

        // Reset slider
        sliderPosition = 50;
        if (surfaceLayer) surfaceLayer.style.width = sliderPosition + '%';
        if (sliderHandle) sliderHandle.style.left = sliderPosition + '%';
        if (damageLabel) damageLabel.style.display = 'none';

        // Update navigation
        updateNavButtons(locationId);

        // Initialize slider events (only if elements exist)
        if (comparisonSlider) setupSliderEvents();
    }

    function updateNavButtons(locationId) {
        const index = LOCATION_ORDER.indexOf(locationId);
        
        // Previous button
        if (index > 0) {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
            prevBtn.onclick = () => showScan(LOCATION_ORDER[index - 1]);
        } else {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
            prevBtn.style.cursor = 'not-allowed';
            prevBtn.onclick = null;
        }

        // Next button
        if (index < LOCATION_ORDER.length - 1) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.onclick = () => showScan(LOCATION_ORDER[index + 1]);
        } else {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.textContent = 'Last Location';
            nextBtn.onclick = null;
        }
    }

    // ===== HOME GRID =====
    function renderHomeGrid() {
        locationsGrid.innerHTML = LOCATION_ORDER.map(id => {
            const loc = ENVIRONMENTAL_DATA[id];
            return `
                <div class="location-card" data-id="${loc.id}">
                    <div class="card-image">
                        <img src="${loc.surfaceImage}" alt="${loc.name}">
                        <div class="card-overlay"><span class="scan-icon">🔍</span></div>
                    </div>
                    <div class="card-content">
                        <h3>${loc.name}</h3>
                        <p class="card-status">Click to Scan</p>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.location-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                showScan(id);
            });
        });
    }

    // ===== SLIDER - SIMPLIFIED & ROBUST =====
    function setupSliderEvents() {
        // Only set up if all elements exist
        if (!comparisonSlider || !surfaceLayer || !sliderHandle || !damageLabel) {
            console.log('Slider elements not found - likely on home page');
            return;
        }

        // Remove old listeners by cloning (safe way)
        const newSlider = comparisonSlider.cloneNode(true);
        comparisonSlider.parentNode.replaceChild(newSlider, comparisonSlider);
        
        // Re-get references after clone
        const slider = document.getElementById('comparison-slider');
        const handle = document.getElementById('slider-handle');
        const surface = document.getElementById('surface-layer');
        const label = slider.querySelector('.damage-label');

        function updateSlider(clientX) {
            const rect = slider.getBoundingClientRect();
            let percent = ((clientX - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            
            surface.style.width = percent + '%';
            handle.style.left = percent + '%';
            label.style.display = (percent < 95) ? 'block' : 'none';
        }

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            updateSlider(e.clientX);
        });

        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        }, { passive: false });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        }, { passive: false });
    }

    // ===== EVENT LISTENERS =====
    backToHomeBtn.addEventListener('click', showHome);
    
    completeBtn.addEventListener('click', () => {
        alert('🌍 Scan Complete!\n\nYou have revealed the hidden truths beneath the surface.');
        showHome();
    });

    // ===== INITIALIZE =====
    renderHomeGrid();
    
    // Set up slider only if we're already on scan view (unlikely on load)
    if (scanView.classList.contains('active')) {
        setupSliderEvents();
    }
    
    console.log('🌍 Environmental Truth Scanner loaded');
});