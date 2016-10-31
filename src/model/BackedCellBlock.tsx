import {CellBlock} from './CellBlock';
import {Coordinate} from './Coordinate';

export default class BackedCellBlock implements CellBlock {
  private static donutMapping(topLeft: Coordinate, width: number, height: number, p: Coordinate) {
    return {
      x: (((topLeft.x + p.x) % width) + width) % width,
      y: (((topLeft.y + p.y) % height) + height) % height
    };
  }

  public static donutMapped(backingBlock: CellBlock, topLeft: Coordinate, width: number, height: number): BackedCellBlock {
    return new BackedCellBlock(backingBlock, topLeft, width, height, BackedCellBlock.donutMapping);
  }

  private backingBlock: CellBlock;
  private topLeft: Coordinate;
  private width: number;
  private height: number;
  private mappingFunction: Function;

  public constructor(backingBlock: CellBlock, topLeft: Coordinate, width: number, height: number, mappingFunction: Function) {
    // TODO: ensure valid bounds
    this.backingBlock = backingBlock;
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.mappingFunction = mappingFunction;
  }

  getWidth():number {
    return this.width;
  }

  getHeight():number {
    return this.height
  }

  getCell(x:number, y:number):string {
    var mapped: Coordinate = this.mappingFunction(
        this.topLeft,
        this.backingBlock.getWidth(),
        this.backingBlock.getHeight(),
        {x: x, y: y});

    return this.backingBlock.getCell(mapped.x, mapped.y);
  }
}