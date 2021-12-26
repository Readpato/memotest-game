const $gameBoard = document.querySelector('.game-board');
const $colorBoxes =  $gameBoard.querySelectorAll('.color-box');
let $firstSelectedColorBox = null;

function gameSetup() {

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
    }, 300);
    
};

function equalColorBoxes($firstBox, $secondBox) {
    return $firstBox.className === $secondBox.className;
};


gameSetup();
