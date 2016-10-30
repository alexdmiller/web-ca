import {CellBlock} from './CellBlock'

export class StandaloneCellBlock implements CellBlock {
  static withSize(width: number, height: number) {
    var cells: string[][] = [];
    for (var y = 0; y < height; y++) {
      cells[y] = [];
      for (var x = 0; x < width; x++) {
        cells[y][x] = ' ';
      }
    }

    return new StandaloneCellBlock(cells);
  }

  private cells: string[][];

  constructor(cells: string[][]) {
    this.cells = cells;
  }

  public getWidth(): number {
    return this.cells[0].length;
  }

  public getHeight(): number {
    return this.cells.length;
  }

  public getCell(x: number, y: number): string {
    // TODO: handle out of bounds gracefully
    return this.cells[y][x];
  }
}