import {CellBlock} from "./CellBlock";

export default class Rule {
  public static targetIdentifier: string = 'm';

  private target: string;
  private targetX: number;
  private targetY: number;
  private pattern: CellBlock;
  private transformation: string;

  constructor(target: string, pattern: CellBlock, transformation: string) {
    this.target = target;
    this.pattern = pattern;
    this.transformation = transformation;

    // TODO: enforce rectangular patterns
    // TODO: only allow one targetIdentifier

    for (var y = 0; y < pattern.getHeight(); y++) {
      for (var x = 0; x < pattern.getWidth(); x++) {
        if (pattern.getCell(x, y) == Rule.targetIdentifier) {
          this.targetX = x;
          this.targetY = y;
        }
      }
    }

    if (this.targetX == undefined) {
      throw "Target place holder identifier '" + Rule.targetIdentifier + "' not found in pattern";
    }
  }

  public getTarget(): string {
    return this.target;
  }

  public getPattern(): CellBlock {
    return this.pattern;
  }

  public getTransformation(): string {
    return this.transformation;
  }

  public getWidth(): number {
    return this.pattern.getWidth()
  }

  public getHeight(): number {
    return this.pattern.getHeight();
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
        var matchesExactly: boolean = this.pattern.getCell(x, y) == block.getCell(x, y);
        var matchesTarget: boolean = (x == this.targetX) &&
            (y == this.targetY) &&
            (this.pattern.getCell(x, y) == Rule.targetIdentifier) &&
            (block.getCell(x, y) == this.target);

        // TODO: take wildcards into account
        if (!matchesExactly && !matchesTarget) {
          return false;
        }
      }
    }

    console.log(this.pattern, block);

    return true;
  }
}
