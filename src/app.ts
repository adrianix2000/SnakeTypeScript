class Block {
    width: number;
    height: number;
    color: string;

    constructor(width: number, height: number, color: string) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    getBlockHTML(): string {
        return `<p style='background: ${this.color}; width: ${this.width}px; height: ${this.height}px; display: inline-block; margin-right: 4px; margin-top: 0px; margin-bottom: 0px;'></p>`;
    }
}

class Snake {
    private coordinates: { x: number, y: number }[] = [];
    private color: string;

    constructor(x_coord: number, y_coord: number) {
        this.coordinates.push({ x: x_coord, y: y_coord });
        this.color = "green";
    }

    getCoords(): { x: number, y: number }[] {
        return this.coordinates;
    }

    generateHTML(): string {
        return `<p style='background: ${this.color}; width: 25px; height: 25px; display: inline-block; margin-right: 4px; margin-top: 0px; margin-bottom: 0px;'></p>`;
    }
}


class SnakeMap {
    width: number;
    height: number;
    block: Block;
    mapContent: string;
    snake: Snake;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.block = new Block(25, 25, 'black');
        this.mapContent = "";

        this.snake = new Snake(1,1);
        this.generateMap();
    }

    generateMap(): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if(this.snake.getCoords().some(coord => coord.x === x && coord.y === y)) {
                    this.mapContent += this.snake.generateHTML();
                } else {
                    this.mapContent += this.block.getBlockHTML();
                }
            }
            this.mapContent += "<br>";
        }
    }

    getGeneratedMap(): string {
        return this.mapContent;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appElement: HTMLElement | null = document.getElementById('app');

    if (appElement) {
        let map: SnakeMap = new SnakeMap(20, 20);
        appElement.innerHTML = map.getGeneratedMap();
    }
});

