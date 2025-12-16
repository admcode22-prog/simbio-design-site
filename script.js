// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
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

// ===== CARROSSEL DE PROJETOS - LARGURA TOTAL =====
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
    
    // Ajusta largura para tela toda
    const itemWidth = 300;
    const gap = 30;
    const totalWidth = (itemWidth + gap) * duplicatedProjects.length;
    carousel.style.width = `${totalWidth}px`;
    
    // Ajusta velocidade baseada no viewport
    const viewportWidth = window.innerWidth;
    const speedMultiplier = viewportWidth / 1920;
    const baseDuration = 120;
    const animationDuration = baseDuration / speedMultiplier;
    
    // Aplica animação
    carousel.style.animation = `scrollFullWidth ${animationDuration}s linear infinite`;
    
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
    
    // Overlay nos itens (opcional)
    const style = document.createElement('style');
    style.textContent = `
        .project-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, 
                rgba(29, 29, 27, 0.9) 0%,
                rgba(29, 29, 27, 0.5) 50%,
                transparent 100%);
            padding: 15px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .carousel-item:hover .project-overlay {
            transform: translateY(0);
        }
        
        .project-overlay h4 {
            color: white;
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 600;
            font-family: 'Sora', sans-serif;
        }
        
        .project-overlay p {
            color: var(--primary);
            font-size: 12px;
            font-weight: 500;
            font-family: 'Sora', sans-serif;
        }
    `;
    document.head.appendChild(style);
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
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Versão simplificada do carrossel
function simpleCarrossel() {
    const items = document.querySelectorAll('.depoimento-item');
    const prevBtn = document.querySelector('.seta-esquerda');
    const nextBtn = document.querySelector('.seta-direita');
    const track = document.getElementById('depoimentosTrack');
    
    if (!items.length) return;
    
    let current = 0;
    
    function update() {
        items.forEach((item, index) => {
            item.style.display = index === current ? 'flex' : 'none';
        });
        
        // Atualiza setas
        prevBtn.style.opacity = current === 0 ? '0.3' : '1';
        nextBtn.style.opacity = current === items.length - 1 ? '0.3' : '1';
    }
    
    prevBtn.addEventListener('click', () => {
        if (current > 0) {
            current--;
            update();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (current < items.length - 1) {
            current++;
            update();
        }
    });
    
    update();
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
            
            // Define a imagem de fundo
            revealedImage.style.backgroundImage = `url('${imageUrl}')`;
            
            // Mostra o container
            imageRevealContainer.classList.add('active');
        });
        
        shape.addEventListener('mouseleave', () => {
            // Esconde o container após um pequeno delay
            setTimeout(() => {
                imageRevealContainer.classList.remove('active');
            }, 300);
        });
    });
    
    // Adiciona efeito de brilho nas formas
    shapes.forEach(shape => {
        shape.addEventListener('mousemove', (e) => {
            const rect = shape.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            shape.style.setProperty('--mouse-x', `${x}px`);
            shape.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== CLIQUE NA ÁREA DE PREÇO =====
function initPriceClick() {
    const priceContainers = document.querySelectorAll('.pacote-preco-container');
    
    priceContainers.forEach(container => {
        container.addEventListener('click', function() {
            const packageTitle = this.closest('.pacote-card').querySelector('.pacote-titulo').textContent;
            const packagePrice = this.querySelector('.preco-valor').textContent;
            
            
            // Role para o formulário de contato
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
        
        // Estilo de cursor
        container.style.cursor = 'pointer';
    });
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
    initPriceClick(); // <-- NOVA FUNÇÃO PARA CLIQUE NA ÁREA DE PREÇO
    
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
window.addEventListener('resize', function() {
    // Recalcula animação do carrossel em resize
    const carousel = document.getElementById('carousel1');
    if (carousel && carousel.closest('.carousel-fullwidth')) {
        const viewportWidth = window.innerWidth;
        const speedMultiplier = viewportWidth / 1920;
        const baseDuration = 120;
        const animationDuration = baseDuration / speedMultiplier;
        
        carousel.style.animationDuration = `${animationDuration}s`;
        
        // Ajusta tamanho dos itens para responsividade
        const itemWidth = viewportWidth < 768 ? 180 : 
                         viewportWidth < 1024 ? 220 : 
                         viewportWidth < 1200 ? 250 : 300;
        
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach(item => {
            item.style.flex = `0 0 ${itemWidth}px`;
            item.style.height = `${itemWidth * 0.666}px`;
        });
    }
});

// ===== CLIQUE NOS PACOTES PARA WHATSAPP (COM MENSAGENS ESPECÍFICAS) =====
function initPackageWhatsApp() {
    const pacoteCards = document.querySelectorAll('.pacote-card');
    
    pacoteCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
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
        
        // Efeito visual no hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Adicione esta função ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... suas outras inicializações
    initPackageWhatsApp();
});

