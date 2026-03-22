import { getPath, isValid } from "../core/util.js";
import { sourceCoordinate, targetCoordinate, matrix } from "../core/board.js";
import { visitedCell, pathToAnimate } from "../app.js";

//---------------------------------------------//
// implementation of DFS Algorithm
//---------------------------------------------//

const visited = new Set();
export function DFS(currentNode){
    if(currentNode.x === targetCoordinate.x && currentNode.y === targetCoordinate.y){
        return true;
    }

    visitedCell.push(matrix[currentNode.x][currentNode.y]);
    visited.add(`${currentNode.x}-${currentNode.y}`);

    const neighbourOfCurrentNode = [
            {x: currentNode.x - 1, y:currentNode.y}, //up
            {x: currentNode.x, y:currentNode.y + 1}, //right
            {x: currentNode.x + 1, y:currentNode.y}, //down
            {x: currentNode.x, y:currentNode.y- 1}, //left
        ]

    for (const neighbour of neighbourOfCurrentNode) {
        if(isValid(neighbour.x, neighbour.y) && !visited.has(`${neighbour.x}-${neighbour.y}`) && !matrix[neighbour.x][neighbour.y].classList.contains('wall')){
            if(DFS(neighbour)){
                visited.delete(`${neighbour.x}-${neighbour.y}`);
                pathToAnimate.push(matrix[neighbour.x][neighbour.y]);
                return true;
            }
        }
    }
    return false;
}