import Rule from './Rule';
import { CellBlock } from "./CellBlock";
import StandaloneCellBlock from "./StandaloneCellBlock";
import BackedCellBlock from "./BackedCellBlock";

export default class CellularAutomaton implements CellBlock {
  private rules: { [key:string]: Rule[] };
  private cells: StandaloneCellBlock;

  // TODO: add parameter for topology
  constructor(width: number, height: number) {
    this.rules = {};
    this.cells = StandaloneCellBlock.withSize(width, height);
  }

  public getWidth(): number {
    return this.cells.getWidth();
  }

  public getHeight(): number {
    return this.cells.getHeight();
  }

  public getCell(x: number, y: number): string {
    // TODO: handle out of bounds gracefully
    return this.cells.getCell(x, y);
  }

  public setCells(cells: string[][]) {
    this.cells.setCells(cells);
  }

  public setCell(x: number, y: number, value: string): void {
    this.cells.setCell(x, y, value);
  }

  public copyCells(cells: CellBlock, startX: number, startY: number): void {
    this.cells.copyCells(cells, startX, startY);
  }

  public addRule(rule: Rule): void {
    if (!this.rules[rule.getTarget()]) {
      this.rules[rule.getTarget()] = [];
    }
    this.rules[rule.getTarget()].push(rule);
  }

  public getRules(): { [key:string]: Rule[] } {
    return this.rules;
  }

  public applyRules(): CellularAutomaton {
    var nextGeneration = this.cells.copy();

    for (var y = 0; y < this.cells.getHeight(); y++) {
      for (var x = 0; x < this.cells.getWidth(); x++) {
        var rulesForCell: Rule[] = this.rules[this.getCell(x, y)];
        if (rulesForCell) {
          rulesForCell.forEach((rule: Rule) => {
            // Find top left of block in cells
            var topLeft = {
              x: x - rule.getTargetX(),
              y: y - rule.getTargetY()
            };

            var block = BackedCellBlock.donutMapped(this.cells, topLeft, rule.getWidth(), rule.getHeight());

            // Check pattern
            if (rule.matches(block)) {
              var nextGenBlock = BackedCellBlock.donutMapped(nextGeneration, topLeft, rule.getWidth(), rule.getHeight());
              nextGenBlock.copyCells(rule.getAfterPattern(), 0, 0);
            }
          });
        }
      }
    }

    this.cells = nextGeneration;

    return this;
  }

  public toString(): string {
    // TODO: add borders
    var result = "";
    for (var y = 0; y < this.cells.getHeight(); y++) {
      for (var x = 0; x < this.cells.getWidth(); x++) {
        result += this.cells.getCell(x, y);
      }
      result += '\n';
    }
    return result;
  }
}
