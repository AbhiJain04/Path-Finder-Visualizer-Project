import { sourceCoordinate, targetCoordinate } from "./board.js";

let isDrawing = false;
let isDragging = false;
let dragPoint = null;

export function boardInteraction(cells){
    cells.forEach((cell)=>{
        const pointerdown = (e)=>{
            if(e.target.classList.contains('source')){
                isDragging = true;
                dragPoint = 'source';
            }
            else if(e.target.classList.contains('target')){
                isDragging = true;
                dragPoint = 'target';
            }
            else{
                isDrawing = true;
            }
        }

        const pointermove = (e)=>{
            if(isDrawing){
                e.target.classList.add('wall');
            }
            else if(dragPoint && isDragging){
                document.querySelector(`.${dragPoint}`).classList.remove(`${dragPoint}`);

                e.target.classList.add(`${dragPoint}`);


                //Coordinate Updation of Source and Target after each drag.
                var coordinate = [];
                coordinate = e.target.id.split('-');

                console.log(coordinate);

                if(dragPoint === 'source'){
                    sourceCoordinate.x = +coordinate[0];
                    sourceCoordinate.y = +coordinate[1];
                }
                else{
                    targetCoordinate.x = +coordinate[0];
                    targetCoordinate.y = +coordinate[1];
                }
            }
        }

        const pointerup = ()=>{
            isDragging = false;
            isDrawing = false;
        }

        cell.addEventListener('pointerdown', pointerdown);
        cell.addEventListener('pointermove', pointermove);
        cell.addEventListener('pointerup', pointerup);
        cell.addEventListener('click', ()=>{
            cell.classList.toggle('wall');
        })
    })
}