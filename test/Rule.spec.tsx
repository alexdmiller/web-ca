import * as chai from "chai";

import Rule from "../src/model/rules/Rule";
import StandaloneCellBlock from "../src/model/StandaloneCellBlock";

describe("Rule", () => {
  // TODO: create static function for Rule shortcut

  it("should correctly match cell block with no wild cards", () => {
    var rule = Rule.withPattern('+', new StandaloneCellBlock([
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

    chai.assert.isTrue(rule.matches(1, 1, block));
  });

  it("should correctly reject cell block that does not match (no wild cards)", () => {
    var rule = Rule.withPattern('+', new StandaloneCellBlock([
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

    chai.assert.isFalse(rule.matches(1, 1, block));
  });

  it("should correctly reject cell block with incorrect target", () => {
    var rule = Rule.withPattern('+', new StandaloneCellBlock([
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

    chai.assert.isFalse(rule.matches(1, 1, block));
  });
});