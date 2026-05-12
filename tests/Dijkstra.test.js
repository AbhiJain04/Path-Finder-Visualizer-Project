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

test('Dijkstra finds shortest path in open grid', () => {
    const { path } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(path.length).toBe(9);
    expect(path[0]).toEqual(source);
    expect(path[path.length - 1]).toEqual(target);
});

test('Dijkstra returns empty path when target is unreachable', () => {
    const walls = [{ x: 3, y: 4 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
    const { path } = DijkstraPure(createGrid(ROWS, COLS, walls), source, target, ROWS, COLS);
    expect(path.length).toBe(0);
});

test('Dijkstra visits source node first', () => {
    const { visitedNodes } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(visitedNodes[0]).toEqual(source);
});

test('Dijkstra guarantees shortest path length of 9 in 5x5 grid', () => {
    const { path } = DijkstraPure(createGrid(ROWS, COLS), source, target, ROWS, COLS);
    expect(path.length).toBe(9);
});