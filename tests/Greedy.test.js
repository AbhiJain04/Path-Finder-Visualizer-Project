import { GreedyPure }   from '../js/algorithms/Greedy.pure.js';
import { DijkstraPure } from '../js/algorithms/Dijkstra.pure.js';

function createGrid(rows, cols, walls = []) {
    const grid = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => ({ x: i, y: j, isWall: false }))
    );
    walls.forEach(({ x, y }) => grid[x][y].isWall = true);
    return grid;
}

const ROWS = 5, COLS = 5;
const source = { x: 0, y: 0 };
const target = { x: 4, y: 4 };

test('Greedy finds a path in an open grid', () => {
    const { path } = GreedyPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual(source);
    expect(path[path.length - 1]).toEqual(target);
});

test('Greedy returns empty path when target is unreachable', () => {
    const walls = [{ x: 3, y: 4 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
    const { path } = GreedyPure(createGrid(ROWS, COLS, walls), source, target, ROWS, COLS);
    expect(path.length).toBe(0);
});

test('Greedy visits fewer or equal nodes than Dijkstra', () => {
    const { visitedNodes: greedyVisited }   = GreedyPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    const { visitedNodes: dijkstraVisited } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(greedyVisited.length).toBeLessThanOrEqual(dijkstraVisited.length);
});