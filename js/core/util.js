import { row, col, matrix, sourceCoordinate, targetCoordinate } from "./board.js";
import { pathToAnimate } from "../app.js";
import { speed } from "./navOptions.js";



export function isValid(x, y){
    return (x>= 0 && y >= 0 && x < row && y < col);
}

export function animate(elements, className){
    let delay = 10;
    if(speed === 'Fast') delay = 7;
    else if(speed === 'Slow') delay = 50;
    else if (speed === 'Normal') delay = 15;

    if(className === 'wall') delay = 10;

    if(className === 'path') delay *= 3.5;
    for(let i = 0; i < elements.length; i++){
        setTimeout(()=>{
            elements[i].classList.remove('visited');
            elements[i].classList.add(className);
            if(i === elements.length - 1 && className === 'visited'){
                animate(pathToAnimate, 'path');
            }
        }, delay * i)
    }
}

export function getPath(parent, target){
    if(!target) return;

    pathToAnimate.push(matrix[target.x][target.y]);
    const p = parent.get(`${target.x}-${target.y}`);
    getPath(parent, p);
}

export class PriorityQueue{
    constructor(){
        this.elements = [];
        this.length = 0;
    }

    push(data){
        this.elements.push(data);
        this.length++;
        this.upHeapify(this.length - 1);
    }

    pop(){
        this.swap(0, this.length - 1);
        const poped = this.elements.pop();
        this.length--;
        this.downHeapify(0);
        return poped;
    }

    upHeapify(i){
        if(i === 0) return;
        const parent = Math.floor((i - 1)/2);
        if(this.elements[i].cost < this.elements[parent].cost){
            this.swap(parent, i);
            this.upHeapify(parent);
        }
    }

    downHeapify(i){
        let minNode = i;
        const leftChild = (2 * i) + 1;
        const rightChild = (2 * i) + 2;

        if(leftChild < this.length && this.elements[leftChild].cost < this.elements[minNode].cost){
            minNode = leftChild;
        }

        if(rightChild < this.length && this.elements[rightChild].cost < this.elements[minNode].cost){
            minNode = rightChild;
        }

        if(minNode !== i){
            this.swap(minNode, i);
            this.downHeapify(minNode);
        }
    }

    isEmpty(){
        return this.length === 0;
    }

    swap(x, y){
        [this.elements[x], this.elements[y]] = [this.elements[y], this.elements[x]];
    }
}

export function heuristicValue(node){
    return Math.abs(node.x - targetCoordinate.x) + Math.abs(node.y - targetCoordinate.y); 
}