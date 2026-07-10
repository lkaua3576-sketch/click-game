// Atributos de Pontuação e multiplicadores
let mass = 0;
let baseMpc = 1; // Massa por clique inicial
let baseMps = 0; // Massa por segundo inicial
let totalMultiplier = 1.0;

// Configuração dos Upgrades de Clique [Custo Inicial, Bônus de Clique]
let clickUpgrades = {
    c1: { cost: 50, power: 2 },
    c2: { cost: 250, power: 5 }
};

// Configuração dos 8 Upgrades Automáticos [Custo Inicial, Bônus de MPS]
let autoUpgrades = {
    a1: { cost: 15, power: 0.2 },
    a2: { cost: 100, power: 1.5 },
    a3: { cost: 1100, power: 12.0 },
    a4: { cost: 8000, power: 50.0 },
    a5: { cost: 45000, power: 250.0 },
    a6: { cost: 200000, power: 1200.0 },
    a7: { cost: 1500000, power: 6500.0 },
    a8: { cost: 10000000, power: 35000.0 }
};

// Captura dos elementos visuais
const blackHole = document.getElementById('black-hole');
const massDisplay = document.getElementById('mass-display');
const mpsDisplay = document.getElementById('mps-display');
const mpcDisplay = document.getElementById('mpc-display');
const multiplierDisplay = document.getElementById('multiplier-display');
const bigBangOverlay = document.getElementById('big-bang-overlay');

// Mapeamento dos botões
const c1Btn = document.getElementById('click1-btn'), c1Cost = document.getElementById('click1-cost');
const c2Btn = document.getElementById('click2-btn'), c2Cost = document.getElementById('click2-cost');
const a1Btn = document.getElementById('auto1-btn'), a1Cost = document.getElementById('auto1-cost');
const a2Btn = document.getElementById('auto2-btn'), a2Cost = document.getElementById('auto2-cost');
const a3Btn = document.getElementById('auto3-btn'), a3Cost = document.getElementById('auto3-cost');
const a4Btn = document.getElementById('auto4-btn'), a4Cost = document.getElementById('auto4-cost');
const a5Btn = document.getElementById('auto5-btn'), a5Cost = document.getElementById('auto5-cost');
const a6Btn = document.getElementById('auto6-btn'), a6Cost = document.getElementById('auto6-cost');
const a7Btn = document.getElementById('auto7-btn'), a7Cost = document.getElementById('auto7-cost');
const a8Btn = document.getElementById('auto8-btn'), a8Cost = document.getElementById('auto8-cost');

// --- SISTEMA DE CLIQUE MANUAL ---
blackHole.addEventListener('click', () => {
    mass += baseMpc * totalMultiplier;
    checkBigBang();
    updateUI();
});

// --- COMPRAS DE CLIQUE ---
c1Btn.addEventListener('click', () => {
    if (mass >= clickUpgrades.c1.cost) {
        mass -= clickUpgrades.c1.cost;
        baseMpc += clickUpgrades.c1.power;
        clickUpgrades.c1.cost = Math.round(clickUpgrades.c1.cost * 1.3);
        updateUI();
    }
});

c2Btn.addEventListener('click', () => {
    if (mass >= clickUpgrades.c2.cost) {
        mass -= clickUpgrades.c2.cost;
        baseMpc += clickUpgrades.c2.power;
        clickUpgrades.c2.cost = Math.round(clickUpgrades.c2.cost * 1.4);
        updateUI();
    }
});

// --- COMPRAS AUTOMÁTICAS (Laço simplificado de triggers) ---
a1Btn.addEventListener('click', () => buyAuto(autoUpgrades.a1, 1.15));
a2Btn.addEventListener('click', () => buyAuto(autoUpgrades.a2, 1.18));
a3Btn.addEventListener('click', () => buyAuto(autoUpgrades.a3, 1.20));
a4Btn.addEventListener('click', () => buyAuto(autoUpgrades.a4, 1.22));
a5Btn.addEventListener('click', () => buyAuto(autoUpgrades.a5, 1.24));
a6Btn.addEventListener('click', () => buyAuto(autoUpgrades.a6, 1.26));
a7Btn.addEventListener('click', () => buyAuto(autoUpgrades.a7, 1.28));
a8Btn.addEventListener('click', () => buyAuto(autoUpgrades.a8, 1.30));

function buyAuto(upgrade, inflacao) {
    if (mass >= upgrade.cost) {
        mass -= upgrade.cost;
        baseMps += upgrade.power;
        upgrade.cost = Math.round(upgrade.cost * inflacao);
        updateUI();
    }
}

// --- GATILHO DO BIG BANG (50.000 MASSA) ---
function checkBigBang() {
    if (mass >= 50000) {
        mass = 0; // Reseta a massa atual
        totalMultiplier += 0.5; // Adiciona +0.5x ao multiplicador (acumulando 1.5x, 2.0x...)
        
        // Ativa animação tirando a classe 'hidden'
        bigBangOverlay.classList.remove('hidden');
        
        // Esconde a animação após 2.5 segundos
        setTimeout(() => {
            bigBangOverlay.classList.add('hidden');
        }, 2500);
    }
}

// --- ATUALIZAÇÃO DA INTERFACE ---
function updateUI() {
    massDisplay.textContent = Math.floor(mass).toLocaleString('pt-BR');
    mpsDisplay.textContent = (baseMps * totalMultiplier).toFixed(1);
    mpcDisplay.textContent = (baseMpc * totalMultiplier).toFixed(1);
    multiplierDisplay.textContent = totalMultiplier.toFixed(1);

    // Texto de custos
    c1Cost.textContent = `${clickUpgrades.c1.cost} AM`;
    c2Cost.textContent = `${clickUpgrades.c2.cost} AM`;
    a1Cost.textContent = `${autoUpgrades.a1.cost} AM`;
    a2Cost.textContent = `${autoUpgrades.a2.cost} AM`;
    a3Cost.textContent = `${autoUpgrades.a3.cost} AM`;
    a4Cost.textContent = `${autoUpgrades.a4.cost} AM`;
    a5Cost.textContent = `${autoUpgrades.a5.cost} AM`;
    a6Cost.textContent = `${autoUpgrades.a6.cost} AM`;
    a7Cost.textContent = `${autoUpgrades.a7.cost} AM`;
    a8Cost.textContent = `${autoUpgrades.a8.cost} AM`;

    // Validação de botões ativos
    c1Btn.disabled = mass < clickUpgrades.c1.cost;
    c2Btn.disabled = mass < clickUpgrades.c2.cost;
    a1Btn.disabled = mass < autoUpgrades.a1.cost;
    a2Btn.disabled = mass < autoUpgrades.a2.cost;
    a3Btn.disabled = mass < autoUpgrades.a3.cost;
    a4Btn.disabled = mass < autoUpgrades.a4.cost;
    a5Btn.disabled = mass < autoUpgrades.a5.cost;
    a6Btn.disabled = mass < autoUpgrades.a6.cost;
    a7Btn.disabled = mass < autoUpgrades.a7.cost;
    a8Btn.disabled = mass < autoUpgrades.a8.cost;
}

// --- LOOP DE TEMPO (Roda a cada 100ms) ---
setInterval(() => {
    let mpsReal = baseMps * totalMultiplier;
    if (mpsReal > 0) {
        mass += mpsReal / 10;
        checkBigBang();
        updateUI();
    }
}, 100);
