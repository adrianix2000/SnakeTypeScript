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
    public coordinates: { x: number; y: number }[] = [];
    private color: string;
    public currentLenght: number;
    public head: {x: number, y: number};

    constructor(x_coord: number, y_coord: number) {
        this.coordinates.push({ x: x_coord, y: y_coord });
        this.head = {x: x_coord, y: y_coord};
        this.color = "green";
        this.currentLenght = 4;
    }

    getCoords(): { x: number; y: number }[] {
        return this.coordinates;
    }

    generateHTML(): string {
        return `<p style='background: ${this.color}; width: 25px; height: 25px; display: inline-block; margin-right: 4px; margin-top: 0px; margin-bottom: 0px;'></p>`;
    }
}

class Apple {
    private coords: {x: number, y: number};
    private color: string;

    constructor(x_coord: number, y_coord: number) {
        this.coords = {x: x_coord, y: y_coord};
        this.color = "red";
    }

    getCoords() {
        return this.coords;
    }

    setCoords(x_coord: number, y_coord: number) {
        this.coords = {x: x_coord, y: y_coord};
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
    apple: Apple;
    public currentCoords: { x: number; y: number };

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.block = new Block(25, 25, 'black');
        this.mapContent = '';

        this.currentCoords = { x: 1, y: 1 };

        this.snake = new Snake(this.currentCoords.x, this.currentCoords.y);

        this.apple = new Apple(5,5);

        this.generateMap();
    }

    generateMap(): void {
        this.mapContent = '';

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.snake.getCoords().some(coord => coord.x === x && coord.y === y)) {
                    this.mapContent += this.snake.generateHTML();
                }
                else if(this.apple.getCoords().x == x && this.apple.getCoords().y == y){
                    this.mapContent += this.apple.generateHTML();
                }
                else {
                    this.mapContent += this.block.getBlockHTML();
                }
            }
            this.mapContent += '<br>';
        }
    }

    getGeneratedMap(): string {
        return this.mapContent;
    }
}

enum Direction {
    Up,
    Down,
    Left,
    Right,
}

class GameRound {
    private map: SnakeMap;
    private canvas: HTMLElement;
    private isStopped: boolean;
    private direction: string;

    constructor(element: HTMLElement) {
        this.canvas = element;
        this.map = new SnakeMap(20, 20);
        this.isStopped = true;
        this.direction = 'p';
        this.frame();
        this.setupKeyboardControls();
    }

    private frame() {

        switch (this.direction) {
            case 'd':
                this.map.currentCoords.y--;
                if (this.map.currentCoords.y < 0) {
                    this.map.currentCoords.y = this.map.height-1;
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
                    this.map.currentCoords.x = 1;
                }
                break;
            case 'l':
                this.map.currentCoords.x--;
                if (this.map.currentCoords.x < 0) {
                    this.map.currentCoords.x = this.map.width-1;
                }
                break;
        }

        this.map.snake.coordinates.push({ ...this.map.currentCoords }); // tworzenie kopii koordynatów a nie przekazywanie referencji do nich
        this.map.snake.head = {...this.map.currentCoords};

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

    private drawMap() {
        this.map.generateMap();
        this.canvas.innerHTML = this.map.getGeneratedMap();
    }

    private setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    if (this.direction != 'd') this.direction = 'g';
                    break;
                case 'ArrowUp':
                    if (this.direction != 'g') this.direction = 'd';
                    break;
                case 'ArrowRight':
                    if (this.direction != 'l') this.direction = 'p';
                    break;
                case 'ArrowLeft':
                    if (this.direction != 'p') this.direction = 'l';
                    break;
                case 'Escape':
                    this.isStopped = !this.isStopped;
                    break;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appElement: HTMLElement | null = document.getElementById('app');

    if (appElement) {
        let round: GameRound = new GameRound(appElement);
    }
});
