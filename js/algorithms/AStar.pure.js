class PriorityQueue {
    constructor() { this.elements = []; }
    push(data) { this.elements.push(data); this.elements.sort((a, b) => a.cost - b.cost); }
    pop() { return this.elements.shift(); }
    isEmpty() { return this.elements.length === 0; }
}

const heuristic = (node, target) =>
    Math.abs(node.x - target.x) + Math.abs(node.y - target.y);

export function AStarPure(grid, source, target, rows, cols) {
    const queue = new PriorityQueue();
    const visited = new Set();
    const queued = new Set();
    const parentMap = new Map();
    const visitedNodes = [];
    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    gScore[source.x][source.y] = 0;

    queue.push({ coordinate: source, cost: heuristic(source, target) });
    queued.add(`${source.x}-${source.y}`);

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

        visited.add(`${current.x}-${current.y}`);

        const neighbours = [
            { x: current.x - 1, y: current.y },
            { x: current.x,     y: current.y + 1 },
            { x: current.x + 1, y: current.y },
            { x: current.x,     y: current.y - 1 },
        ];

        for (const neighbour of neighbours) {
            const key = `${neighbour.x}-${neighbour.y}`;
            if (isValid(neighbour.x, neighbour.y) && !visited.has(key) && !queued.has(key) && !grid[neighbour.x][neighbour.y].isWall) {
                const g = gScore[current.x][current.y] + 1;
                const f = g + heuristic(neighbour, target);
                if (g < gScore[neighbour.x][neighbour.y]) {
                    gScore[neighbour.x][neighbour.y] = g;
                    queue.push({ coordinate: neighbour, cost: f });
                    queued.add(key);
                    parentMap.set(key, current);
                }
            }
        }
    }

    return { visitedNodes, path: [] };
}