import { Rule } from "../src/model/Rule";
import * as chai from "chai";
import {StandaloneCellBlock} from "../src/model/StandaloneCellBlock";

describe("Rule", () => {
  it("rule should correctly match cell block with no wild cards", () => {
    var rule = new Rule('+', new StandaloneCellBlock([
        ['a', 'b', 'c'],
        ['d', 'm', 'e'],
        ['f', 'g', 'h']
    ]), '-');

    var block = new StandaloneCellBlock([
        ['a', 'b', 'c'],
        ['d', '+', 'e'],
        ['f', 'g', 'h']
    ]);

    chai.assert.isTrue(rule.matches(block));
  });

  it("rule correctly reject cell block with no wild cards", () => {
    var rule = new Rule('+', new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', 'm', 'e'],
      ['f', 'g', 'h']
    ]), '-');

    var block = new StandaloneCellBlock([
      ['a', 'b', 'c'],
      ['d', '+', 'e'],
      ['f', 'g', 'z']
    ]);

    chai.assert.isFalse(rule.matches(block));
  });
});