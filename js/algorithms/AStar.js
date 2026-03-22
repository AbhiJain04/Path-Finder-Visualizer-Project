import { PriorityQueue, heuristicValue } from "../core/util.js";
import { getPath, isValid } from "../core/util.js";
import { sourceCoordinate, targetCoordinate, matrix, row, col } from "../core/board.js";
import { visitedCell } from "../app.js";

//-----------------------------------------------//
//  A* Algorithm
//-----------------------------------------------//


export function AStarAlgorithm(){
    const queue = new PriorityQueue();
    const visited = new Set();
    const queued = new Set();
    const parentMap = new Map();

    const gScore = [];
    for(let i = 0; i < row; i++){
        const INF = [];
        for(let j = 0; j < col; j++){
            INF.push(Infinity);
        }
        gScore.push(INF);
    }

    gScore[sourceCoordinate.x][sourceCoordinate.y] = 0;

    queue.push({coordinate : sourceCoordinate, cost : 0 + heuristicValue(sourceCoordinate)});
    queued.add(`${sourceCoordinate.x}-${sourceCoordinate.y}`);

    while(!queue.isEmpty()){
        const {coordinate : frontElement}= queue.pop();
        visitedCell.push(matrix[frontElement.x][frontElement.y]);

        if(frontElement.x === targetCoordinate.x && frontElement.y === targetCoordinate.y){
            getPath(parentMap, targetCoordinate);
            return;
        }

        visited.add(`${frontElement.x}-${frontElement.y}`);

        const neighbourOfFrontElement = [
            {x: frontElement.x - 1, y:frontElement.y}, //up
            {x: frontElement.x, y:frontElement.y + 1}, //right
            {x: frontElement.x + 1, y:frontElement.y}, //down
            {x: frontElement.x, y:frontElement.y- 1}, //left
        ]
            
        for(const neighbour of neighbourOfFrontElement){
            const currentNeighbour = `${neighbour.x}-${neighbour.y}`;
            if(isValid(neighbour.x, neighbour.y) && !visited.has(currentNeighbour) && !queued.has(currentNeighbour) && !matrix[neighbour.x][neighbour.y].classList.contains('wall')){
                const edgeWeight = 1;
                const gScoreToNeighbour = gScore[frontElement.x][frontElement.y] + edgeWeight;
                const fScore = gScoreToNeighbour + heuristicValue(neighbour);

                if(gScoreToNeighbour < gScore[neighbour.x][neighbour.y]){
                    gScore[neighbour.x][neighbour.y] = gScoreToNeighbour;
                    queue.push({coordinate : neighbour, cost : fScore});
                    queued.add(currentNeighbour);
                    parentMap.set(currentNeighbour, frontElement);
                }
            }
        }
        console.log('AStar Alogrithm visualization complete');
    }
}