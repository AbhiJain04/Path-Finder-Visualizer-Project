import { AStarPure }    from '../js/algorithms/AStar.pure.js';
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

test('A* finds shortest path in open grid', () => {
    const { path } = AStarPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(path.length).toBe(9);
    expect(path[0]).toEqual(source);
    expect(path[path.length - 1]).toEqual(target);
});

test('A* returns empty path when target is unreachable', () => {
    const walls = [{ x: 3, y: 4 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
    const { path } = AStarPure(createGrid(ROWS, COLS, walls), source, target, ROWS, COLS);
    expect(path.length).toBe(0);
});

test('A* visits fewer or equal nodes than Dijkstra', () => {
    const { visitedNodes: astarVisited }    = AStarPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    const { visitedNodes: dijkstraVisited } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(astarVisited.length).toBeLessThanOrEqual(dijkstraVisited.length);
});

test('A* and Dijkstra find same shortest path length', () => {
    const { path: astarPath }    = AStarPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    const { path: dijkstraPath } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(astarPath.length).toBe(dijkstraPath.length);
});