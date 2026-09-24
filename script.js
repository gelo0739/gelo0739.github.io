document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const body = document.body;

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      themeToggle.innerHTML = '<i data-lucide="' + (isLight ? 'moon' : 'sun') + '" class="w-4 h-4"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Filter Chips
  document.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach(item => item.classList.toggle('active', item === button));
      document.querySelectorAll('.project-card').forEach(card => {
        const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
        card.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
      });
    });
  });

  // Navigation Link Highlight
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

  // Reveal Animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

  
  

  /* Placeholder shown when a screenshot file is missing so cards never appear empty */
  const IMG_PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%230f172a'/><text x='50%' y='50%' fill='%2364748b' font-family='sans-serif' font-size='30' text-anchor='middle' dominant-baseline='middle'>Screenshot not available</text></svg>";

  /* CLEAN MINIMALIST PROJECT DATA (JUST IMAGE PATHS & STACK) */
  const projectData = {
    "1": {
      title: "Card Matching Game",
      stack: ["Android Studio", "Java / Kotlin", "Android SDK"],
      github: "https://github.com/gelo0739",
      images: [
        "assets/card-game/ss1.jpg",
        "assets/card-game/ss2.jpg",
        "assets/card-game/ss3.jpg",
        "assets/card-game/vid1.mp4"
      ]
    },
    "2": {
      title: "Student Registration Form",
      stack: ["Java / C#", "MS SQL Server", "SSMS"],
      github: "https://github.com/gelo0739",
      images: [
        "assets/registration-form/ExceptionHandling.png",
        "assets/registration-form/Result.png",
        "assets/registration-form/Result2.png",
        "assets/registration-form/layout.png"
      ]
    },
    "3": {
      title: "Two Player Card Game",
      stack: ["JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/gelo0739",
      images: [
        "assets/two-player-card-game/ss1.png",
        "assets/two-player-card-game/ss2.png",
        "assets/two-player-card-game/ss3.png",
        "assets/two-player-card-game/vid1.mp4"
      ]
    },
    "4": {
      title: "Queueing System (CashierAppie)",
      stack: ["C#", "WinForms", "Data Structures"],
      github: "https://github.com/gelo0739/QueueingSystem/tree/main/CashierAppie",
      images: [
        "assets/queueing-system/ss1.png",
        "assets/queueing-system/ss2.png",
        "assets/queueing-system/ss3.png",
        "assets/queueing-system/ss4.png",
        "assets/queueing-system/vid1.mp4"
      ]
    },
    "5": {
      title: "Inventory Form",
      stack: ["C# / Java", "SQL Database", "SSMS"],
      github: "https://github.com/gelo0739",
      images: [
        "assets/inventory-form/ss1.png",
        "assets/inventory-form/ss2.png",
        "assets/inventory-form/ss3.png",
        "assets/inventory-form/ss4.png"
      ]
    },
    "6": {
      title: "Shape Avoiding Game",
      stack: ["C#", "Unity 2D"],
      github: "https://github.com/gelo0739",
      images: [
        "assets/shape-avoider-game/ss1.png",
        "assets/shape-avoider-game/ss2.png",
        "assets/shape-avoider-game/vid1.mp4"
      ]
    }
  };

  /* AUTOMATED CAROUSEL SLIDESHOW FOR MAIN GRID CARDS */
  document.querySelectorAll('.project-card').forEach((card, index) => {
    const id = String(index + 1);
    const proj = projectData[id];
    const slideshowContainer = card.querySelector('.card-slideshow-container');

    if (proj && proj.images && proj.images.length > 0 && slideshowContainer) {
      let imagesHtml = '';
      let dotsHtml = '';

      proj.images.forEach((imgPath, i) => {
        const src = typeof imgPath === 'string' ? imgPath : imgPath.src;
        const activeClass = i === 0 ? 'active' : '';
        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

        if (isVideo) {
          imagesHtml += `<video src="${src}" class="card-slide-img ${activeClass}" muted playsinline preload="metadata"></video>`;
        } else {
          imagesHtml += `<img src="${src}" alt="${proj.title}" class="card-slide-img ${activeClass}" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'">`;
        }
        dotsHtml += `<span class="slideshow-dot ${activeClass}"></span>`;
      });

      slideshowContainer.innerHTML = `
        ${imagesHtml}
        <div class="slideshow-dots">${dotsHtml}</div>
      `;

      // Cycle images every 2.2 seconds if there are multiple images
      if (proj.images.length > 1) {
        let currentIdx = 0;
        setInterval(() => {
          const imgs = slideshowContainer.querySelectorAll('.card-slide-img');
          const dots = slideshowContainer.querySelectorAll('.slideshow-dot');

          if (imgs.length === 0) return;

          imgs[currentIdx].classList.remove('active');
          dots[currentIdx].classList.remove('active');

          currentIdx = (currentIdx + 1) % imgs.length;

          imgs[currentIdx].classList.add('active');
          dots[currentIdx].classList.add('active');
        }, 2200);
      }
    }
  });

  /* CLEAN MODAL POPUP LOGIC */
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalStack = document.getElementById('modal-stack');
  const modalGallery = document.getElementById('modal-gallery');
  const modalGithub = document.getElementById('modal-github');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(id) {
    const proj = projectData[id];
    if (!proj || !modal) return;

    if (modalTitle) modalTitle.textContent = proj.title;

    if (modalStack) {
      modalStack.innerHTML = proj.stack.map(s => `
        <span class="canva-tag rounded px-2.5 py-1 text-xs font-semibold">${s}</span>
      `).join('');
    }

    if (modalGallery) {
      modalGallery.innerHTML = proj.images.map(imgPath => {
        const src = typeof imgPath === 'string' ? imgPath : imgPath.src;
        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

        if (isVideo) {
          return `
            <div class="gallery-slide border border-white/10 rounded-xl p-2 bg-black/40 flex-shrink-0">
              <video src="${src}" controls class="w-full h-64 md:h-80 object-cover rounded-lg border border-white/10"></video>
            </div>
          `;
        }

        return `
          <div class="gallery-slide border border-white/10 rounded-xl p-2 bg-black/40 flex-shrink-0">
            <a href="${src}" target="_blank" rel="noopener noreferrer">
              <img src="${src}" alt="${proj.title}" onerror="this.onerror=null;this.src='${IMG_PLACEHOLDER}'" class="w-full h-64 md:h-80 object-cover rounded-lg border border-white/10 hover:opacity-90 transition-opacity">
            </a>
          </div>
        `;
      }).join('');
    }

    if (modalGithub) modalGithub.href = proj.github;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const id = String(index + 1);
    card.addEventListener('click', () => openModal(id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(id);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
  });

  // Carousel Arrow Navigation
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const g = document.getElementById('modal-gallery');
      if (g) g.scrollBy({ left: -350, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const g = document.getElementById('modal-gallery');
      if (g) g.scrollBy({ left: 350, behavior: 'smooth' });
    });
  }
});
