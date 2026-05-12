import { BFSPure } from '../js/algorithms/BFS.pure.js';

// Helper: creates a plain grid of given size, all open (no walls)
function createGrid(rows, cols, walls = []) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = { x: i, y: j, isWall: false };
        }
    }
    // place walls
    walls.forEach(({ x, y }) => grid[x][y].isWall = true);
    return grid;
}

// ─── Test 1: finds the shortest path in an open grid ───────────────────────
test('BFS finds shortest path in open grid', () => {
    const grid = createGrid(5, 5);
    const source = { x: 0, y: 0 };
    const target = { x: 4, y: 4 };

    const { path } = BFSPure(grid, source, target, 5, 5);

    // shortest path in a 5x5 grid from (0,0) to (4,4) = 9 nodes
    expect(path.length).toBe(9);
    expect(path[0]).toEqual(source);
    expect(path[path.length - 1]).toEqual(target);
});

// ─── Test 2: returns empty path when target is surrounded by walls ──────────
test('BFS returns empty path when target is unreachable', () => {
    const walls = [
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 3, y: 3 },
    ];
    const grid = createGrid(5, 5, walls);
    const source = { x: 0, y: 0 };
    const target = { x: 4, y: 4 };

    const { path } = BFSPure(grid, source, target, 5, 5);

    expect(path.length).toBe(0);
});

// ─── Test 3: visits nodes in BFS order (level by level) ────────────────────
test('BFS visits source node first', () => {
    const grid = createGrid(5, 5);
    const source = { x: 0, y: 0 };
    const target = { x: 4, y: 4 };

    const { visitedNodes } = BFSPure(grid, source, target, 5, 5);

    expect(visitedNodes[0]).toEqual(source);
});

// ─── Test 4: source === target returns path of length 1 ────────────────────
test('BFS returns single node path when source equals target', () => {
    const grid = createGrid(5, 5);
    const source = { x: 2, y: 2 };

    const { path } = BFSPure(grid, source, source, 5, 5);

    expect(path.length).toBe(1);
    expect(path[0]).toEqual(source);
});

// ─── Test 5: BFS visits fewer nodes than grid total (not brute force) ──────
test('BFS does not visit every single node in an open grid', () => {
    const grid = createGrid(10, 10);
    const source = { x: 0, y: 0 };
    const target = { x: 0, y: 9 }; // same row, just go right

    const { visitedNodes } = BFSPure(grid, source, target, 10, 10);

    // should stop well before visiting all 100 nodes
    expect(visitedNodes.length).toBeLessThan(100);
});