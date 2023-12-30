//define HTML elements
const board = document.getElementById('game-board');

// define game variables
let snake = [{x: 10, y: 10}];


// draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
}

// draw snake
function drawSnake() {
    snake.array.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
    });
}

// Create a snake or food/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className
    return element;
}

// Set the position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    
}