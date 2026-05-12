class PriorityQueue {
    constructor() { this.elements = []; }
    push(data) { this.elements.push(data); this.elements.sort((a, b) => a.cost - b.cost); }
    pop() { return this.elements.shift(); }
    isEmpty() { return this.elements.length === 0; }
}

const heuristic = (node, target) =>
    Math.abs(node.x - target.x) + Math.abs(node.y - target.y);

export function GreedyPure(grid, source, target, rows, cols) {
    const queue = new PriorityQueue();
    const visited = new Set();
    const parentMap = new Map();
    const visitedNodes = [];
    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    queue.push({ coordinate: source, cost: heuristic(source, target) });
    visited.add(`${source.x}-${source.y}`);

    while (!queue.isEmpty()) {
        const { coordinate: current } = queue.pop();
        visitedNodes.push(current);

        if (current.x === target.x && current.y === target.y) {
            const path = [];
            let node = target;
            while (node) {
                path.unshift(node);
                node = parentMap.get(`${node.x}-${node.y}`);
            }
            return { visitedNodes, path };
        }

        const neighbours = [
            { x: current.x - 1, y: current.y },
            { x: current.x,     y: current.y + 1 },
            { x: current.x + 1, y: current.y },
            { x: current.x,     y: current.y - 1 },
        ];

        for (const neighbour of neighbours) {
            const key = `${neighbour.x}-${neighbour.y}`;
            if (isValid(neighbour.x, neighbour.y) && !visited.has(key) && !grid[neighbour.x][neighbour.y].isWall) {
                queue.push({ coordinate: neighbour, cost: heuristic(neighbour, target) });
                visited.add(key);
                parentMap.set(key, current);
            }
        }
    }

    return { visitedNodes, path: [] };
}