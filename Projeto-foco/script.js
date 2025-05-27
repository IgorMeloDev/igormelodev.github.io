// script.js
import { auth, db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Sistema de Autenticação
    auth.onAuthStateChanged(user => {
        const authSection = document.getElementById('auth-section');
        if (user) {
            authSection.innerHTML = `
                <p>Bem-vindo, ${user.email}!</p>
                <button onclick="logout()">Sair</button>
            `;
            carregarProgresso();
        } else {
            authSection.innerHTML = `
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="password" placeholder="Senha">
                <button onclick="login()">Entrar</button>
                <button onclick="signup()">Cadastrar</button>
            `;
        }
    });

    // Sistema de Planos
    const botoes = document.querySelectorAll('.btn-dias');
    const planos = document.querySelectorAll('.plano-treino');

    botoes.forEach(botao => {
        botao.addEventListener('click', (event) => {
            botoes.forEach(b => b.classList.remove('active'));
            planos.forEach(p => p.classList.remove('active'));
            
            const dias = event.target.dataset.dias;
            document.getElementById(`plano-${dias}`).classList.add('active');
            event.target.classList.add('active');
        });
    });

    // Inicialização
    document.querySelector('.btn-4dias').click();
});

// Funções de Autenticação
window.login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
};

window.signup = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
};

window.logout = () => auth.signOut();

// Função de Progresso
async function carregarProgresso() {
    const user = auth.currentUser;
    if (!user) return;

    const doc = await getDoc(doc(db, "usuarios", user.uid));
    if (doc.exists()) {
        console.log("Progresso:", doc.data());
    }
}