import { Rule } from './Rule';
import {CellBlock} from "./CellBlock";
import {StandaloneCellBlock} from "./StandaloneCellBlock";

export class CellularAutomaton implements CellBlock {
  private rules: { [key:string]: Rule[] };
    private cells: StandaloneCellBlock;

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

    public addRule(rule: Rule):void {
      if (!this.rules[rule.getTarget()]) {
          this.rules[rule.getTarget()] = [];
      }
      this.rules[rule.getTarget()].push(rule);
    }

    public applyRules(): void {
      // for (var y = 0; y < this.height; y++) {
      //   for (var x = 0; x < this.width; x++) {
      //     var rulesForCell: Rule[] = this.rules[this.getCell(x, y)];
      //       if (rulesForCell) {
      //         rulesForCell.forEach((rule: Rule) => {
      //             // find top left of block in cells
      //
      //             // check pattern
      //
      //         });
      //       }
      //     }
      //   }
    }
}


/*

x x x
x m x
x x x

*/