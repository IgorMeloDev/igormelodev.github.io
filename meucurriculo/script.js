document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Lógica de preferência de tema (claro/escuro)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Navegação e ativação de seções
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    // Pega a altura da navbar dinamicamente, com um fallback caso não encontre
    const navHeight = document.querySelector('.main-nav')?.offsetHeight || 70;

    function activateLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.substring(1); // Pega o ID sem o '#'
            if (!targetId) return; // Se não houver href, não faz nada
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Calcula a posição para scroll, descontando a altura da navbar
                // Adiciona um pequeno offset (ex: 5px) para garantir que o topo da seção não fique colado na navbar
                const scrollToPosition = targetElement.offsetTop - navHeight + 5;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Opções para o IntersectionObserver
    const observerOptions = {
        root: null, // Observa em relação à viewport
        // Ajusta a margem de observação para "ignorar" a altura da navbar no topo
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 0.1  // A seção é considerada visível quando 10% dela está na tela (antes era 0.4 ou 40%)
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const targetId = entry.target.id;
            if (entry.isIntersecting) { // Se a seção estiver cruzando a área de observação
                entry.target.classList.add('active'); // Adiciona a classe para animar (tornar visível)
                activateLink(targetId); // Ativa o link correspondente na navbar
            } else {
                // Opcional: Se quiser que a animação ocorra toda vez que a seção entrar na tela
                // Descomente a linha abaixo para remover a classe 'active' quando a seção sair.
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Garante que o link "Home" esteja ativo no carregamento inicial,
    // já que a seção #home tem a classe 'active' definida no HTML.
    if (document.getElementById('home')?.classList.contains('active')) {
        activateLink('home');
    }

    // Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});