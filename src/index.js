const $gameBoard = document.querySelector('.game-board');
let $firstSelectedColorBox = null;

function gameSetup() {
    let $colorBoxes =  $gameBoard.querySelectorAll('.color-box');
    let baseColors = ['violet', 'pink', 'red', 'yellow', 'green', 'cyan'];
    let totalColors = baseColors.concat(baseColors);
    setColorBoxes($colorBoxes, totalColors);
    handleRound();
};

function setColorBoxes($colorBoxes, totalColors) {
    const randomColors = totalColors.sort(function(){
        return 0.5 - Math.random();
    });


    // * This works because they have the same array length, so the index is the same

    randomColors.forEach(function(color, index){
        $colorBoxes[index].classList.add(color);
    });
};

function handleRound(){
    $gameBoard.onclick = function(event) {
        const $element = event.target;
        if ($element.classList.contains('color-box')){
            handleColorBoxClick($element);
        }
    }
};

function handleColorBoxClick($selectedColorBox){
    hightlightElement($selectedColorBox);

    if ($firstSelectedColorBox === null) {
        $firstSelectedColorBox = $selectedColorBox;
    } else {
        if ($firstSelectedColorBox === $selectedColorBox) {
            return;
        }

        if(equalColorBoxes($firstSelectedColorBox, $selectedColorBox)){
            disableElement($firstSelectedColorBox);
            disableElement($selectedColorBox);

        } else {
            hideElement($firstSelectedColorBox);
            hideElement($selectedColorBox);
        }
        $firstSelectedColorBox = null;
    }   
    return;
};

function hightlightElement($element) {
    $element.style.opacity = '1';
};

function hideElement($element) {
    setTimeout(function(){
        $element.style.opacity = '0';
    }, 300);
}

function disableElement($element){
    setTimeout(function(){
        $element.parentElement.classList.add('disabled');
        $element.remove();
        evaluateGameEnd();
    }, 300);
    
};

function equalColorBoxes($firstBox, $secondBox) {
    return $firstBox.className === $secondBox.className;
};

function evaluateGameEnd(){
    const $gameEndMessage = document.querySelector('.game-end-message');
    if (document.querySelectorAll('.color-box').length === 0) {
        $gameBoard.classList.add('hidden');
        $gameEndMessage.classList.remove('hidden');
    };
};

document.querySelector('.start-again-button').onclick = function(){
    const $gameEndMessage = document.querySelector('.game-end-message');
    $gameBoard.classList.remove('hidden');
    $gameEndMessage.classList.add('hidden');

    resetGame();
    gameSetup();
};

function resetGame(){
    const $gameCol = $gameBoard.querySelectorAll('.game-col');

    $gameCol.forEach(function(column){
        column.classList.remove('disabled');
        let $div = document.createElement('div');
        $div.className = 'color-box';
        column.appendChild($div);
    });
};

gameSetup();
