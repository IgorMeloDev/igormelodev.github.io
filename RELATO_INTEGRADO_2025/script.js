/* =============================================================
   FUNÇÃO DO MENU MOBILE
   ============================================================= */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    // Adiciona ou remove a classe 'active' para mostrar/esconder o menu
    menu.classList.toggle('active');
}

/* =============================================================
   ANIMAÇÕES E CONTADORES (Ao carregar a página)
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Configura o observador para detectar quando os elementos aparecem na tela
    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento apareceu na tela...
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Procura TODOS os números com a classe .counter dentro do elemento que apareceu
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    runCounter(counter); // Roda a animação para cada um deles
                });
                
                // Para de observar depois que já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos escondidos (.hidden)
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Função que faz os números subirem
    function runCounter(el) {
        const target = +el.getAttribute('data-target'); // Pega o número final
        const duration = 2000; // Duração da animação
        const increment = target / (duration / 20); 
        
        let current = 0;

        const updateCount = () => {
            current += increment;
            
            if (current < target) {
                el.innerText = Math.ceil(current).toLocaleString('pt-BR');
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target.toLocaleString('pt-BR');
            }
        };
        
        updateCount();
    }
});