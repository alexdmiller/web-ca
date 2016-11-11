export abstract class CellBlock {
  public static WILDCARD: string = '*';

  abstract getWidth(): number;
  abstract getHeight(): number;
  abstract getCell(x: number, y: number): string;
  abstract setCell(x: number, y: number, value: string): void;

  public copyCells(cells: CellBlock, startX: number, startY: number): void {
    for (var x = 0; x < cells.getWidth(); x++) {
      for (var y = 0; y < cells.getHeight(); y++) {
        if (cells.getCell(x, y) != CellBlock.WILDCARD) {
          this.setCell(startX + x, startY + y, cells.getCell(x, y));
        }
      }
    }
  }
}