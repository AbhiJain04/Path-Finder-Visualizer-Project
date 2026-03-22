import { PriorityQueue } from "../core/util.js";
import { getPath, isValid } from "../core/util.js";
import { sourceCoordinate, targetCoordinate, matrix, row, col } from "../core/board.js";
import { visitedCell } from "../app.js";


//---------------------------------------------//
//    Dijkstra's Algorithms
//--------------------------------------------//

export function Dijkstra(){
    const pq = new PriorityQueue();
    const parentMap = new Map();
    const distance = [];
    for(let i = 0; i < row; i++){
        const INF = [];
        for(let j = 0; j < col; j++){
            INF.push(Infinity);
        }
        distance.push(INF);
    }

    distance[sourceCoordinate.x][sourceCoordinate.y] = 0;
    pq.push({coordinate : sourceCoordinate, cost : 0});


    while(!pq.isEmpty()){
        const {coordinate : frontElement, cost : distanceSoFar} = pq.pop();
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
            if(isValid(neighbour.x, neighbour.y) && !matrix[neighbour.x][neighbour.y].classList.contains('wall')){
                const edgeWeight = 1;
                const distanceToNeighbour = distanceSoFar + edgeWeight;

                if(distanceToNeighbour < distance[neighbour.x][neighbour.y]){
                    distance[neighbour.x][neighbour.y] = distanceToNeighbour;
                    pq.push({coordinate : neighbour, cost : distanceToNeighbour});
                    parentMap.set(currentNeighbour, frontElement);
                }
            }
        }
        console.log('Dijkstra Algorithm visualization complete');
    }
}