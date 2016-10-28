import { Rule } from './Rule';
import { Cell } from './Cell';

export class CellularAutomaton {
    private width: number;
    private height: number;
    private cells: string[];
    private rules: Rule[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.cells = [];
        for (var i = 0; i < width * height; i++) {
            this.cells[i] = '+';
        }

        this.rules = [];
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getCell(x: number, y: number): string {
        return this.cells[y * this.width + x];
    }
}
