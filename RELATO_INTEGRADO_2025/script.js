document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                if (entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter) runCounter(counter);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    function runCounter(el) {
        const target = +el.getAttribute('data-target');
        // Ajuste de velocidade baseado no tamanho do número
        const duration = 2000; // 2 segundos total
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