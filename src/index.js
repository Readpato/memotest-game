const $gameBoard = document.querySelector('.game-board');
const $colorBoxes =  $gameBoard.querySelectorAll('.color-box');

function gameSetup() {

    let baseColors = ['violet', 'pink', 'red', 'yellow', 'green', 'cyan'];
    let totalColors = baseColors.concat(baseColors);
    setColorBoxes($colorBoxes, totalColors);
}

function setColorBoxes($colorBoxes, totalColors) {
    const randomColors = totalColors.sort(function(){
        return 0.5 - Math.random();
    });


    // * This works because they have the same array length, so the index is the same

    randomColors.forEach(function(color, index){
        $colorBoxes[index].classList.add(color);
    });
};

gameSetup();
