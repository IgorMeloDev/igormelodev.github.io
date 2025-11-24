// Alternar Alto Contraste
function toggleContrast() {
    const app = document.querySelector('.app-container');
    const cards = document.querySelectorAll('.game-card');
    const headers = document.querySelectorAll('h1, h2, h3, .author-name');
    const texts = document.querySelectorAll('p, .author-title');
    
    // Verifica se já está preto
    if (app.style.backgroundColor === 'rgb(0, 0, 0)' || app.style.backgroundColor === 'black') {
        // MODO CLARO (PADRÃO)
        app.style.backgroundColor = 'white';
        app.style.color = '#333';
        
        cards.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.borderColor = '#eee';
        });

        headers.forEach(h => h.style.color = '');
        texts.forEach(t => t.style.color = '');
        
    } else {
        // MODO ESCURO (ALTO CONTRASTE)
        app.style.backgroundColor = 'black';
        app.style.color = 'white';
        
        cards.forEach(card => {
            card.style.backgroundColor = '#222';
            card.style.borderColor = '#555';
        });

        headers.forEach(h => h.style.color = '#fff');
        texts.forEach(t => t.style.color = '#ddd');
    }
}

// Funcionalidade do Accordion (Objetivo Pedagógico)
const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}