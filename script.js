const menuItems = {
  ramyeon: [
    { img: "images/ram1.png", name: "Jin Ramen Mild", price: "₱87" },
    { img: "images/ram2.png", name: "Jin Ramen Spicy", price: "₱87" },
    { img: "images/ram3.png", name: "Spicy Cheese Ramen", price: "₱96" },
    { img: "images/ram4.png", name: "Cheese Ramen", price: "₱97" },
    { img: "images/ram5.png", name: "Spicy Cheesy Ramen", price: "₱97" },
    { img: "images/ram6.png", name: "Nongshim Super Spicy", price: "₱95" },
    { img: "images/ram7.png", name: "Shin Ramyun", price: "₱95" },
    { img: "images/ram8.png", name: "Cheesy Ramyun", price: "₱100" },
    { img: "images/ram9.png", name: "Ansungtangmyun", price: "₱112" },
    { img: "images/ram10.png", name: "Veggie Soon", price: "₱85" },
    { img: "images/ram11.png", name: "Koreno Beef", price: "₱85" },
    { img: "images/ram12.png", name: "Koreno Shrimp", price: "₱85" },
  ],
  stirfry: [
    { img: "images/stir1.png", name: "Buldak Original", price: "₱135" },
    { img: "images/stir2.png", name: "Buldak Carbonara", price: "₱134" },
    { img: "images/stir3.png", name: "Buldak Rose", price: "₱138" },
    { img: "images/stir4.png", name: "Buldak Quattro Cheese", price: "₱130" },
    { img: "images/stir5.png", name: "Spicy Cheese Stir Fry", price: "₱100" },
    { img: "images/stir6.png", name: "Koreno Jjajangmen", price: "₱86" },
    { img: "images/stir7.png", name: "Nongshim Cheese Stir Fry", price: "₱130" },
    { img: "images/stir8.png", name: "Nongshim Shin Ramyun Spicy", price: "₱130" },
  ],
  meals: Array.from({length: 16}, (_, i) => ({
    img: `images/meal${i+1}.png`,
    name: `Meal ${i+1}`,
    price: `₱${100 + i*5}`
  })),
  snacks: Array.from({length: 16}, (_, i) => ({
    img: `images/snacks${i+1}.png`,
    name: `Snack ${i+1}`,
    price: `₱${50 + i*5}`
  })),
};

function openModal(category) {
  const modal = document.getElementById(category);
  if (!modal) return;
  
  const modalContent = modal.querySelector(".menu-detail");
  modalContent.innerHTML = "";

  menuItems[category].forEach((item, index) => {
    const img = new Image();
    img.src = item.img;
    
    img.onload = () => {
      const div = document.createElement("div");
      div.className = "item";
      div.style.animationDelay = `${index * 0.05}s`;
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name}</p>
        <div class="price">${item.price}</div>
      `;
      modalContent.appendChild(div);
      setTimeout(() => div.classList.add('visible'), 10);
    };
  });

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.style.opacity = "1", 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

window.onclick = e => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll(".modal").forEach(modal => {
      if (modal.style.display === "flex") {
        closeModal(modal.id);
      }
    });
  }
});

const fadeEls = document.querySelectorAll(".fade-up");
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (window.innerWidth - e.pageX) / 100;
  mouseY = (window.innerHeight - e.pageY) / 100;
});

function animateParallax() {
  const layers = document.querySelectorAll(".parallax-layer");
  
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.3;
    const x = currentX * speed;
    const y = currentY * speed;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
  
  requestAnimationFrame(animateParallax);
}

if (document.querySelectorAll(".parallax-layer").length > 0) {
  animateParallax();
}

const video = document.getElementById('ramVideo');
const unmuteBtn = document.getElementById('unmuteBtn');

if (video && unmuteBtn) {
  unmuteBtn.addEventListener('click', function () {
    video.muted = false;
    video.play().catch(() => {});
    
    unmuteBtn.style.opacity = '0';
    setTimeout(() => {
      unmuteBtn.style.display = 'none';
    }, 300);
  });
  
  video.addEventListener('volumechange', function() {
    if (video.muted) {
      unmuteBtn.style.display = 'flex';
      setTimeout(() => unmuteBtn.style.opacity = '1', 10);
    }
  });
  
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = '0 2px 25px rgba(255, 107, 53, 0.3)';
    return;
  }
  
  if (currentScroll > lastScroll) {
    header.style.boxShadow = '0 4px 30px rgba(255, 107, 53, 0.4)';
  } else {
    header.style.boxShadow = '0 2px 25px rgba(255, 107, 53, 0.3)';
  }
  lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const handleResize = debounce(() => {}, 250);
window.addEventListener('resize', handleResize);

if (document.getElementById('menuItems')) {
  document.addEventListener('click', function(e) {
    const menuItem = e.target.closest('#menuItems .item');
  });
}

document.addEventListener('keydown', (e) => {
  const openModal = document.querySelector('.modal[style*="display: flex"]');
  
  if (openModal && e.key === 'Tab') {
    const focusableElements = openModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
});

const createPageLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="page-loader-content">
      <div class="page-loader-spinner"></div>
      <div class="page-loader-text">Loading...</div>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
};

let pageLoader = document.querySelector('.page-loader');
if (!pageLoader) {
  pageLoader = createPageLoader();
}

document.addEventListener('click', function(e) {
  if (document.getElementById('menuItems')) {
    const link = e.target.closest('a');
    if (link && link.closest('nav')) {
      if (link.href && !link.href.includes('#') && link.hostname === window.location.hostname) {
        e.preventDefault();
        document.body.classList.add('page-transition');
        pageLoader.classList.add('active');
        setTimeout(() => { window.location.href = link.href; }, 400);
      }
    }
    return; 
  }
  
  if (e.target.closest('#menuItems .item') || e.target.closest('.modal') || e.target.closest('.close')) {
    return; 
  }
  
  const link = e.target.closest('a');
  
  if (!link || link.href.includes('facebook.com') || link.target === '_blank' || link.classList.contains('menu-item-link')) {
    return;
  }
  
  const isNavLink = link.closest('nav') || 
                    link.classList.contains('back-home') ||
                    link.classList.contains('btn') ||
                    link.classList.contains('cta-primary') ||
                    link.classList.contains('cta-secondary');
  
  if (isNavLink && link.href && !link.href.includes('#') && link.hostname === window.location.hostname) {
    e.preventDefault();
    const destination = link.href;
    
    document.body.classList.add('page-transition');
    pageLoader.classList.add('active');
    
    setTimeout(() => {
      window.location.href = destination;
    }, 400);
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.remove('active');
    }
  }, 200);
});

(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    }
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
    
    this.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(() => {
      this.style.transform = '';
    }, 300);
  });
});
