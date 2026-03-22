import { row, col, matrix } from '../core/board.js';
import { clearBoard } from '../core/navOptions.js';
import { animate } from '../core/util.js';

// -----------------------------------------//
// Maze Generation Algorithm
//-----------------------------------------//

export function mazeGenerationAlgorithm() {
    var wallToAnimate;
    const generateMazeButton = document.getElementById('generateMazeBtn');
    generateMazeButton.addEventListener('click', () => {
        clearBoard();
        wallToAnimate = [];
        generatingMaze(0, row - 1, 0, col - 1, false, 'horizontal');
        animate(wallToAnimate, 'wall');
    })

    function generatingMaze(rowStart, rowEnd, colStart, colEnd, surroundingWalls, orientation) {
        if (rowStart > rowEnd || colStart > colEnd) return;

        if (!surroundingWalls) {
            //upper and lower boundary 
            for (let i = 0; i < col; i++) {
                if (!matrix[0][i].classList.contains('source') && !matrix[0][i].classList.contains('target'))
                    wallToAnimate.push(matrix[0][i]);

                if (!matrix[row - 1][i].classList.contains('source') && !matrix[row - 1][i].classList.contains('target'))
                    wallToAnimate.push(matrix[row - 1][i]);
            }

            //both side boundary
            for (let i = 0; i < row; i++) {
                if (!matrix[i][0].classList.contains('source') && !matrix[i][0].classList.contains('target'))
                    wallToAnimate.push(matrix[i][0]);

                if (!matrix[i][col - 1].classList.contains('source') && !matrix[i][col - 1].classList.contains('target'))
                    wallToAnimate.push(matrix[i][col - 1]);
            }

            surroundingWalls = true;
        }

        if (orientation === 'horizontal') {
            let possibleRows = [];
            for (let i = rowStart; i <= rowEnd; i += 2)
                possibleRows.push(i);

            let possibleCols = [];
            for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
                if (i > 0 && i < col - 1)
                    possibleCols.push(i);
            }

            const currentRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
            const randomCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

            for (let i = colStart - 1; i <= colEnd + 1; i++) {
                const cell = matrix[currentRow][i];

                if (!cell || i === randomCol || cell.classList.contains('source') || cell.classList.contains('target'))
                    continue;

                wallToAnimate.push(cell);
            }

            //upper section
            generatingMaze(rowStart, currentRow - 2, colStart, colEnd, surroundingWalls, ((currentRow - 2) - rowStart > colEnd - colStart) ? 'horizontal' : 'vertical');

            //lower section
            generatingMaze(currentRow + 2, rowEnd, colStart, colEnd, surroundingWalls, (rowEnd - (currentRow + 2) > colEnd - colStart) ? 'horizontal' : 'vertical');

        }
        else {
            let possibleCols = [];
            for (let i = colStart; i <= colEnd; i += 2)
                possibleCols.push(i);

            let possibleRows = [];
            for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
                if (i > 0 && i < row - 1)
                    possibleRows.push(i);
            }

            const currentCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];
            const randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

            for (let i = rowStart - 1; i <= rowEnd + 1; i++) {
                if (!matrix[i]) continue;
                const cell = matrix[i][currentCol];

                if (i === randomRow || cell.classList.contains('source') || cell.classList.contains('target'))
                    continue;

                wallToAnimate.push(cell);
            }

            //left section
            generatingMaze(rowStart, rowEnd, colStart, currentCol - 2, surroundingWalls, ((rowEnd - rowStart > (currentCol - 2) - colStart) ? 'horizontal' : 'vertical'));

            //right section
            generatingMaze(rowStart, rowEnd, currentCol + 2, colEnd, surroundingWalls, ((rowEnd - rowStart > colEnd - (currentCol + 2)) ? 'horizontal' : 'vertical'));

        }
    }
}