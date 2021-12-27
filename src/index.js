const $gameBoard = document.querySelector('.game-board');
let $previousColorBox = null;
let $roundCounter = document.querySelector('.round-counter');
let round = 0;

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

    if ($previousColorBox === null) {
        $previousColorBox = $selectedColorBox;
    } else {
        if ($previousColorBox === $selectedColorBox) {
            return;
        }

        round++
        updateRoundCounter(round);

        if(equalColorBoxes($previousColorBox, $selectedColorBox)){
            disableElement($previousColorBox);
            disableElement($selectedColorBox);
            
        } else {
            hideElement($previousColorBox);
            hideElement($selectedColorBox);
        }
        $previousColorBox = null;
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
};

function disableElement($element){
    setTimeout(function(){
        $element.parentElement.classList.add('disabled');
        $element.remove();
        evaluateGameEnd();
    }, 300);
    
};

function updateRoundCounter(round){
    document.querySelector('.rounds').textContent = round.toString();
};

function equalColorBoxes($firstBox, $secondBox) {
    return $firstBox.className === $secondBox.className;
};

function evaluateGameEnd(){

    const $gameEndSection = document.querySelector('.game-end-section');
    const $totalRounds = $gameEndSection.querySelector('.total-rounds');
    if (document.querySelectorAll('.color-box').length === 0) {
        
        $gameBoard.classList.add('hidden');
        $roundCounter.classList.add('hidden');
        $gameEndSection.classList.remove('hidden');
        $totalRounds.textContent = round.toString();
    };
    return;
};

document.querySelector('.start-again-button').onclick = function(){
    const $gameEndSection = document.querySelector('.game-end-section');
    $gameBoard.classList.remove('hidden');
    $gameEndSection.classList.add('hidden');

    resetGame();
    gameSetup();
};

function resetGame(){
    const $gameCol = $gameBoard.querySelectorAll('.game-col');
    round = 0;
    updateRoundCounter(round);
    $roundCounter.classList.remove('hidden');

    $gameCol.forEach(function(column){
        column.classList.remove('disabled');
        let $div = document.createElement('div');
        $div.className = 'color-box';
        column.appendChild($div);
    });
};

gameSetup();
