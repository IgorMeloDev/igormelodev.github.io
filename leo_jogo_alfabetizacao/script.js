const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const animals = [
    {
        name: "GATO",
        image: "assets/gato.png",
        letters: ["G","A","T","O"]
    },
    {
        name: "CÃO",
        image: "assets/cao.png",
        letters: ["C","Ã","O"]
    },
    {
        name: "PATO",
        image: "assets/pato.png",
        letters: ["P","A","T","O"]
    },
    {
        name: "LEÃO",
        image: "assets/leao.png",
        letters: ["L","E","Ã","O"]
    }
];

let currentIndex = 0;
let currentAnimal = animals[currentIndex];
let collectedLetters = [];

let leo = { x: 50, y: 350, width: 50, height: 50, speed: 5 };
let keys = {};

const extraLetters = ['B', 'D', 'F', 'H', 'J', 'K', 'M', 'N', 'Q', 'R', 'S', 'U', 'V', 'X', 'Z'];

let letters = [];

// *** Adição: carregando imagem do leão personagem ***
let leoImg = new Image();
leoImg.src = 'assets/leao_personagem.webp';

function setupLetters() {
    letters = [];
    let wordLetters = currentAnimal.letters;
    wordLetters.forEach(char => {
        letters.push({ char: char, x: Math.random() * (canvas.width - 50) + 25, y: Math.random() * (canvas.height - 100) + 50, collected: false, isTarget: true });
    });
    for (let i = 0; i < 7; i++) {
        let char = extraLetters[Math.floor(Math.random() * extraLetters.length)];
        letters.push({ char: char, x: Math.random() * (canvas.width - 50) + 25, y: Math.random() * (canvas.height - 100) + 50, collected: false, isTarget: false });
    }
}

function getWordDisplay() {
    return currentAnimal.letters.map(char => (collectedLetters.includes(char) ? char : '_')).join(' ');
}

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// *** Substituída para desenhar imagem do leão ***
function drawLeo() {
    ctx.drawImage(leoImg, leo.x, leo.y, leo.width, leo.height);
}

function drawLetters() {
    ctx.font = '40px Arial';
    letters.forEach(letter => {
        if (!letter.collected) {
            ctx.fillStyle = letter.isTarget ? '#2c3e50' : '#95a5a6';
            ctx.fillText(letter.char, letter.x, letter.y);
        }
    });
}

function drawAnimalImage() {
    const img = new Image();
    img.src = currentAnimal.image;
    img.onload = () => {
        ctx.clearRect(canvas.width - 160, canvas.height - 180, 150, 150);
        ctx.drawImage(img, canvas.width - 150, canvas.height - 180, 140, 140);
    }
}

function updateLeo() {
    if (keys['ArrowLeft'] || keys['a']) leo.x -= leo.speed;
    if (keys['ArrowRight'] || keys['d']) leo.x += leo.speed;
    if (keys['ArrowUp'] || keys['w']) leo.y -= leo.speed;
    if (keys['ArrowDown'] || keys['s']) leo.y += leo.speed;
    leo.x = Math.max(0, Math.min(canvas.width - leo.width, leo.x));
    leo.y = Math.max(0, Math.min(canvas.height - leo.height, leo.y));
}

function checkCollisions() {
    letters.forEach(letter => {
        if (!letter.collected) {
            const distX = leo.x + leo.width/2 - letter.x;
            const distY = leo.y + leo.height/2 - letter.y + 10;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < 40) {
                letter.collected = true;
                if (letter.isTarget && !collectedLetters.includes(letter.char)) {
                    collectedLetters.push(letter.char);
                    updateWordDisplay();
                    checkWinCondition();
                }
            }
        }
    });
}

function updateWordDisplay() {
    document.getElementById('word-display').textContent = getWordDisplay();
}

function checkWinCondition() {
    let allCollected = currentAnimal.letters.every(char => collectedLetters.includes(char));
    if (allCollected) {
        setTimeout(() => {
            alert('Parabéns! Você completou a palavra: ' + currentAnimal.name);
            nextAnimal();
        }, 300);
    }
}

function nextAnimal() {
    currentIndex++;
    if (currentIndex >= animals.length) {
        alert('Você completou todas as palavras! Parabéns!');
        currentIndex = 0;
    }
    currentAnimal = animals[currentIndex];
    collectedLetters = [];
    setupLetters();
    updateWordDisplay();
}

setupLetters();
updateWordDisplay();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLeo();
    drawLetters();
    drawAnimalImage();
    updateLeo();
    checkCollisions();
    requestAnimationFrame(draw);
}

draw();
