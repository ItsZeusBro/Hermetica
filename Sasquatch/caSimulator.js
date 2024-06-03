document.addEventListener("DOMContentLoaded", function() {
    populateRuleSelect();
});

function populateRuleSelect() {
    const ruleSelect = document.getElementById('ruleSelect');
    for (let i = 0; i < 256; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = `Rule ${i}`;
        ruleSelect.appendChild(option);
    }
}

let previousStates = [];
let currentState = [];
let interval;
let rowsToShow;

function startSimulation() {
    const inputString = document.getElementById('inputString').value;
    const expectedString = document.getElementById('expectedString').value;
    const ruleNumber = parseInt(document.getElementById('ruleSelect').value);
    rowsToShow = parseInt(document.getElementById('rowsToShow').value);

    const expectedBinary = stringToBinary(expectedString);
    const inputBinary = stringToBinary(inputString);

    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';

    document.getElementById('inputEncoding').textContent = `Input Binary: ${inputBinary.join('')}`;
    document.getElementById('expectedEncoding').textContent = `Expected Binary: ${expectedBinary.join('')}`;
    document.getElementById('initialState').textContent = `Initial State: ${inputBinary.join('')}`;
    document.getElementById('expectedOutputState').textContent = `Expected Output State: ${expectedBinary.join('')}`;

    currentState = inputBinary.slice();
    previousStates = [currentState.join('')];
    displayInitialGrid([currentState]);

    let round = 0;
    document.getElementById('loopMessage').textContent = '';

    interval = setInterval(() => {
        round++;
        currentState = simulateCellularAutomata(currentState, ruleNumber);
        updateGrid(currentState);

        const currentBinaryString = binaryToString(currentState);
        if (currentBinaryString === expectedString) {
            clearInterval(interval);
            document.getElementById('output').textContent = `Match found in ${round} rounds.`;
            return;
        }

        if (previousStates.slice(-1000).includes(currentState.join(''))) {
            clearInterval(interval);
            document.getElementById('output').textContent = `Loop detected. Terminated after ${round} rounds.`;
            document.getElementById('loopMessage').textContent = `Loop detected at round ${round}.`;
            return;
        }

        previousStates.push(currentState.join(''));
    }, 100);
}

function showLastRows() {
    displayInitialGrid(previousStates.slice(-rowsToShow).map(state => state.split('').map(bit => parseInt(bit))));
}

function stringToBinary(str) {
    return str.split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('')
        .split('')
        .map(bit => parseInt(bit));
}

function binaryToString(binaryArray) {
    let binaryString = binaryArray.join('');
    let text = '';
    for (let i = 0; i < binaryString.length; i += 8) {
        const byte = binaryString.slice(i, i + 8);
        text += String.fromCharCode(parseInt(byte, 2));
    }
    return text;
}

function simulateCellularAutomata(state, ruleNumber) {
    const newState = [];
    for (let i = 0; i < state.length; i++) {
        const left = state[i - 1] || 0;
        const center = state[i];
        const right = state[i + 1] || 0;
        const ruleIndex = (left << 2) | (center << 1) | right;
        newState[i] = applyRule(ruleIndex, ruleNumber);
    }
    return newState;
}

function applyRule(index, ruleNumber) {
    const ruleBinary = ruleNumber.toString(2).padStart(8, '0').split('').reverse().map(bit => parseInt(bit));
    return ruleBinary[index];
}

function displayInitialGrid(states) {
    const container = document.getElementById('grid');
    container.innerHTML = '';
    states.forEach(state => {
        const row = document.createElement('div');
        row.className = 'row';
        state.forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.className = `cell ${cell ? 'on' : ''}`;
            row.appendChild(cellDiv);
        });
        container.appendChild(row);
    });
}

function updateGrid(state) {
    const container = document.getElementById('grid');
    const newRow = document.createElement('div');
    newRow.className = 'row';
    state.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.className = `cell ${cell ? 'on' : ''}`;
        newRow.appendChild(cellDiv);
    });
    container.appendChild(newRow);

    // Remove old rows if more than rowsToShow
    while (container.children.length > rowsToShow) {
        container.removeChild(container.firstChild);
    }
}
