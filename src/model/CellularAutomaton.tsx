import Rule from './rules/Rule';
import { CellBlock, HorizontalAnchor, VerticalAnchor } from "./CellBlock";
import StandaloneCellBlock from "./StandaloneCellBlock";
import BackedCellBlock from "./BackedCellBlock";

export default class CellularAutomaton extends CellBlock {
  private rules: { [key:string]: Rule[] };
  private cells: StandaloneCellBlock;

  // TODO: add parameter for topology
  constructor(width: number, height: number) {
    super();
    this.rules = {' ': [], '*': []};
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

  public setCell(x: number, y: number, value: string): CellularAutomaton {
    this.cells.setCell(x, y, value);
    return this;
  }

  public copyCells(cells: CellBlock, startX: number, startY: number, ignoreWildcards: boolean): void {
    this.cells.copyCells(cells, startX, startY, ignoreWildcards);
  }

  public resize(newWidth: number, newHeight: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor): CellBlock {
    return this.cells.resize(newWidth, newHeight, horizontalAnchor, verticalAnchor);
  }

  public addRule(rule: Rule): void {
    if (!this.rules[rule.getTarget()]) {
      this.rules[rule.getTarget()] = [];
    }
    this.rules[rule.getTarget()].push(rule);
  }

  public addSymbol(symbol: string): void {
    if (!this.rules[symbol]) {
      this.rules[symbol] = [];
    }
  }

  public getRules(): { [key:string]: Rule[] } {
    return this.rules;
  }

  public getRulesForSymbol(symbol: string): Rule[] {
    return this.rules[symbol];
  }

  public applyRules(): CellularAutomaton {
    var nextGeneration = this.cells.copy();

    for (var y = 0; y < this.cells.getHeight(); y++) {
      for (var x = 0; x < this.cells.getWidth(); x++) {
        var rulesForCell: Rule[] = this.rules[this.getCell(x, y)];
        if (rulesForCell) {
          rulesForCell.forEach((rule: Rule) => {

            // Check pattern
            if (rule.matches(x, y, this.cells)) {
              var transformation = rule.getTransformation();

              var topLeft = {
                x: x - transformation.getAnchor().x,
                y: y - transformation.getAnchor().y
              };

              var nextGenBlock = BackedCellBlock.donutMapped(nextGeneration, topLeft, rule.getWidth(), rule.getHeight());
              nextGenBlock.copyCells(rule.getTransformation(), 0, 0, true);
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
