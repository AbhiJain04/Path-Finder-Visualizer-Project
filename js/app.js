import { renderBoard, sourceCoordinate, matrix } from './core/board.js';
import { operationsOnNavOptions, clearPath, visualizeBtn, algorithm } from './core/navOptions.js';
import { mazeGenerationAlgorithm } from './algorithms/mazeGeneration.js';
import { animate } from './core/util.js';
import { BFS } from './algorithms/BFS.js';
import { DFS } from './algorithms/DFS.js';
import { Dijkstra } from './algorithms/Dijkstra\'s.js';
import { Greedy } from './algorithms/Greedy.js';
import { AStarAlgorithm } from './algorithms/AStar.js';
import { startTimer, showStats, hideStats } from './stats.js';

renderBoard();
operationsOnNavOptions();
mazeGenerationAlgorithm();

export var visitedCell;
export var pathToAnimate;

visualizeBtn.addEventListener('click', () => {
    clearPath();
    hideStats();       // hide previous stats
    startTimer();      // start the clock

    visitedCell = [];
    pathToAnimate = [];

    switch (algorithm) {
        case 'BFS': BFS(); break;
        case 'DFS': if (DFS(sourceCoordinate)) pathToAnimate.push(matrix[sourceCoordinate.x][sourceCoordinate.y]); break;
        case "Dijkstra's": Dijkstra(); break;
        case 'A*': AStarAlgorithm(); break;
        case 'Greedy': Greedy(); break;
        default: break;
    }

    animate(visitedCell, 'visited', () => {
        // This runs only after the full animation (visited + path) completes
        showStats(visitedCell.length, pathToAnimate.length, algorithm);
    });
});