// Luxury Real Estate Platform JavaScript

// Parallax Scrolling
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Fade-in Animation on Scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Hover Scale Effect on Property Cards
document.addEventListener('DOMContentLoaded', function() {
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Drag and Drop File Manager
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const submitBtn = document.getElementById('submit-btn');
    const successAnimation = document.getElementById('success-animation');

    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            handleFiles(files);
        });

        function handleFiles(files) {
            files.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                let previewHtml = `<span>${file.name}</span>`;
                
                // Generate thumbnail for images
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewHtml = `
                            <div class="file-preview">
                                <img src="${e.target.result}" alt="${file.name}" class="file-thumb">
                                <span class="file-name">${file.name}</span>
                            </div>
                        `;
                        fileItem.innerHTML = previewHtml + '<button class="remove-file" data-file="' + file.name + '">×</button>';
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileItem.innerHTML = previewHtml + '<button class="remove-file" data-file="' + file.name + '">×</button>';
                }
                
                fileList.appendChild(fileItem);
            });
        }

        fileList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-file')) {
                e.target.parentElement.remove();
            }
        });

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Simulate upload success
                successAnimation.classList.remove('hidden');
                lottie.loadAnimation({
                    container: successAnimation,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    path: 'https://assets.lottiefiles.com/datafiles/4f7f6a0ca1644994bcacadbc9a8f7639/data.json' // Success animation
                });
            });
        }
    }
});

// Sticky Search Bar
window.addEventListener('scroll', function() {
    const searchBar = document.getElementById('search');
    if (searchBar) {
        const scrolled = window.pageYOffset;
        if (scrolled > 100) {
            searchBar.classList.add('sticky-active');
        } else {
            searchBar.classList.remove('sticky-active');
        }
    }
});
