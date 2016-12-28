import { Constraint } from "./Constraint";
import { CellBlock } from "../CellBlock";
import BackedCellBlock from "../BackedCellBlock";
import CellularAutomaton from "../CellularAutomaton";

import Rule from "./Rule";
import { HorizontalAnchor, VerticalAnchor } from "../CellBlock";

export default class PatternMatchConstraint extends Constraint {
  public static TARGET: string = 'm';
  
  private pattern: CellBlock;

  constructor(pattern: CellBlock) {
    super();

    this.pattern = pattern;
  }

  public matches(x: number, y: number, cells: CellBlock): boolean {
    // Find top left of block in cells
    var topLeft = {
      x: x - this.pattern.getAnchor().x,
      y: y - this.pattern.getAnchor().y
    };

    var block = BackedCellBlock.donutMapped(cells, topLeft, this.pattern.getWidth(), this.pattern.getHeight());

    if (block.getWidth() != this.pattern.getWidth() && block.getHeight() != this.pattern.getHeight()) {
      return false;
    }

    var anchor = this.pattern.getAnchor();
    for (var x = 0; x < block.getWidth(); x++) {
      for (var y = 0; y < block.getHeight(); y++) {
        var matchesExactly: boolean = this.pattern.getCell(x, y) == block.getCell(x, y);
        var matchesTarget: boolean = (x == anchor.x) &&
            (y == anchor.y) &&
            (this.pattern.getCell(x, y) == Rule.TARGET) &&
            (block.getCell(x, y) == this.getRule().getTarget());

        // TODO: take wildcards into account
        if (!matchesExactly && !matchesTarget) {
          return false;
        }
      }
    }

    return true;
  }

  public resize(
      newWidth: number,
      newHeight: number,
      horizontalAnchor: HorizontalAnchor,
      verticalAnchor: VerticalAnchor): PatternMatchConstraint {
    this.pattern = this.pattern.resize(newWidth, newHeight, horizontalAnchor, verticalAnchor);
    return this;
  }
}