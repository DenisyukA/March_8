const pwr = document.getElementById('pwr-sw');
const logic = document.getElementById('logic-sw');
const sync = document.getElementById('sync-sw');
const consoleBox = document.getElementById('console');
const glass = document.getElementById('glass');

let currentLine;

const bootLines = [
    "> Initializing Boot Sequence...",
    "> Hardware check: OK",
    "> Target: SOFIA [FOUND]",
    "--------------------------",
    "      ACCESS GRANTED      ",
    "--------------------------",
    "",
    "ВІТАЮ З 8 БЕРЕЗНЯ!",
    "",
    "ТИ — НАЙКРАЩА БІБІЗЯНА",
    "В ЦЬОМУ ЗООПАРКУ.",
    "",
    "ЗАЛИШАЙСЯ СОБОЮ.",
    "",
    "> SYSTEM_IDLE."
];

async function runBoot() {
    consoleBox.innerHTML = "";
    for (const line of bootLines) {
        if (!pwr.checked || !logic.checked || !sync.checked) return;
        
        currentLine = document.createElement('div');
        currentLine.className = 'line';
        consoleBox.appendChild(currentLine);

        for (let char of line) {
            if (!pwr.checked) return;
            currentLine.innerHTML += char;
            consoleBox.scrollTop = consoleBox.scrollHeight;
            await new Promise(r => setTimeout(r, 20));
        }
        await new Promise(r => setTimeout(r, 100));
    }
}

function update() {
    if (!pwr.checked) {
        glass.classList.remove('on', 'on-flicker');
        consoleBox.innerHTML = `
            <div class="line">SYSTEM STATUS: OFFLINE</div>
            <div class="hint">УВІМКНИ ЖИВЛЕННЯ (PWR), ЩОБ ПОЧАТИ</div>
        `;
        return;
    }

    glass.classList.add('on', 'on-flicker');

    if (pwr.checked && !logic.checked) {
        consoleBox.innerHTML = "<div class='line'>> SYSTEM_CONNECTED</div><div class='line'>> WAITING FOR LOGIC...</div>";
    } else if (pwr.checked && logic.checked && !sync.checked) {
        consoleBox.innerHTML = "<div class='line'>> LOGIC: OK</div><div class='line'>> READY TO SYNC...</div>";
    } else if (pwr.checked && logic.checked && sync.checked) {
        runBoot();
    }
}

[pwr, logic, sync].forEach(s => s.addEventListener('change', update));
