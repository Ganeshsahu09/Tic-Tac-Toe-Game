let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let turnDetails = document.querySelector('.game-turn-details');
let winmodel = document.querySelector('.model');
let winMessage = document.querySelector('.won-message');
let playAgainButton = document.querySelector('.play-again-button');

const ting = new Audio('ting2.mp3');
const winSound = new Audio('victory2.mp3');

let turn = 'X';
let isGameOver = false;


// Change Turn (O not 0)
const changeTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
};


// Check Win
const checkwin = () => {
    const win = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for(let i=0; i<win.length; i++){
        let p = win[i];
        if(
            boxes[p[0]].innerHTML === boxes[p[1]].innerHTML &&
            boxes[p[1]].innerHTML === boxes[p[2]].innerHTML &&
            boxes[p[0]].innerHTML !== ''
        ){
            let winner = boxes[p[0]].innerHTML;
            turnDetails.innerHTML = `Player ${winner} wins!`;
            winMessage.innerHTML = `🎉 Player ${winner} wins! 🎉`;
            isGameOver = true;
            winSound.play();
            winmodel.style.display = 'block';
        }
    }
};


// Box Click
boxes.forEach(box => {
    box.addEventListener('click', () => {
        if(box.innerHTML === '' && !isGameOver){
            box.innerHTML = turn;
            ting.play();
            checkwin();
            if(!isGameOver){
                changeTurn();
                turnDetails.innerHTML = `Turn for ${turn}`;
            }
            chackforDraw();
        }
    });
});


// Reset
const resetFunction = () => {
    boxes.forEach(box => {
        box.innerHTML = '';
    });
    turn = 'X';
    isGameOver = false;
    turnDetails.innerHTML = `Turn for ${turn}`;
    winmodel.style.display = 'none';
};

reset.addEventListener('click', resetFunction);
playAgainButton.addEventListener('click', resetFunction);

//Check for Draw
const chackforDraw = () => {
    let anyboxEmpty = false;
    for(let i=0; i<boxes.length; i++){
        if(boxes[i].innerHTML === ''){
            anyboxEmpty = true;
            break;
        }   
    }
    if (anyboxEmpty){
        return;
    }
    if(!anyboxEmpty && !isGameOver){
        turnDetails.innerHTML = "It's a draw!";
        winMessage.innerHTML = "It's a draw!";
        winmodel.style.display = 'block';
    }
}


