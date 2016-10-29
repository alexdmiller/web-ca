import { Rule } from './Rule';

export class CellularAutomaton {
    private width: number;
    private height: number;
    private cells: string[][];
    private rules: { [key:string]: Rule[] }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.cells = [];
        for (var y = 0; y < height; y++) {
            this.cells[y] = [];
            for (var x = 0; x < width; x++) {
                this.cells[y][x] = '+';
            }
        }

        this.rules = {};
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getCell(x: number, y: number): string {
        return this.cells[y][x];
    }

    public addRule(rule: Rule):void {
        if (!this.rules[rule.getTarget()]) {
            this.rules[rule.getTarget()] = [];
        }
        this.rules[rule.getTarget()].push(rule);
    }

    public applyRules(): void {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var rulesForCell: Rule[] = this.rules[this.getCell(x, y)];

                if (rulesForCell) {
                    rulesForCell.forEach((rule:Rule) => {
                        // TODO: test if it maches
                    });
                }
            }
        }
    }
}
