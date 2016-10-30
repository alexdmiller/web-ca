import {CellBlock} from './CellBlock';
import {Coordinate} from './Coordinate';

export default class BackedCellBlock implements CellBlock {
  private backingBlock: CellBlock;
  private topLeft: Coordinate;
  private bottomRight: Coordinate;

  public constructor(backingBlock: CellBlock, topLeft: Coordinate, bottomRight: Coordinate) {
    // TODO: ensure valid bounds

    this.backingBlock = backingBlock;
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  getWidth():number {
    return this.bottomRight.x - this.topLeft.x;
  }

  getHeight():number {
    return this.bottomRight.y - this.topLeft.y;
  }

  getCell(x:number, y:number):string {
    // TODO: ensure stay within bounds
    return this.backingBlock.getCell(this.topLeft.x + x, this.topLeft.y + y);
  }
}