document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('comparison-slider');
    if (!slider) return; // Not on scan page

    const surfaceLayer = document.getElementById('surface-layer');
    const handle = document.getElementById('slider-handle');
    const damageLabel = document.querySelector('.damage-label');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const completeBtn = document.getElementById('complete-scan-btn');
    
    let isDragging = false;
    let pos = 50;
    surfaceLayer.style.width = pos + '%';
    handle.style.left = pos + '%';

    function update(clientX) {
        const rect = slider.getBoundingClientRect();
        let p = ((clientX - rect.left) / rect.width) * 100;
        p = Math.max(0, Math.min(100, p));
        pos = p;
        surfaceLayer.style.width = p + '%';
        handle.style.left = p + '%';
        damageLabel.style.display = (p < 95) ? 'block' : 'none';
    }

    slider.addEventListener('mousedown', e => { isDragging = true; update(e.clientX); });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', e => { if (isDragging) { e.preventDefault(); update(e.clientX); } });

    // Navigation: check if data-url is non-empty
    if (prevBtn) {
        const url = prevBtn.getAttribute('data-url');
        if (url && url.trim()) {
            prevBtn.onclick = () => window.location.href = url;
        } else {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
        }
    }

    if (nextBtn) {
        const url = nextBtn.getAttribute('data-url');
        if (url && url.trim()) {
            nextBtn.onclick = () => window.location.href = url;
        } else {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
            nextBtn.textContent = 'Last';
        }
    }

    if (completeBtn) {
        completeBtn.onclick = () => {
            alert('Scan Complete!');
            window.location.href = '/';
        };
    }
});