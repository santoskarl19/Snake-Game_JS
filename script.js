//define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const log = document.getElementById('logo');

// define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

// draw snake
function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
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
    element.style.gridRow = position.y;
}

// Testing draw function
// draw();

// Draw food function
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Generate food function
function generateFood() {
    const x = Math.floor((Math.random() * gridSize) + 1);
    const y = Math.floor((Math.random() * gridSize) + 1);
    return { x, y };
}

// Moving the snake
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    // snake.pop();

    if (head.x == food.x && head.y == food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(); // Clear past interval
        gameInterval = setInterval(() => {
            move();
            // checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// test moving
// setInterval(() => {
//     move(); // move first
//     draw(); // then draw again new position
// }, 200);

// Start game function
function startGame() {
    gameStarted = true; // keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
       move();
    //    checkCollision();
       draw(); 
    }, gameSpeedDelay);
}

// keypress event listener
function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    console.log(gameSpeedDelay);
}