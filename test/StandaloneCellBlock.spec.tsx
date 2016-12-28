import * as chai from "chai";

import StandaloneCellBlock from "../src/model/StandaloneCellBlock";
import CellBlock from "../src/model/BackedCellBlock";
import { HorizontalAnchor, VerticalAnchor } from "../src/model/CellBlock";

describe("StandaloneCellBlock", () => {
  // TODO: factor out this common function (also in BackedCellBlock.spec.tsx)
  function checkMapping(block: CellBlock, expected: string[][]) {
    for (var y = 0; y < expected.length; y++) {
      for (var x = 0; x < expected[y].length; x++) {
        chai.assert.equal(block.getCell(x, y), expected[y][x], 'Position ' + x + ', ' + y);
      }
    }
  }

  it("should set anchor from target", () => {
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['e', 'f', 'X'],
      ['h', 'i', 'j']
    ]);

    block.setAnchorFromTarget('X');

    chai.assert.deepEqual(block.getAnchor(), {x: 2, y: 1});
  });

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
    checkMapping(largerBlock, [
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'a', 'b', 'c'],
      [' ', ' ', 'e', 'f', 'g'],
      [' ', ' ', 'h', 'i', 'j']
    ]);
  });

  it("should contract correctly with anchor at top-left", () => {
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['e', 'f', 'g'],
      ['h', 'i', 'j']
    ]);

    var smallerBlock = block.resize(2, 2, HorizontalAnchor.Left, VerticalAnchor.Top);
    checkMapping(smallerBlock, [
      ['a', 'b'],
      ['e', 'f']
    ]);
  });

  it("should contract correctly with anchor at bottom-right", () => {
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['e', 'f', 'g'],
      ['h', 'i', 'j']
    ]);

    var smallerBlock = block.resize(2, 2, HorizontalAnchor.Right, VerticalAnchor.Bottom);
    checkMapping(smallerBlock, [
      ['f', 'g'],
      ['i', 'j']
    ]);
  });
});