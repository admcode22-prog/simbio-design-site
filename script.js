// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Previne scroll quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fecha menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== CARROSSEL DE PROJETOS =====
function initProjectsCarousel() {
    const carousel = document.getElementById('carousel1');
    
    if (!carousel) return;
    
    // Projetos para preencher a tela toda
    const projects = [
        { id: 1, name: 'Restaurante Elegante', image: 'proj1.png', category: 'Gastronomia' },
        { id: 2, name: 'E-commerce Moda', image: 'proj2.png', category: 'E-commerce' },
        { id: 3, name: 'App Fitness', image: 'proj3.png', category: 'Mobile' },
        { id: 4, name: 'Site Corporativo', image: 'proj4.png', category: 'Corporate' },
        { id: 5, name: 'Landing Page', image: 'proj5.png', category: 'Marketing' },
        { id: 6, name: 'Blog Pessoal', image: 'proj6.png', category: 'Blog' },
        { id: 7, name: 'Loja Artesanato', image: 'proj7.png', category: 'E-commerce' },
        { id: 8, name: 'Consultório Médico', image: 'proj8.png', category: 'Saúde' },
        { id: 9, name: 'Agência de Viagens', image: 'proj9.png', category: 'Turismo' },
        { id: 10, name: 'Studio de Yoga', image: 'proj10.png', category: 'Wellness' },
        { id: 11, name: 'Cafeteria Artesanal', image: 'proj11.png', category: 'Gastronomia' },
        { id: 12, name: 'Loja de Roupas', image: 'proj12.png', category: 'Moda' },
        { id: 13, name: 'Escritório Advocacia', image: 'proj13.png', category: 'Corporate' },
        { id: 14, name: 'Academia', image: 'proj14.png', category: 'Fitness' },
        { id: 15, name: 'Salão de Beleza', image: 'proj15.png', category: 'Beleza' }
    ];
    
    // Duplica várias vezes para criar loop longo
    const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];
    
    // Gera HTML para os itens
    function generateCarouselHTML(projectsArray) {
        return projectsArray.map(project => `
            <div class="carousel-item">
                <div class="project-image">
                    <img src="assets/images/projects/${project.image}" 
                         alt="${project.name}" 
                         loading="lazy"
                         onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\"placeholder\"><i class=\"fas fa-palette\"></i><span>${project.name}</span><small>${project.category}</small></div>';">
                    <div class="project-overlay">
                        <h4>${project.name}</h4>
                        <p>${project.category}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Popula o carrossel
    carousel.innerHTML = generateCarouselHTML(duplicatedProjects);
    
    // Ajusta largura baseado no tamanho da tela
    function updateCarouselWidth() {
        const viewportWidth = window.innerWidth;
        let itemWidth = 250; // Default para desktop
        
        if (viewportWidth < 768) {
            itemWidth = 150;
        } else if (viewportWidth < 1024) {
            itemWidth = 200;
        }
        
        const gap = 20;
        const totalWidth = (itemWidth + gap) * duplicatedProjects.length;
        carousel.style.width = `${totalWidth}px`;
        
        // Ajusta tamanho dos itens
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach(item => {
            item.style.flex = `0 0 ${itemWidth}px`;
            item.style.height = `${itemWidth * 0.68}px`;
        });
        
        // Ajusta velocidade da animação
        const speedMultiplier = viewportWidth / 1920;
        const baseDuration = 120;
        const animationDuration = baseDuration / speedMultiplier;
        carousel.style.animationDuration = `${animationDuration}s`;
    }
    
    // Inicializa
    updateCarouselWidth();
    
    // Pausa/play no hover
    const carouselContainer = carousel.closest('.carousel-fullwidth');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }
    
    // Atualiza no resize
    window.addEventListener('resize', updateCarouselWidth);
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simula delay de envio
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== NAVEGAÇÃO SUAVE =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Fecha menu mobile se estiver aberto
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CARROSSEL DE DEPOIMENTOS =====
function initDepoimentosCarousel() {
    const track = document.getElementById('depoimentosTrack');
    const items = document.querySelectorAll('.depoimento-item');
    const prevBtn = document.querySelector('.seta-esquerda');
    const nextBtn = document.querySelector('.seta-direita');
    const indicators = document.querySelectorAll('.carrossel-indicador');
    
    if (!track || items.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
        // Move o track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('ativo');
            } else {
                indicator.classList.remove('ativo');
            }
        });
        
        // Atualiza estado das setas
        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.disabled = currentIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = currentIndex === totalItems - 1 ? '0.5' : '1';
            nextBtn.disabled = currentIndex === totalItems - 1;
        }
    }
    
    // Event listeners para setas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Suporte a touch/swipe para mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Limite mínimo para considerar como swipe
            if (diffX > 0 && currentIndex < totalItems - 1) {
                // Swipe para a esquerda
                currentIndex++;
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe para a direita
                currentIndex--;
            }
            updateCarousel();
        }
    });
    
    // Inicializa
    updateCarousel();
    
    // Auto-play (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000); // Muda a cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Inicia auto-play
    startAutoPlay();
    
    // Pausa auto-play no hover
    const carouselContainer = track.closest('.depoimentos-carrossel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// ===== ATIVAR LINK ATUAL =====
function initActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== FORMAS ROSAS INTERATIVAS =====
function initInteractiveShapes() {
    const shapes = document.querySelectorAll('.interactive-shape');
    const imageRevealContainer = document.getElementById('imageRevealContainer');
    const revealedImage = document.getElementById('revealedImage');
    
    if (!shapes.length || !imageRevealContainer || !revealedImage) return;
    
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', () => {
            const imageUrl = shape.getAttribute('data-image');
            
            if (imageUrl) {
                revealedImage.style.backgroundImage = `url('${imageUrl}')`;
                imageRevealContainer.classList.add('active');
            }
        });
        
        shape.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!imageRevealContainer.matches(':hover')) {
                    imageRevealContainer.classList.remove('active');
                }
            }, 300);
        });
    });
    
    // Fecha ao clicar fora
    imageRevealContainer.addEventListener('click', (e) => {
        if (e.target === imageRevealContainer) {
            imageRevealContainer.classList.remove('active');
        }
    });
}

// ===== CLIQUE NOS PACOTES PARA WHATSAPP =====
function initPackageWhatsApp() {
    const pacoteCards = document.querySelectorAll('.pacote-card');
    
    pacoteCards.forEach(card => {
        // Adiciona cursor pointer
        card.style.cursor = 'pointer';
        
        // Adiciona efeito visual no hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Evento de clique
        card.addEventListener('click', function(e) {
            // Previne clique na área do preço (que tem seu próprio evento)
            if (e.target.closest('.pacote-preco-container')) {
                return;
            }
            
            const titulo = this.querySelector('.pacote-titulo').textContent;
            const preco = this.querySelector('.preco-valor').textContent;
            
            // Mensagens específicas para cada pacote
            let mensagem = '';
            
            if (titulo.includes('Essencial')) {
                mensagem = `Olá! Gostaria de saber mais sobre o pacote *Marca Essencial* (${preco}). Pode me explicar melhor como funciona a criação do logotipo e manual da marca?`;
            } 
            else if (titulo.includes('Viva')) {
                mensagem = `Olá! Tenho interesse no pacote *Marca Viva* (${preco}), principalmente pelas aplicações da marca. Podemos conversar sobre isso?`;
            }
            else if (titulo.includes('Total')) {
                mensagem = `Olá! Quero transformar completamente minha marca! Gostaria de informações sobre o pacote *Presença Total* (${preco}) com o ebook de aplicações.`;
            }
            else {
                mensagem = `Olá! Tenho interesse no pacote *${titulo}* (${preco}). Pode me dar mais informações?`;
            }
            
            // Codifica a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            // URL do WhatsApp com mensagem pré-preenchida
            const whatsappURL = `https://wa.me/5518996449437?text=${mensagemCodificada}`;
            
            // Abre o WhatsApp
            window.open(whatsappURL, '_blank');
        });
    });
}

// ===== CLIQUE NA ÁREA DE PREÇO =====
function initPriceClick() {
    const priceContainers = document.querySelectorAll('.pacote-preco-container');
    
    priceContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation(); // Previne que o clique suba para o card
            
            const card = this.closest('.pacote-card');
            const packageTitle = card.querySelector('.pacote-titulo').textContent;
            const packagePrice = this.querySelector('.preco-valor').textContent;
            
            // Mensagem para WhatsApp
            let mensagem = `Olá! Tenho interesse no pacote *${packageTitle}* (${packagePrice}). Gostaria de contratar este serviço.`;
            
            // Codifica a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            // URL do WhatsApp com mensagem pré-preenchida
            const whatsappURL = `https://wa.me/5518996449437?text=${mensagemCodificada}`;
            
            // Abre o WhatsApp
            window.open(whatsappURL, '_blank');
        });
        
        // Estilo de cursor
        container.style.cursor = 'pointer';
    });
}

// ===== LOADING LAZY =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== INICIALIZAR TUDO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Simbio Design inicializando...');
    
    initMobileMenu();
    initHeaderScroll();
    initProjectsCarousel();
    initContactForm();
    initSmoothScroll();
    initActiveLink();
    initInteractiveShapes();
    initPriceClick();
    initPackageWhatsApp();
    initDepoimentosCarousel();
    initLazyLoading();
    
    // Logo hover effect
    const logo = document.getElementById('siteLogo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    }
    
    console.log('✅ Simbio Design carregado com sucesso!');
});

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalcula animação do carrossel em resize
        const carousel = document.getElementById('carousel1');
        if (carousel && carousel.closest('.carousel-fullwidth')) {
            const viewportWidth = window.innerWidth;
            const speedMultiplier = viewportWidth / 1920;
            const baseDuration = 120;
            const animationDuration = baseDuration / speedMultiplier;
            
            carousel.style.animationDuration = `${animationDuration}s`;
        }
    }, 250);
});

// ===== TOUCH DEVICE DETECTION =====
function isTouchDevice() {
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           navigator.msMaxTouchPoints > 0;
}

// Ajustes para dispositivos touch
if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
    
    // Remove hover effects em elementos específicos
    const hoverElements = document.querySelectorAll('.pacote-card, .carousel-item, .feature-box');
    hoverElements.forEach(el => {
        el.classList.add('no-hover');
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Previne animações durante o scroll para melhor performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Códigos que precisam rodar durante o scroll
            ticking = false;
        });
        ticking = true;
    }
});