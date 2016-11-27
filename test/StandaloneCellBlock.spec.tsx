import * as chai from "chai";

import StandaloneCellBlock from "../src/model/StandaloneCellBlock";
import BackedCellBlock from "../src/model/BackedCellBlock";
import CellBlock from "../src/model/BackedCellBlock";
import {HorizontalAnchor, VerticalAnchor} from "../src/model/CellBlock";

describe("StandaloneCellBlock", () => {
  // TODO: factor out this common function (also in BackedCellBlock.spec.tsx)
  function checkMapping(block: CellBlock, expected: string[][]) {
    for (var y = 0; y < expected.length; y++) {
      for (var x = 0; x < expected[y].length; x++) {
        chai.assert.equal(block.getCell(x, y), expected[y][x], 'Position ' + x + ', ' + y);
      }
    }
  }

  it("should expand correctly with anchor at top-left", () => {
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['e', 'f', 'g'],
      ['h', 'i', 'j']
    ]);

    var largerBlock = block.resize(5, 4, HorizontalAnchor.Left, VerticalAnchor.Top);

    checkMapping(largerBlock, [
      ['a', 'b', 'c', ' ', ' '],
      ['e', 'f', 'g', ' ', ' '],
      ['h', 'i', 'j', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ']
    ]);
  });

  it("should expand correctly with anchor at bottom-right", () => {
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['e', 'f', 'g'],
      ['h', 'i', 'j']
    ]);

    var largerBlock = block.resize(5, 4, HorizontalAnchor.Right, VerticalAnchor.Bottom);
    console.log(largerBlock.toString());
    checkMapping(largerBlock, [
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'a', 'b', 'c'],
      [' ', ' ', 'e', 'f', 'g'],
      [' ', ' ', 'h', 'i', 'j']
    ]);
  });
});