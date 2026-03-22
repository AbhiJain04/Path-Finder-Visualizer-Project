import { isValid } from "./util.js";
import { boardInteraction } from "./interaction.js";

const board = document.getElementById('board');

export var cells, matrix;
export let row, col;
export let sourceCoordinate, targetCoordinate;


//Genertaing the Board for path Finding
export function renderBoard(cellWidth = 22){
    matrix = [];
    const root = document.documentElement;
    root.style.setProperty('--cell-width', `${cellWidth}px`);
    row = Math.floor(board.clientHeight / cellWidth);
    col = Math.floor(board.clientWidth / cellWidth);

    board.innerHTML = '';
    cells = [];

    for(let i = 0; i < row; i++){
        const rowArr = [];
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        rowElement.setAttribute('id' , `${i}`);

        for(let j = 0; j < col; j++){
            const colElement = document.createElement('div');
            colElement.classList.add('col');
            colElement.setAttribute('id' , `${i}-${j}`);
            cells.push(colElement);
            rowArr.push(colElement);
            
            rowElement.appendChild(colElement);
        }

        matrix.push(rowArr);
        board.appendChild(rowElement);
    }  

    sourceCoordinate = setCoordinate('source');
    targetCoordinate = setCoordinate('target');
    boardInteraction(cells);
}

function setCoordinate(className, x = -1, y = -1){
    if(isValid(x, y)){
        matrix[x][y].classList.add(className);
    }
    else{
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * col);
        matrix[x][y].classList.add(className);
    }

    return {x, y};
}