import { PriorityQueue, heuristicValue } from "../core/util.js";
import { getPath, isValid } from "../core/util.js";
import { sourceCoordinate, targetCoordinate, matrix, row, col } from "../core/board.js";
import { visitedCell } from "../app.js";

//----------------------------------------------//
//     Greedy Algorithm
//----------------------------------------------//

export function Greedy(){
    const queue = new PriorityQueue();
    const visited = new Set();
    const parentMap = new Map();

    queue.push({coordinate : sourceCoordinate, cost : heuristicValue(sourceCoordinate)});
    visited.add(`${sourceCoordinate.x}-${sourceCoordinate.y}`);

    while(!queue.isEmpty()){
        const {coordinate : frontElement}= queue.pop();
        visitedCell.push(matrix[frontElement.x][frontElement.y]);

        if(frontElement.x === targetCoordinate.x && frontElement.y === targetCoordinate.y){
            getPath(parentMap, targetCoordinate);
            return;
        }

        const neighbourOfFrontElement = [
            {x: frontElement.x - 1, y:frontElement.y}, //up
            {x: frontElement.x, y:frontElement.y + 1}, //right
            {x: frontElement.x + 1, y:frontElement.y}, //down
            {x: frontElement.x, y:frontElement.y- 1}, //left
        ]
            
        for(const neighbour of neighbourOfFrontElement){
            const currentNeighbour = `${neighbour.x}-${neighbour.y}`;
            if(isValid(neighbour.x, neighbour.y) && !visited.has(currentNeighbour) && !matrix[neighbour.x][neighbour.y].classList.contains('wall')){
                queue.push({coordinate : neighbour, cost : heuristicValue(neighbour)});
                visited.add(currentNeighbour);
                parentMap.set(currentNeighbour, frontElement);
            }
        }
        console.log('Greedy Algorithm visualization complete');
    }
}