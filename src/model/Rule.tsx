import {CellBlock} from "./CellBlock";

export default class Rule {
  public static TARGET: string = 'm';

  private target: string;
  private targetX: number;
  private targetY: number;
  private beforePattern: CellBlock;
  private afterPattern: CellBlock;

  constructor(target: string, beforePattern: CellBlock, afterPattern: CellBlock) {
    this.target = target;
    this.beforePattern = beforePattern;
    this.afterPattern = afterPattern;

    // TODO: enforce rectangular patterns
    // TODO: enforce before pattern and after pattern are the same size
    // TODO: only allow one targetIdentifier

    for (var y = 0; y < beforePattern.getHeight(); y++) {
      for (var x = 0; x < beforePattern.getWidth(); x++) {
        if (beforePattern.getCell(x, y) == Rule.TARGET) {
          this.targetX = x;
          this.targetY = y;
        }
      }
    }

    if (this.targetX == undefined) {
      throw "Target place holder identifier '" + Rule.TARGET + "' not found in pattern";
    }
  }

  public getTarget(): string {
    return this.target;
  }

  public getBeforePattern(): CellBlock {
    return this.beforePattern;
  }

  public getAfterPattern(): CellBlock {
    return this.afterPattern;
  }

  public getWidth(): number {
    return this.beforePattern.getWidth()
  }

  public getHeight(): number {
    return this.beforePattern.getHeight();
  }

  public getTargetX(): number {
    return this.targetX;
  }

  public getTargetY(): number {
    return this.targetY;
  }

  public matches(block: CellBlock): boolean {
    if (block.getWidth() != this.getWidth() && block.getHeight() != this.getHeight()) {
      return false;
    }

    for (var x = 0; x < block.getWidth(); x++) {
      for (var y = 0; y < block.getHeight(); y++) {
        var matchesExactly: boolean = this.beforePattern.getCell(x, y) == block.getCell(x, y);
        var matchesTarget: boolean = (x == this.targetX) &&
            (y == this.targetY) &&
            (this.beforePattern.getCell(x, y) == Rule.TARGET) &&
            (block.getCell(x, y) == this.target);

        // TODO: take wildcards into account
        if (!matchesExactly && !matchesTarget) {
          return false;
        }
      }
    }

    return true;
  }
}
