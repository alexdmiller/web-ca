import {CellBlock, HorizontalAnchor, VerticalAnchor} from './CellBlock'

export default class StandaloneCellBlock extends CellBlock {
  static withSize(width: number, height: number) {
    var cells: string[][] = [];
    for (var y = 0; y < height; y++) {
      cells[y] = [];
      for (var x = 0; x < width; x++) {
        // TODO: factor out empty cell into constant
        cells[y][x] = ' ';
      }
    }

    return new StandaloneCellBlock(cells);
  }

  private cells: string[][];

  constructor(cells: string[][]) {
    super();
    
    this.cells = cells;
  }

  public getWidth(): number {
    return this.cells[0].length;
  }

  public getHeight(): number {
    return this.cells.length;
  }

  public setCell(x: number, y: number, value: string) {
    if (x < this.getWidth() && y < this.getHeight()) {
      this.cells[y][x] = value;
    }
  }

  public getCell(x: number, y: number): string {
    // TODO: handle out of bounds gracefully
    return this.cells[y][x];
  }

  public setCells(cells: string[][]) {
    this.cells = cells;
  }

  public resize(
      newWidth: number,
      newHeight: number,
      horizontalAnchor: HorizontalAnchor,
      verticalAnchor: VerticalAnchor): CellBlock {
    var c = StandaloneCellBlock.withSize(newWidth, newHeight);
    var ax = horizontalAnchor == HorizontalAnchor.Left ? 0 : newWidth - this.getWidth();
    var ay = verticalAnchor == VerticalAnchor.Top ? 0 : newHeight - this.getHeight();
    c.copyCells(this, ax, ay, false);
    return c;
  }

  public copy(): StandaloneCellBlock {
    var c = StandaloneCellBlock.withSize(this.getWidth(), this.getHeight());
    for (var y = 0; y < this.getHeight(); y++) {
      for (var x = 0; x < this.getWidth(); x++) {
        c.setCell(x, y, this.getCell(x, y));
      }
    }
    return c;
  }

  public toString(): string {
    // TODO: add borders
    var result = "";
    for (var y = 0; y < this.getHeight(); y++) {
      for (var x = 0; x < this.getWidth(); x++) {
        result += this.getCell(x, y);
      }
      result += '\n';
    }
    return result;
  }
}