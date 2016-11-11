import * as chai from "chai";

import Rule from "../src/model/Rule";
import StandaloneCellBlock from "../src/model/StandaloneCellBlock";

describe("Rule", () => {
  it("should correctly match cell block with no wild cards", () => {
    var rule = new Rule('+', new StandaloneCellBlock([
        ['a', 'b', 'c'],
        ['d', 'm', 'e'],
        ['f', 'g', 'h']
    ]), new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]));

    var block = new StandaloneCellBlock([
        ['a', 'b', 'c'],
        ['d', '+', 'e'],
        ['f', 'g', 'h']
    ]);

    chai.assert.isTrue(rule.matches(block));
  });

  it("should correctly reject cell block that does not match (no wild cards)", () => {
    var rule = new Rule('+', new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]), new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]));

    // 'z' rather than 'h' in lower right hand corner
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', '+', 'e'],
      ['f', 'g', 'z']
    ]);

    chai.assert.isFalse(rule.matches(block));
  });

  it("should correctly reject cell block with incorrect target", () => {
    var rule = new Rule('+', new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]), new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]));

    // '-' instead of '+' in the middle
    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', '-', 'e'],
      ['f', 'g', 'z']
    ]);

    chai.assert.isFalse(rule.matches(block));
  });
});