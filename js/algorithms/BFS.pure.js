// Pure version of BFS — no DOM, no imports, fully testable
// Takes a plain grid (2D array of objects) instead of DOM elements

export function BFSPure(grid, source, target, rows, cols) {
    const queue = [];
    const visited = new Set();
    const parentMap = new Map();

    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    queue.push(source);
    visited.add(`${source.x}-${source.y}`);

    const visitedNodes = [];

    while (queue.length > 0) {
        const current = queue.shift();
        visitedNodes.push(current);

        if (current.x === target.x && current.y === target.y) {
            // trace back the path
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
            if (
                isValid(neighbour.x, neighbour.y) &&
                !visited.has(key) &&
                !grid[neighbour.x][neighbour.y].isWall
            ) {
                queue.push(neighbour);
                visited.add(key);
                parentMap.set(key, current);
            }
        }
    }

    return { visitedNodes, path: [] }; // no path found
}