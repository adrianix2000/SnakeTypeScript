class Block {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    getBlockHTML() {
        return `<p class="block"'></p>`;
    }
}
class Snake {
    constructor(x_coord, y_coord) {
        this.coordinates = [];
        this.coordinates.push({ x: x_coord, y: y_coord });
        this.head = { x: x_coord, y: y_coord };
        this.color = "green";
        this.currentLenght = 4;
    }
    getCoords() {
        return this.coordinates;
    }
    generateHTML() {
        return `<p class="block snake"></p>`;
    }
}
class Apple {
    constructor(x_coord, y_coord) {
        this.coords = { x: x_coord, y: y_coord };
        this.color = "red";
    }
    getCoords() {
        return this.coords;
    }
    setCoords(x_coord, y_coord) {
        this.coords = { x: x_coord, y: y_coord };
    }
    generateHTML() {
        return `<p class="block apple"></p>`;
    }
}
class SnakeMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.block = new Block(25, 25, 'black');
        this.mapContent = '';
        this.currentCoords = { x: 1, y: 1 };
        this.snake = new Snake(this.currentCoords.x, this.currentCoords.y);
        this.apple = new Apple(5, 5);
        this.generateMap();
    }
    detectIfSnakeEatApple() {
        return (this.snake.head.x == this.apple.getCoords().x) &&
            (this.snake.head.y == this.apple.getCoords().y);
    }
    generateNewAppleCoords() {
        let x;
        let y;
        do {
            x = Math.floor(Math.random() * 19) + 1;
            y = Math.floor(Math.random() * 19) + 1;
        } while (this.snake.getCoords().some(c => c.x === x && c.y === y));
        this.apple.setCoords(x, y);
    }
    generateMap() {
        this.mapContent = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.snake.getCoords().some(coord => coord.x === x && coord.y === y)) {
                    this.mapContent += this.snake.generateHTML();
                }
                else if (this.apple.getCoords().x == x && this.apple.getCoords().y == y) {
                    this.mapContent += this.apple.generateHTML();
                }
                else {
                    this.mapContent += this.block.getBlockHTML();
                }
            }
            this.mapContent += '<br>';
        }
    }
    getGeneratedMap() {
        return this.mapContent;
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
class GameRound {
    constructor(element) {
        this.canvas = element;
        this.map = new SnakeMap(20, 20);
        this.isStopped = true;
        this.direction = 'p';
        this.frame();
        this.setupKeyboardControls();
    }
    frame() {
        switch (this.direction) {
            case 'd':
                this.map.currentCoords.y--;
                if (this.map.currentCoords.y < 0) {
                    this.map.currentCoords.y = this.map.height - 1;
                }
                break;
            case 'g':
                this.map.currentCoords.y++;
                if (this.map.currentCoords.y >= this.map.height) {
                    this.map.currentCoords.y = 0;
                }
                break;
            case 'p':
                this.map.currentCoords.x++;
                if (this.map.currentCoords.x >= this.map.width) {
                    this.map.currentCoords.x = 0;
                }
                break;
            case 'l':
                this.map.currentCoords.x--;
                if (this.map.currentCoords.x < 0) {
                    this.map.currentCoords.x = this.map.width - 1;
                }
                break;
        }
        if (this.map.detectIfSnakeEatApple()) {
            this.map.snake.currentLenght++;
            this.map.generateNewAppleCoords();
        }
        this.map.snake.coordinates.push(Object.assign({}, this.map.currentCoords)); // tworzenie kopii koordynatów a nie przekazywanie referencji do nich
        this.map.snake.head = Object.assign({}, this.map.currentCoords);
        if (this.map.snake.coordinates.length > this.map.snake.currentLenght) {
            this.map.snake.coordinates.shift();
        }
        console.log(this.map.snake.head);
        // Rysuj mapę
        this.drawMap();
        setTimeout(() => {
            requestAnimationFrame(() => this.frame());
        }, 70);
    }
    drawMap() {
        this.map.generateMap();
        this.canvas.innerHTML = this.map.getGeneratedMap();
    }
    setupKeyboardControls() {
        let isChangingDirection = false;
        document.addEventListener('keydown', (event) => {
            if (isChangingDirection) {
                return; // Jeśli już trwa zmiana kierunku, zignoruj kolejne zdarzenia
            }
            isChangingDirection = true;
            setTimeout(() => {
                switch (event.key) {
                    case 'ArrowDown':
                        if (this.direction != 'd')
                            this.direction = 'g';
                        break;
                    case 'ArrowUp':
                        if (this.direction != 'g')
                            this.direction = 'd';
                        break;
                    case 'ArrowRight':
                        if (this.direction != 'l')
                            this.direction = 'p';
                        break;
                    case 'ArrowLeft':
                        if (this.direction != 'p')
                            this.direction = 'l';
                        break;
                    case 'Escape':
                        this.isStopped = !this.isStopped;
                        break;
                }
                isChangingDirection = false; // Resetuj flagę po zakończeniu opóźnienia
            }, 30); // Opóźnienie 200ms (lub dostosuj według potrzeb)
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        let round = new GameRound(appElement);
    }
});
