import * as chai from "chai";

import StandaloneCellBlock from "../src/model/StandaloneCellBlock";
import BackedCellBlock from "../src/model/BackedCellBlock";
import CellBlock from "../src/model/BackedCellBlock";

describe("BackedCellBlock", () => {
  var backingBlock = new StandaloneCellBlock([
    ['a', 'b', 'c'],
    ['e', 'f', 'g'],
    ['h', 'i', 'j']
  ]);

  function checkMapping(block: CellBlock, expected: string[][]) {
    for (var y = 0; y < expected.length; y++) {
      for (var x = 0; x < expected[y].length; x++) {
        chai.assert.equal(block.getCell(x, y), expected[y][x]);
      }
    }
  }

  it("with donut mapping should correctly map cells with origin top-left", () => {
    var block = BackedCellBlock.donutMapped(backingBlock, {x: 0, y: 0}, 3, 3);
    checkMapping(block, [
      ['a', 'b', 'c'],
      ['e', 'f', 'g'],
      ['h', 'i', 'j']
    ])
  });

  it("with donut mapping should correctly map cells with offset origin", () => {
    var block = BackedCellBlock.donutMapped(backingBlock, {x: 1, y: 1}, 3, 3);
    checkMapping(block, [
      ['f', 'g', 'e'],
      ['i', 'j', 'h'],
      ['b', 'c', 'a']
    ])
  });

  it("with donut mapping should correctly map cells with window smaller than backing cells", () => {
    var block = BackedCellBlock.donutMapped(backingBlock, {x: 2, y: 2}, 2, 2);

    checkMapping(block, [
      ['j', 'h'],
      ['c', 'a']
    ])
  });
});