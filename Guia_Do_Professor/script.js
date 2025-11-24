function toggleContrast() {
    const app = document.querySelector('.app-container');
    const cards = document.querySelectorAll('.game-card');
    const headers = document.querySelectorAll('h1, h2, h3');
    const texts = document.querySelectorAll('p');
    
    // Verifica se já está preto
    if (app.style.backgroundColor === 'rgb(0, 0, 0)' || app.style.backgroundColor === 'black') {
        // MODO CLARO (PADRÃO)
        app.style.backgroundColor = 'white';
        app.style.color = '#333';
        
        cards.forEach(card => {
            card.style.backgroundColor = 'white';
            card.style.borderColor = '#eee';
        });

        headers.forEach(h => h.style.color = ''); // Volta ao css original
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