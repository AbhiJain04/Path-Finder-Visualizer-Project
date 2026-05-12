export function DFSPure(grid, currentNode, target, rows, cols, visited = new Set(), path = []) {
    if (currentNode.x === target.x && currentNode.y === target.y) {
        path.unshift(currentNode);
        return { visitedNodes: [...visited].map(k => {
            const [x, y] = k.split('-').map(Number);
            return { x, y };
        }), path };
    }

    visited.add(`${currentNode.x}-${currentNode.y}`);

    const neighbours = [
        { x: currentNode.x - 1, y: currentNode.y },
        { x: currentNode.x,     y: currentNode.y + 1 },
        { x: currentNode.x + 1, y: currentNode.y },
        { x: currentNode.x,     y: currentNode.y - 1 },
    ];

    const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

    for (const neighbour of neighbours) {
        const key = `${neighbour.x}-${neighbour.y}`;
        if (isValid(neighbour.x, neighbour.y) && !visited.has(key) && !grid[neighbour.x][neighbour.y].isWall) {
            const result = DFSPure(grid, neighbour, target, rows, cols, visited, path);
            if (result.path.length > 0) {
                result.path.unshift(currentNode);
                return result;
            }
        }
    }

    return { visitedNodes: [], path: [] };
}