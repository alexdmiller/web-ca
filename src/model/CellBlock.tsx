import {Coordinate} from "./Coordinate";

export enum HorizontalAnchor {
  Right, Left
}

export enum VerticalAnchor {
  Top, Bottom
}

export abstract class CellBlock {
  public static WILDCARD: string = '*';

  private anchor: Coordinate = {x: 0, y: 0};

  abstract getWidth(): number;
  abstract getHeight(): number;
  abstract getCell(x: number, y: number): string;
  abstract setCell(x: number, y: number, value: string): void;
  abstract resize(newWidth: number, newHeight: number, horizontalAnchor: HorizontalAnchor, verticalAnchor: VerticalAnchor): CellBlock;

  public setAnchor(x: number, y: number): void {
    this.anchor = {x: x, y: y};
  }

  public getAnchor(): Coordinate {
    return this.anchor;
  }

  public setAnchorFromTarget(target: string): void {
    for (var x = 0; x < this.getWidth(); x++) {
      for (var y = 0; y < this.getHeight(); y++) {
        if (this.getCell(x, y) == target) {
          this.setAnchor(x, y);
          return;
        }
      }
    }
  }

  // Takes the passed cells and copies them over to this cell block.
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