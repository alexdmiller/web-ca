import {CellBlock} from './CellBlock';
import {Coordinate} from './Coordinate';

export default class BackedCellBlock implements CellBlock {
  private backingBlock: CellBlock;
  private topLeft: Coordinate;
  private width: number;
  private height: number;

  public constructor(backingBlock: CellBlock, topLeft: Coordinate, width: number, height: number) {
    // TODO: ensure valid bounds
    this.backingBlock = backingBlock;
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
  }

  getWidth():number {
    return this.width;
  }

  getHeight():number {
    return this.height
  }

  getCell(x:number, y:number):string {
    // TODO: ensure stay within bounds
    return this.backingBlock.getCell(this.topLeft.x + x, this.topLeft.y + y);
  }
}