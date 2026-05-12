let startTime = null;

export function startTimer() {
    startTime = performance.now();
}

export function showStats(visitedCount, pathLength, algoName) {
    const elapsed = startTime ? (performance.now() - startTime).toFixed(0) : '—';

    document.getElementById('statAlgo').textContent    = algoName;
    document.getElementById('statVisited').textContent = visitedCount;
    document.getElementById('statPath').textContent    = pathLength > 0 ? pathLength : 'None';
    document.getElementById('statTime').textContent    = elapsed + 'ms';

    // light them up
    ['statAlgoItem', 'statVisitedItem', 'statPathItem', 'statTimeItem']
        .forEach(id => document.getElementById(id).classList.add('active'));
}

export function hideStats() {
    document.getElementById('statAlgo').textContent    = '—';
    document.getElementById('statVisited').textContent = '—';
    document.getElementById('statPath').textContent    = '—';
    document.getElementById('statTime').textContent    = '—';

    // dim them again
    ['statAlgoItem', 'statVisitedItem', 'statPathItem', 'statTimeItem']
        .forEach(id => document.getElementById(id).classList.remove('active'));
}