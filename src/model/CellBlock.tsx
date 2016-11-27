export enum HorizontalAnchor {
  Right, Left
}

export enum VerticalAnchor {
  Top, Bottom
}

export abstract class CellBlock {
  public static WILDCARD: string = '*';

  abstract getWidth(): number;
  abstract getHeight(): number;
  abstract getCell(x: number, y: number): string;
  abstract setCell(x: number, y: number, value: string): void;
  abstract resize(newWidth: number, newHeight: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor): CellBlock;

  public copyCells(cells: CellBlock, startX: number, startY: number, ignoreWildcards: boolean): void {
    for (var x = 0; x < cells.getWidth(); x++) {
      for (var y = 0; y < cells.getHeight(); y++) {
        if (!ignoreWildcards || cells.getCell(x, y) != CellBlock.WILDCARD) {
          this.setCell(startX + x, startY + y, cells.getCell(x, y));
        }
      }
    }
  }
}