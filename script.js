// VARIÁVEIS DE ESTADO
let mass = 0;
let baseMps = 0;
let clickPower = 1;
let prestigeCount = 0;
let totalMultiplier = 1.0;

// CONFIGURAÇÃO DOS UPGRADES
let up3 = { cost: 1100, power: 12 };
let up4 = { cost: 5000, power: 25 }; // O NOVO!
let cUp1 = { cost: 50, power: 1 };
let cUp2 = { cost: 500, power: 5 };

// ELEMENTOS
const blackHole = document.getElementById('black-hole');
const massDisplay = document.getElementById('mass-display');
const mpsDisplay = document.getElementById('mps-display');
const clickDisplay = document.getElementById('click-display');
const multiplierDisplay = document.getElementById('multiplier-display');
const bangOverlay = document.getElementById('big-bang-overlay');
const prestigeBtn = document.getElementById('prestige-btn');

// CLIQUE NO BURACO NEGRO
blackHole.addEventListener('click', () => {
    mass += clickPower * totalMultiplier;
    updateUI();
});

// COMPRAS PRODUÇÃO
document.getElementById('up3-btn').addEventListener('click', () => buyProduction(up3));
document.getElementById('up4-btn').addEventListener('click', () => buyProduction(up4));

// COMPRAS CLIQUE
document.getElementById('click-up1-btn').addEventListener('click', () => buyClick(cUp1));
document.getElementById('click-up2-btn').addEventListener('click', () => buyClick(cUp2));

function buyProduction(upg) {
    if (mass >= upg.cost) {
        mass -= upg.cost;
        baseMps += upg.power;
        upg.cost = Math.round(upg.cost * 1.2);
        updateUI();
    }
}

function buyClick(upg) {
    if (mass >= upg.cost) {
        mass -= upg.cost;
        clickPower += upg.power;
        upg.cost = Math.round(upg.cost * 2.5);
        updateUI();
    }
}

// LÓGICA DO BIG BANG (PRESTÍGIO)
prestigeBtn.addEventListener('click', () => {
    if (mass >= 50000) {
        // Ativar Explosão Visual
        bangOverlay.classList.add('explosao-ativa');

        setTimeout(() => {
            // Resetar Valores
            prestigeCount++;
            totalMultiplier = 1.0 + (prestigeCount * 1.0); // Aumenta 1.0 por reinício
            
            mass = 0;
            baseMps = 0;
            clickPower = 1;

            // Resetar Custos
            up3.cost = 1100;
            up4.cost = 5000;
            cUp1.cost = 50;
            cUp2.cost = 500;

            updateUI();
            
            // Remover Explosão
            setTimeout(() => {
                bangOverlay.classList.remove('explosao-ativa');
            }, 500);
        }, 600);
    }
});

// ATUALIZAR TELA
function updateUI() {
