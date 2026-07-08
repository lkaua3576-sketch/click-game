// Estado do Jogo (Dados salvos temporariamente na memória)
let mass = 0;
let baseMps = 0;
let darkMatter = 0;
let totalMultiplier = 1.0;

// Configuração dos Upgrades [Custo Inicial, Poder Base de MPS]
let up1 = { cost: 15, power: 0.2 };
let up2 = { cost: 100, power: 1.5 };
let up3 = { cost: 1100, power: 12.0 };

// Capturando elementos do HTML para o JavaScript poder modificar
const blackHole = document.getElementById('black-hole');
const massDisplay = document.getElementById('mass-display');
const mpsDisplay = document.getElementById('mps-display');
const multiplierDisplay = document.getElementById('multiplier-display');

const up1Btn = document.getElementById('up1-btn');
const up1CostTxt = document.getElementById('up1-cost');
const up2Btn = document.getElementById('up2-btn');
const up2CostTxt = document.getElementById('up2-cost');
const up3Btn = document.getElementById('up3-btn');
const up3CostTxt = document.getElementById('up3-cost');

const prestigeBtn = document.getElementById('prestige-btn');

// --- SISTEMA DE CLIQUE ---
blackHole.addEventListener('click', () => {
    mass += 1 * totalMultiplier;
    updateUI();
});

// --- COMPRA DE UPGRADES ---
up1Btn.addEventListener('click', () => {
    if (mass >= up1.cost) {
        mass -= up1.cost;
        baseMps += up1.power;
        up1.cost = Math.round(up1.cost * 1.15);
        updateUI();
    }
});

up2Btn.addEventListener('click', () => {
    if (mass >= up2.cost) {
        mass -= up2.cost;
        baseMps += up2.power;
        up2.cost = Math.round(up2.cost * 1.18);
        updateUI();
    }
});

up3Btn.addEventListener('click', () => {
    if (mass >= up3.cost) {
        mass -= up3.cost;
        baseMps += up3.power;
        up3.cost = Math.round(up3.cost * 1.22);
        updateUI();
    }
});

// --- SISTEMA DE PRESTÍGIO (BIG CRUNCH) ---
prestigeBtn.addEventListener('click', () => {
    let pendingDarkMatter = calculateDarkMatter();
    if (pendingDarkMatter > 0) {
        darkMatter += pendingDarkMatter;
        
        // Reseta o progresso atual do universo
        mass = 0;
        baseMps = 0;
        up1.cost = 15;
        up2.cost = 100;
        up3.cost = 1100;
        
        // Cada Matéria Escura dá +10% de produção global
        totalMultiplier = 1 + (darkMatter * 0.1);
        
        updateUI();
        alert(`🌌 Big Crunch realizado! O universo resetou, mas você evoluiu e ganhou +${pendingDarkMatter} Matéria Escura!`);
    }
});

function calculateDarkMatter() {
    if (mass < 50000) return 0;
    return Math.floor(Math.sqrt(mass / 50000));
}

// --- ATUALIZAÇÃO DA INTERFACE (UI) ---
function updateUI() {
    massDisplay.textContent = Math.floor(mass).toLocaleString('pt-BR');
    let currentMps = baseMps * totalMultiplier;
    mpsDisplay.textContent = currentMps.toFixed(1);
    multiplierDisplay.textContent = totalMultiplier.toFixed(1);

    up1CostTxt.textContent = `${up1.cost} AM`;
    up2CostTxt.textContent = `${up2.cost} AM`;
    up3CostTxt.textContent = `${up3.cost} AM`;

    up1Btn.disabled = mass < up1.cost;
    up2Btn.disabled = mass < up2.cost;
    up3Btn.disabled = mass < up3.cost;

    let pendingDM = calculateDarkMatter();
    if (pendingDM > 0) {
        prestigeBtn.disabled = false;
        prestigeBtn.textContent = `Causar Big Crunch (+${pendingDM} Matéria Escura)`;
    } else {
        prestigeBtn.disabled = true;
        prestigeBtn.textContent = `Causar Big Crunch (+0 Matéria Escura)`;
    }
}

// --- LOOP TEMPORAL (Roda a cada 100ms para adicionar a fração de MPS) ---
setInterval(() => {
    let currentMps = baseMps * totalMultiplier;
    if (currentMps > 0) {
        mass += currentMps / 10;
        updateUI();
    }
}, 100);
