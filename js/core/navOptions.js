import { renderBoard, cells } from "./board.js";

export let pixelSize = 22;
export let speed = 'Normal';
export let algorithm = 'BFS';
export let visualizeBtn = document.getElementById('VisualizeButton');

export function operationsOnNavOptions() {
    const navOptions = document.querySelectorAll('.navMenu>li>a');
    var dropOptions = null;
    const removeActiveClass = (elements, parent = false) => {
        elements.forEach(element => {
            if (parent) element = element.parentElement;
            element.classList.remove('active');
        })
    }

    navOptions.forEach(navOption => {
        navOption.addEventListener('click', () => {
            const li = navOption.parentElement;

            if (li.classList.contains('active')) {
                li.classList.remove('active');
                return;
            }

            removeActiveClass(navOptions, true);
            li.classList.add('active');

            if (li.classList.contains('dropBox')) {
                dropOptions = li.querySelectorAll('.dropMenu>li');

                toggelDropOptions(navOption.innerText);
            }
        })
    })

    function toggelDropOptions(target) {
        dropOptions.forEach(dropOption => {
            dropOption.addEventListener('click', () => {
                removeActiveClass(dropOptions);
                dropOption.classList.add('active');

                if (target === 'Pixel') {
                    pixelSize = +dropOption.innerText.replace('px', '');
                    renderBoard(pixelSize);
                }
                else if (target === 'Speed') {
                    speed = dropOption.innerText;
                }
                else {
                    algorithm = dropOption.innerText.split(' ')[0];
                    visualizeBtn.innerText = `Visualize ${algorithm}`;
                }

                removeActiveClass(navOptions, true);
            })
        })
    }

    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.navMenu');

        if (!navMenu.contains(e.target)) {
            removeActiveClass(navOptions, true);
        }
    })
}

const clearPathButton = document.getElementById('clearPathBtn');
clearPathButton.addEventListener('click', ()=>{
    clearPath();
})

const clearBoardButton = document.getElementById('clearBoardBtn');
clearBoardButton.addEventListener('click', ()=>{
    clearBoard();
})


export function clearPath(){
    cells.forEach(cell =>{
        cell.classList.remove('visited');
        cell.classList.remove('path');
    })
}

export function clearBoard(){
    cells.forEach(cell =>{
        cell.classList.remove('wall');
        cell.classList.remove('visited');
        cell.classList.remove('path');
    })
}