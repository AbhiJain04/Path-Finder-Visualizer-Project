import { sourceCoordinate, targetCoordinate } from "./board.js";

let isDrawing = false;
let isDragging = false;
let dragPoint = null;
let isWeighting = false; // new

export function boardInteraction(cells){
    cells.forEach((cell)=>{
        const pointerdown = (e)=>{
            if(e.button === 2) return; // ignore right click here
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
                if(!e.target.classList.contains('source') && !e.target.classList.contains('target')){
                    e.target.classList.add('wall');
                }
            }
            else if(dragPoint && isDragging){
                document.querySelector(`.${dragPoint}`).classList.remove(`${dragPoint}`);
                e.target.classList.add(`${dragPoint}`);

                var coordinate = e.target.id.split('-');
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
            isWeighting = false;
        }

        // right click to toggle weight
        cell.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
            if(cell.classList.contains('source') || cell.classList.contains('target') || cell.classList.contains('wall')) return;
            cell.classList.toggle('weight');
            cell.innerHTML = cell.classList.contains('weight') ? '<span class="weight-label">5</span>' : '';
        });

        cell.addEventListener('pointerdown', pointerdown);
        cell.addEventListener('pointermove', pointermove);
        cell.addEventListener('pointerup', pointerup);
        cell.addEventListener('click', ()=>{
            if(!cell.classList.contains('source') && !cell.classList.contains('target') && !cell.classList.contains('weight')){
                cell.classList.toggle('wall');
            }
        });
    })
}

// helper used by algorithms
export function getWeight(cell){
    return cell.classList.contains('weight') ? 5 : 1;
}