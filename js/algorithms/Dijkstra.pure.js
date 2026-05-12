class PriorityQueue {
    constructor() { this.elements = []; }
    push(data) { this.elements.push(data); this.elements.sort((a, b) => a.cost - b.cost); }
    pop() { return this.elements.shift(); }
    isEmpty() { return this.elements.length === 0; }
}

export function DijkstraPure(grid, source, target, rows, cols) {
    const pq = new PriorityQueue();
    const parentMap = new Map();
    const distance = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const visitedNodes = [];
    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    distance[source.x][source.y] = 0;
    pq.push({ coordinate: source, cost: 0 });

    while (!pq.isEmpty()) {
        const { coordinate: current, cost: distSoFar } = pq.pop();
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
            if (isValid(neighbour.x, neighbour.y) && !grid[neighbour.x][neighbour.y].isWall) {
                const newDist = distSoFar + 1;
                if (newDist < distance[neighbour.x][neighbour.y]) {
                    distance[neighbour.x][neighbour.y] = newDist;
                    pq.push({ coordinate: neighbour, cost: newDist });
                    parentMap.set(key, current);
                }
            }
        }
    }

    return { visitedNodes, path: [] };
}