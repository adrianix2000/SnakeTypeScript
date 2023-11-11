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
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        let map = new SnakeMap(20, 20);
        appElement.innerHTML = map.getGeneratedMap();
    }
});
