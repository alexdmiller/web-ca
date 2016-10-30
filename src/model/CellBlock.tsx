export interface CellBlock {
  getWidth(): number;
  getHeight(): number;
  getCell(x: number, y: number): string;
}