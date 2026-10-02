// DSA Algorithm Visualizer - Sania Project

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playNote(freq, duration = 0.04) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio ignore
        }
    }
}

const sound = new SoundEngine();

// Metadata & Pseudocode definitions
const ALGO_METADATA = {
    bubbleSort: {
        title: "Bubble Sort",
        subtitle: "Compares adjacent elements and swaps them if they are out of order.",
        category: "sorting",
        complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Compare", color: "var(--bar-compare)" },
            { label: "Swap", color: "var(--bar-swap)" },
            { label: "Sorted", color: "var(--bar-sorted)" }
        ],
        code: [
            "function bubbleSort(arr):",
            "  for i = 0 to n-1:",
            "    for j = 0 to n-i-2:",
            "      if arr[j] > arr[j+1]:",
            "        swap(arr[j], arr[j+1])",
            "  return arr"
        ]
    },
    selectionSort: {
        title: "Selection Sort",
        subtitle: "Repeatedly finds the minimum element and places it at the start.",
        category: "sorting",
        complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Min / Check", color: "var(--bar-compare)" },
            { label: "Swap", color: "var(--bar-swap)" },
            { label: "Sorted", color: "var(--bar-sorted)" }
        ],
        code: [
            "function selectionSort(arr):",
            "  for i = 0 to n-1:",
            "    minIdx = i",
            "    for j = i+1 to n-1:",
            "      if arr[j] < arr[minIdx]: minIdx = j",
            "    swap(arr[i], arr[minIdx])"
        ]
    },
    insertionSort: {
        title: "Insertion Sort",
        subtitle: "Inserts each element into its proper position in a sorted subarray.",
        category: "sorting",
        complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Key", color: "var(--bar-pivot)" },
            { label: "Compare", color: "var(--bar-compare)" },
            { label: "Sorted", color: "var(--bar-sorted)" }
        ],
        code: [
            "function insertionSort(arr):",
            "  for i = 1 to n-1:",
            "    key = arr[i]",
            "    j = i - 1",
            "    while j >= 0 and arr[j] > key:",
            "      arr[j+1] = arr[j]; j--",
            "    arr[j+1] = key"
        ]
    },
    quickSort: {
        title: "Quick Sort",
        subtitle: "Partitions the array around a pivot element recursively.",
        category: "sorting",
        complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Pivot", color: "var(--bar-pivot)" },
            { label: "Compare", color: "var(--bar-compare)" },
            { label: "Swap", color: "var(--bar-swap)" },
            { label: "Sorted", color: "var(--bar-sorted)" }
        ],
        code: [
            "function quickSort(arr, low, high):",
            "  if low < high:",
            "    pIdx = partition(arr, low, high)",
            "    quickSort(arr, low, pIdx - 1)",
            "    quickSort(arr, pIdx + 1, high)"
        ]
    },
    mergeSort: {
        title: "Merge Sort",
        subtitle: "Recursively splits array in half and merges sorted halves.",
        category: "sorting",
        complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Subarray", color: "var(--bar-compare)" },
            { label: "Merge", color: "var(--bar-swap)" },
            { label: "Sorted", color: "var(--bar-sorted)" }
        ],
        code: [
            "function mergeSort(arr, l, r):",
            "  if l < r:",
            "    m = l + (r - l) / 2",
            "    mergeSort(arr, l, m)",
            "    mergeSort(arr, m+1, r)",
            "    merge(arr, l, m, r)"
        ]
    },
    linearSearch: {
        title: "Linear Search",
        subtitle: "Scans each element sequentially to find the target value.",
        category: "searching",
        complexity: { best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Checking", color: "var(--bar-compare)" },
            { label: "Target Found", color: "var(--bar-target)" }
        ],
        code: [
            "function linearSearch(arr, target):",
            "  for i = 0 to n-1:",
            "    if arr[i] == target:",
            "      return i",
            "  return -1"
        ]
    },
    binarySearch: {
        title: "Binary Search",
        subtitle: "Divides sorted search interval in half at each step.",
        category: "searching",
        complexity: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
        legend: [
            { label: "Default", color: "var(--bar-default)" },
            { label: "Boundaries", color: "var(--bar-pivot)" },
            { label: "Mid", color: "var(--bar-compare)" },
            { label: "Target Found", color: "var(--bar-target)" }
        ],
        code: [
            "function binarySearch(arr, target):",
            "  low = 0, high = n - 1",
            "  while low <= high:",
            "    mid = floor((low + high) / 2)",
            "    if arr[mid] == target: return mid",
            "    else if arr[mid] < target: low = mid + 1",
            "    else: high = mid - 1"
        ]
    },
    bfs: {
        title: "Breadth-First Search (BFS)",
        subtitle: "Traverses graph nodes level-by-level using a Queue.",
        category: "graph",
        complexity: { best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
        legend: [
            { label: "Start", color: "var(--grid-start)" },
            { label: "Target", color: "var(--grid-target)" },
            { label: "Visited", color: "var(--grid-visited)" },
            { label: "Shortest Path", color: "var(--grid-path)" }
        ],
        code: [
            "function BFS(start, target):",
            "  queue = [start]",
            "  visited.add(start)",
            "  while queue is not empty:",
            "    node = queue.pop()",
            "    if node == target: return path",
            "    for neighbor in node.neighbors:",
            "      if neighbor not visited:",
            "        visited.add(neighbor); queue.push(neighbor)"
        ]
    },
    dfs: {
        title: "Depth-First Search (DFS)",
        subtitle: "Explores graph branches as deep as possible using a Stack.",
        category: "graph",
        complexity: { best: "O(V + E)", avg: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
        legend: [
            { label: "Start", color: "var(--grid-start)" },
            { label: "Target", color: "var(--grid-target)" },
            { label: "Visited", color: "var(--grid-visited)" },
            { label: "Path", color: "var(--grid-path)" }
        ],
        code: [
            "function DFS(start, target):",
            "  stack = [start]",
            "  while stack is not empty:",
            "    node = stack.pop()",
            "    if node not visited:",
            "      visited.add(node)",
            "      if node == target: return path",
            "      for neighbor in node.neighbors:",
            "        stack.push(neighbor)"
        ]
    }
};

// Global App State
let currentAlgoKey = "bubbleSort";
let arrayData = [];
let animSteps = [];
let currentStepIdx = 0;
let isPlaying = false;
let animTimer = null;
let comparisonsCount = 0;
let swapsCount = 0;

// Graph Grid Config
const GRID_ROWS = 15;
const GRID_COLS = 26;
let gridData = [];
let startPos = { r: 7, c: 4 };
let targetPos = { r: 7, c: 21 };

// DOM Elements
const algoTitle = document.getElementById("algoTitle");
const algoSubtitle = document.getElementById("algoSubtitle");
const arraySizeInput = document.getElementById("arraySize");
const sizeValDisplay = document.getElementById("sizeVal");
const arrayPresetSelect = document.getElementById("arrayPreset");
const targetControl = document.getElementById("targetControl");
const targetInput = document.getElementById("targetInput");
const arrayControls = document.getElementById("arrayControls");
const graphControls = document.getElementById("graphControls");
const speedInput = document.getElementById("speed");

const customInputBtn = document.getElementById("customInputBtn");
const customInputPanel = document.getElementById("customInputPanel");
const customArrayStr = document.getElementById("customArrayStr");
const applyCustomBtn = document.getElementById("applyCustomBtn");
const cancelCustomBtn = document.getElementById("cancelCustomBtn");

const arrayCanvas = document.getElementById("arrayCanvas");
const graphCanvas = document.getElementById("graphCanvas");
const legendDiv = document.getElementById("legend");

const statComparisons = document.getElementById("statComparisons");
const statSwaps = document.getElementById("statSwaps");
const statStatus = document.getElementById("statStatus");

const compBest = document.getElementById("compBest");
const compAvg = document.getElementById("compAvg");
const compWorst = document.getElementById("compWorst");
const compSpace = document.getElementById("compSpace");
const codeBlock = document.getElementById("codeBlock");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stepBtn = document.getElementById("stepBtn");
const randomizeBtn = document.getElementById("randomizeBtn");
const soundToggle = document.getElementById("soundToggle");

// App Init
document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupControls();
    loadAlgorithm(currentAlgoKey);
});

function setupNavigation() {
    document.querySelectorAll(".nav-link").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const algoKey = btn.dataset.algo;
            loadAlgorithm(algoKey);
        });
    });

    soundToggle.addEventListener("click", () => {
        sound.enabled = !sound.enabled;
        soundToggle.innerHTML = sound.enabled ? 
            `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Sound: ON` :
            `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Sound: OFF`;
    });
}

function setupControls() {
    arraySizeInput.addEventListener("input", (e) => {
        sizeValDisplay.textContent = e.target.value;
        if (ALGO_METADATA[currentAlgoKey].category !== "graph") {
            resetVisualization();
        }
    });

    arrayPresetSelect.addEventListener("change", () => {
        resetVisualization();
    });

    randomizeBtn.addEventListener("click", () => {
        resetVisualization();
    });

    customInputBtn.addEventListener("click", () => {
        customInputPanel.classList.toggle("hidden");
    });

    cancelCustomBtn.addEventListener("click", () => {
        customInputPanel.classList.add("hidden");
    });

    applyCustomBtn.addEventListener("click", () => {
        const val = customArrayStr.value.trim();
        if (val) {
            const parsed = val.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x) && x > 0 && x <= 100);
            if (parsed.length >= 3) {
                arrayData = parsed;
                arraySizeInput.value = parsed.length;
                sizeValDisplay.textContent = parsed.length;
                customInputPanel.classList.add("hidden");
                resetVisualization(false);
            } else {
                alert("Please enter at least 3 valid numbers between 1 and 100.");
            }
        }
    });

    document.getElementById("clearGridBtn").addEventListener("click", () => {
        resetGraphGrid(false);
    });

    document.getElementById("resetWallsBtn").addEventListener("click", () => {
        resetGraphGrid(true);
    });

    document.getElementById("randomWallsBtn").addEventListener("click", () => {
        generateRandomWalls();
    });

    playBtn.addEventListener("click", startVisualization);
    pauseBtn.addEventListener("click", pauseVisualization);
    stepBtn.addEventListener("click", stepVisualization);
}

function loadAlgorithm(key) {
    pauseVisualization();
    currentAlgoKey = key;
    const meta = ALGO_METADATA[key];

    algoTitle.textContent = meta.title;
    algoSubtitle.textContent = meta.subtitle;

    compBest.textContent = meta.complexity.best;
    compAvg.textContent = meta.complexity.avg;
    compWorst.textContent = meta.complexity.worst;
    compSpace.textContent = meta.complexity.space;

    codeBlock.innerHTML = meta.code.map((line, idx) => `<span class="code-line" id="line-${idx}">${escapeHtml(line)}</span>`).join("\n");

    legendDiv.innerHTML = meta.legend.map(item => `
        <div class="legend-item">
            <span class="legend-swatch" style="background-color: ${item.color};"></span>
            <span>${item.label}</span>
        </div>
    `).join("");

    if (meta.category === "graph") {
        arrayControls.classList.add("hidden");
        graphControls.classList.remove("hidden");
        arrayCanvas.classList.add("hidden");
        graphCanvas.classList.remove("hidden");
        customInputPanel.classList.add("hidden");
        initGraphGrid();
    } else {
        graphControls.classList.add("hidden");
        arrayControls.classList.remove("hidden");
        graphCanvas.classList.add("hidden");
        arrayCanvas.classList.remove("hidden");

        if (meta.category === "searching") {
            targetControl.classList.remove("hidden");
        } else {
            targetControl.classList.add("hidden");
        }
        resetVisualization();
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function generateArray() {
    const size = parseInt(arraySizeInput.value);
    const preset = arrayPresetSelect.value;
    arrayData = [];

    if (preset === "reversed") {
        for (let i = size; i >= 1; i--) {
            arrayData.push(Math.floor((i / size) * 85) + 10);
        }
    } else if (preset === "nearlySorted") {
        for (let i = 1; i <= size; i++) {
            arrayData.push(Math.floor((i / size) * 85) + 10);
        }
        // Swap 2 random pairs
        for (let k = 0; k < 2; k++) {
            let idx1 = Math.floor(Math.random() * size);
            let idx2 = Math.floor(Math.random() * size);
            [arrayData[idx1], arrayData[idx2]] = [arrayData[idx2], arrayData[idx1]];
        }
    } else {
        for (let i = 0; i < size; i++) {
            arrayData.push(Math.floor(Math.random() * 85) + 10);
        }
    }

    if (currentAlgoKey === "binarySearch") {
        arrayData.sort((a, b) => a - b);
    }
}

function renderArray(activeIndices = {}, highlightSorted = false) {
    arrayCanvas.innerHTML = "";
    const maxVal = Math.max(...arrayData, 100);

    arrayData.forEach((val, idx) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(val / maxVal) * 100}%`;
        bar.textContent = arrayData.length <= 25 ? val : "";

        if (highlightSorted) {
            bar.classList.add("sorted");
        } else if (activeIndices.comparing && activeIndices.comparing.includes(idx)) {
            bar.classList.add("comparing");
        } else if (activeIndices.swapping && activeIndices.swapping.includes(idx)) {
            bar.classList.add("swapping");
        } else if (activeIndices.pivot && activeIndices.pivot.includes(idx)) {
            bar.classList.add("pivot");
        } else if (activeIndices.target && activeIndices.target.includes(idx)) {
            bar.classList.add("target");
        }

        arrayCanvas.appendChild(bar);
    });
}

function resetVisualization(regenData = true) {
    pauseVisualization();
    if (regenData) generateArray();
    renderArray();
    animSteps = [];
    currentStepIdx = 0;
    comparisonsCount = 0;
    swapsCount = 0;
    updateStats(0, 0, "Idle");
    clearLineHighlights();
}

function highlightCodeLine(lineIdx) {
    clearLineHighlights();
    if (lineIdx !== undefined && lineIdx !== null && lineIdx >= 0) {
        const el = document.getElementById(`line-${lineIdx}`);
        if (el) el.classList.add("active-line");
    }
}

function clearLineHighlights() {
    document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line"));
}

function updateStats(comp, swaps, status) {
    statComparisons.textContent = comp;
    statSwaps.textContent = swaps;
    statStatus.textContent = status;
}

function getDelay() {
    const val = parseInt(speedInput.value);
    return Math.floor(600 / val);
}

function buildAnimationSteps() {
    animSteps = [];
    const arrCopy = [...arrayData];

    switch (currentAlgoKey) {
        case "bubbleSort":
            genBubbleSortSteps(arrCopy);
            break;
        case "selectionSort":
            genSelectionSortSteps(arrCopy);
            break;
        case "insertionSort":
            genInsertionSortSteps(arrCopy);
            break;
        case "quickSort":
            genQuickSortSteps(arrCopy, 0, arrCopy.length - 1);
            break;
        case "mergeSort":
            genMergeSortSteps(arrCopy, 0, arrCopy.length - 1);
            break;
        case "linearSearch":
            genLinearSearchSteps(arrCopy);
            break;
        case "binarySearch":
            genBinarySearchSteps(arrCopy);
            break;
        case "bfs":
            genBFSGridSteps();
            break;
        case "dfs":
            genDFSGridSteps();
            break;
    }
}

/* Algorithm Logic Generators */

function genBubbleSortSteps(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animSteps.push({ type: "compare", indices: [j, j + 1], line: 3, arr: [...arr] });
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                animSteps.push({ type: "swap", indices: [j, j + 1], line: 4, arr: [...arr] });
            }
        }
    }
}

function genSelectionSortSteps(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        animSteps.push({ type: "compare", indices: [minIdx], line: 2, arr: [...arr] });
        for (let j = i + 1; j < n; j++) {
            animSteps.push({ type: "compare", indices: [j, minIdx], line: 4, arr: [...arr] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            animSteps.push({ type: "swap", indices: [i, minIdx], line: 5, arr: [...arr] });
        }
    }
}

function genInsertionSortSteps(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        animSteps.push({ type: "pivot", indices: [i], line: 2, arr: [...arr] });
        while (j >= 0 && arr[j] > key) {
            animSteps.push({ type: "compare", indices: [j, j + 1], line: 4, arr: [...arr] });
            arr[j + 1] = arr[j];
            animSteps.push({ type: "swap", indices: [j, j + 1], line: 5, arr: [...arr] });
            j--;
        }
        arr[j + 1] = key;
    }
}

function genQuickSortSteps(arr, low, high) {
    if (low < high) {
        let pIdx = partition(arr, low, high);
        genQuickSortSteps(arr, low, pIdx - 1);
        genQuickSortSteps(arr, pIdx + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    animSteps.push({ type: "pivot", indices: [high], line: 2, arr: [...arr] });
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animSteps.push({ type: "compare", indices: [j, high], line: 3, arr: [...arr] });
        if (arr[j] < pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            animSteps.push({ type: "swap", indices: [i, j], line: 4, arr: [...arr] });
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    animSteps.push({ type: "swap", indices: [i + 1, high], line: 4, arr: [...arr] });
    return i + 1;
}

function genMergeSortSteps(arr, l, r) {
    if (l < r) {
        let m = Math.floor(l + (r - l) / 2);
        genMergeSortSteps(arr, l, m);
        genMergeSortSteps(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        animSteps.push({ type: "compare", indices: [l + i, m + 1 + j], line: 5, arr: [...arr] });
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        animSteps.push({ type: "swap", indices: [k], line: 5, arr: [...arr] });
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        animSteps.push({ type: "swap", indices: [k], line: 5, arr: [...arr] });
        i++; k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        animSteps.push({ type: "swap", indices: [k], line: 5, arr: [...arr] });
        j++; k++;
    }
}

function genLinearSearchSteps(arr) {
    const target = parseInt(targetInput.value) || 42;
    for (let i = 0; i < arr.length; i++) {
        animSteps.push({ type: "compare", indices: [i], line: 2, arr: [...arr] });
        if (arr[i] === target) {
            animSteps.push({ type: "found", indices: [i], line: 3, arr: [...arr] });
            return;
        }
    }
}

function genBinarySearchSteps(arr) {
    const target = parseInt(targetInput.value) || 42;
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        animSteps.push({ type: "compare", indices: [mid], pivot: [low, high], line: 3, arr: [...arr] });
        if (arr[mid] === target) {
            animSteps.push({ type: "found", indices: [mid], line: 4, arr: [...arr] });
            return;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
}

/* Graph Grid Logic */

function initGraphGrid() {
    graphCanvas.innerHTML = "";
    graphCanvas.style.gridTemplateColumns = `repeat(${GRID_COLS}, 20px)`;
    gridData = [];

    for (let r = 0; r < GRID_ROWS; r++) {
        let row = [];
        for (let c = 0; c < GRID_COLS; c++) {
            const isStart = (r === startPos.r && c === startPos.c);
            const isTarget = (r === targetPos.r && c === targetPos.c);
            row.push({ r, c, isWall: false, isStart, isTarget });

            const nodeEl = document.createElement("div");
            nodeEl.className = "node";
            nodeEl.id = `node-${r}-${c}`;
            if (isStart) nodeEl.classList.add("start");
            if (isTarget) nodeEl.classList.add("target");

            nodeEl.addEventListener("click", () => {
                if (!isPlaying && !isStart && !isTarget) {
                    row[c].isWall = !row[c].isWall;
                    nodeEl.classList.toggle("wall");
                }
            });

            graphCanvas.appendChild(nodeEl);
        }
        gridData.push(row);
    }
    updateStats(0, 0, "Idle");
}

function resetGraphGrid(clearWalls = false) {
    pauseVisualization();
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            if (clearWalls) gridData[r][c].isWall = false;
            const nodeEl = document.getElementById(`node-${r}-${c}`);
            nodeEl.className = "node";
            if (gridData[r][c].isStart) nodeEl.classList.add("start");
            else if (gridData[r][c].isTarget) nodeEl.classList.add("target");
            else if (gridData[r][c].isWall) nodeEl.classList.add("wall");
        }
    }
    animSteps = [];
    currentStepIdx = 0;
    updateStats(0, 0, "Idle");
    clearLineHighlights();
}

function generateRandomWalls() {
    resetGraphGrid(true);
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            if (!gridData[r][c].isStart && !gridData[r][c].isTarget) {
                if (Math.random() < 0.25) {
                    gridData[r][c].isWall = true;
                    document.getElementById(`node-${r}-${c}`).classList.add("wall");
                }
            }
        }
    }
}

function genBFSGridSteps() {
    const queue = [startPos];
    const visited = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false));
    const parent = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
    visited[startPos.r][startPos.c] = true;

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    let found = false;

    while (queue.length > 0) {
        const curr = queue.shift();
        animSteps.push({ type: "visitNode", pos: curr, line: 4 });

        if (curr.r === targetPos.r && curr.c === targetPos.c) {
            found = true;
            break;
        }

        for (let i = 0; i < 4; i++) {
            const nr = curr.r + dr[i];
            const nc = curr.c + dc[i];

            if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
                if (!visited[nr][nc] && !gridData[nr][nc].isWall) {
                    visited[nr][nc] = true;
                    parent[nr][nc] = curr;
                    queue.push({ r: nr, c: nc });
                }
            }
        }
    }

    if (found) {
        let pathNode = parent[targetPos.r][targetPos.c];
        while (pathNode && !(pathNode.r === startPos.r && pathNode.c === startPos.c)) {
            animSteps.push({ type: "pathNode", pos: pathNode, line: 5 });
            pathNode = parent[pathNode.r][pathNode.c];
        }
    }
}

function genDFSGridSteps() {
    const stack = [startPos];
    const visited = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false));
    const parent = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));

    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
    let found = false;

    while (stack.length > 0) {
        const curr = stack.pop();

        if (!visited[curr.r][curr.c]) {
            visited[curr.r][curr.c] = true;
            animSteps.push({ type: "visitNode", pos: curr, line: 4 });

            if (curr.r === targetPos.r && curr.c === targetPos.c) {
                found = true;
                break;
            }

            for (let i = 0; i < 4; i++) {
                const nr = curr.r + dr[i];
                const nc = curr.c + dc[i];

                if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
                    if (!visited[nr][nc] && !gridData[nr][nc].isWall) {
                        parent[nr][nc] = curr;
                        stack.push({ r: nr, c: nc });
                    }
                }
            }
        }
    }

    if (found) {
        let pathNode = parent[targetPos.r][targetPos.c];
        while (pathNode && !(pathNode.r === startPos.r && pathNode.c === startPos.c)) {
            animSteps.push({ type: "pathNode", pos: pathNode, line: 6 });
            pathNode = parent[pathNode.r][pathNode.c];
        }
    }
}

/* Animation Runner */

function startVisualization() {
    if (isPlaying) return;
    if (animSteps.length === 0 || currentStepIdx >= animSteps.length) {
        if (ALGO_METADATA[currentAlgoKey].category === "graph") {
            resetGraphGrid(false);
        } else {
            if (arrayData.length === 0) generateArray();
        }
        buildAnimationSteps();
        currentStepIdx = 0;
        comparisonsCount = 0;
        swapsCount = 0;
    }

    isPlaying = true;
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    stepBtn.disabled = true;
    randomizeBtn.disabled = true;
    updateStats(comparisonsCount, swapsCount, "Running");

    runAnimationLoop();
}

function pauseVisualization() {
    isPlaying = false;
    if (animTimer) clearTimeout(animTimer);
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    stepBtn.disabled = false;
    randomizeBtn.disabled = false;
    if (currentStepIdx < animSteps.length && currentStepIdx > 0) {
        updateStats(comparisonsCount, swapsCount, "Paused");
    }
}

function stepVisualization() {
    if (isPlaying) return;
    if (animSteps.length === 0) {
        buildAnimationSteps();
        currentStepIdx = 0;
    }
    if (currentStepIdx < animSteps.length) {
        executeStep(animSteps[currentStepIdx]);
        currentStepIdx++;
    }
}

function runAnimationLoop() {
    if (!isPlaying) return;

    if (currentStepIdx >= animSteps.length) {
        finishVisualization();
        return;
    }

    executeStep(animSteps[currentStepIdx]);
    currentStepIdx++;

    animTimer = setTimeout(runAnimationLoop, getDelay());
}

function executeStep(step) {
    highlightCodeLine(step.line);

    if (ALGO_METADATA[currentAlgoKey].category === "graph") {
        const nodeEl = document.getElementById(`node-${step.pos.r}-${step.pos.c}`);
        if (step.type === "visitNode") {
            swapsCount++;
            if (!gridData[step.pos.r][step.pos.c].isStart && !gridData[step.pos.r][step.pos.c].isTarget) {
                nodeEl.classList.add("visited");
            }
            sound.playNote(180 + (step.pos.r * 12 + step.pos.c * 8));
        } else if (step.type === "pathNode") {
            if (!gridData[step.pos.r][step.pos.c].isStart && !gridData[step.pos.r][step.pos.c].isTarget) {
                nodeEl.classList.remove("visited");
                nodeEl.classList.add("path");
            }
            sound.playNote(550 + step.pos.c * 15);
        }
        updateStats(0, swapsCount, "Running");
    } else {
        if (step.arr) arrayData = [...step.arr];

        if (step.type === "compare") {
            comparisonsCount++;
            renderArray({ comparing: step.indices, pivot: step.pivot || [] });
            sound.playNote(220 + (arrayData[step.indices[0]] || 10) * 8);
        } else if (step.type === "swap") {
            swapsCount++;
            renderArray({ swapping: step.indices });
            sound.playNote(400 + (arrayData[step.indices[0]] || 10) * 8);
        } else if (step.type === "pivot") {
            renderArray({ pivot: step.indices });
        } else if (step.type === "found") {
            renderArray({ target: step.indices });
            sound.playNote(800, 0.2);
        }
        updateStats(comparisonsCount, swapsCount, "Running");
    }
}

function finishVisualization() {
    isPlaying = false;
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    stepBtn.disabled = true;
    randomizeBtn.disabled = false;
    clearLineHighlights();

    if (ALGO_METADATA[currentAlgoKey].category !== "graph") {
        renderArray({}, true);
    }
    updateStats(comparisonsCount, swapsCount, "Finished");
}
