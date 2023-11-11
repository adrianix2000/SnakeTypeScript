class Block {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    getBlockHTML() {
        return `<p style='background: ${this.color}; width: ${this.width}px; height: ${this.height}px; display: inline-block; margin-right: 4px; margin-top: 0px; margin-bottom: 0px;'></p>`;
    }
}
class Snake {
    constructor(x_coord, y_coord) {
        this.coordinates = [];
        this.coordinates.push({ x: x_coord, y: y_coord });
        this.color = "green";
    }
    getCoords() {
        return this.coordinates;
    }
    generateHTML() {
        return `<p style='background: ${this.color}; width: 25px; height: 25px; display: inline-block; margin-right: 4px; margin-top: 0px; margin-bottom: 0px;'></p>`;
    }
}
class SnakeMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.block = new Block(25, 25, 'black');
        this.mapContent = "";
        this.snake = new Snake(1, 1);
        this.generateMap();
    }
    generateMap() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.snake.getCoords().some(coord => coord.x === x && coord.y === y)) {
                    this.mapContent += this.snake.generateHTML();
                }
                else {
                    this.mapContent += this.block.getBlockHTML();
                }
            }
            this.mapContent += "<br>";
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
        this.drawMap();
        this.setupKeyboardControls();
        this.isStopped = true;
        this.mainLoop();
    }
    mainLoop() {
        while (this.isStopped) {
        }
    }
    drawMap() {
        this.canvas.innerHTML = this.map.getGeneratedMap();
    }
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    console.log("up");
                    break;
                case 'ArrowDown':
                    console.log("down");
                    break;
                case 'ArrowLeft':
                    console.log("left");
                    break;
                case 'ArrowRight':
                    console.log("right");
                    break;
                case 'Escape':
                    this.isStopped = !this.isStopped;
                    console.log(this.isStopped);
                    break;
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        let round = new GameRound(appElement);
    }
});
