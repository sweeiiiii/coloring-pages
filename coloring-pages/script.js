import { galleryImages } from './image_data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const navLinks = document.querySelectorAll('.nav-link, header a[data-section="home"]');
    const pageSections = document.querySelectorAll('.page-section');
    const ctaButton = document.getElementById('cta-to-convert');

    const imageUploadInput = document.getElementById('image-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const originalImagePreview = document.getElementById('original-image-preview');
    const sketchImagePreview = document.getElementById('sketch-image-preview');

    const galleryGrid = document.getElementById('gallery-grid');

    let currentSketchIndex = 0;

    function showSection(sectionId) {
        pageSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
        });
    });
    
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('convert');
        });
    }
    

    function displayUploadedImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded cat photo" class="w-full h-full object-cover">`;
        }
        reader.readAsDataURL(file);
    }

    function displayPredefinedSketch() {
        if (galleryImages.length > 0) {
            const sketchToShow = galleryImages[currentSketchIndex];
            sketchImagePreview.innerHTML = `<img src="${sketchToShow.sketchUrl}" alt="${sketchToShow.sketchAlt}" class="w-full h-full object-cover">`;
            currentSketchIndex = (currentSketchIndex + 1) % galleryImages.length;
        } else {
            sketchImagePreview.innerHTML = `<i data-lucide="image-off" class="h-16 w-16 text-gray-400"></i> <p class="text-gray-500 mt-2">无可用素描图</p>`;
            lucide.createIcons();
        }
    }
    
    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                displayUploadedImage(file);
                displayPredefinedSketch();
            } else {
                fileNameDisplay.textContent = '未选择任何文件';
                originalImagePreview.innerHTML = `<i data-lucide="image-off" class="h-16 w-16 text-gray-400"></i>`;
                sketchImagePreview.innerHTML = `<i data-lucide="edit-3" class="h-16 w-16 text-gray-400"></i>`;
                lucide.createIcons();
            }
        });
    }


    function populateGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = ''; 
        galleryImages.forEach(imgData => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <div class="p-4">
                    <h3 class="text-xl font-semibold gallery-card-title mb-3 text-center">${imgData.name}</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <div class="image-container rounded-md border border-gray-200">
                                <img src="${imgData.originalUrl}" alt="${imgData.originalAlt}">
                                <span class="gallery-card-label">原图</span>
                            </div>
                        </div>
                        <div>
                            <div class="image-container rounded-md border border-gray-200">
                                <img src="${imgData.sketchUrl}" alt="${imgData.sketchAlt}">
                                <span class="gallery-card-label">素描稿</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    showSection('home');
    populateGallery();
    lucide.createIcons(); // Re-run for dynamically added icons if any (though not strictly needed for current gallery items)
});
