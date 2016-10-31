import * as chai from "chai";

import CellularAutomaton from "../src/model/CellularAutomaton";
import StandaloneCellBlock from "../src/model/StandaloneCellBlock";
import Rule from "../src/model/Rule";

describe("CellularAutomaton", () => {
  var ca: CellularAutomaton;

  it("should populate lattice with spaces upon construction", () => {
    ca = new CellularAutomaton(100, 100);

    chai.assert.strictEqual(ca.getWidth(), 100);
    chai.assert.strictEqual(ca.getHeight(), 100);
    for (var x = 0; x < ca.getWidth(); x++) {
      for (var y = 0; y < ca.getHeight(); y++) {
        chai.assert.strictEqual(ca.getCell(x, y), ' ');
      }
    }
  });

  it("should apply a single rule correctly", () => {
    ca = new CellularAutomaton(3, 3);

    ca.setCells([
        [' ', ' ', ' '],
        [' ', '+', ' '],
        [' ', ' ', ' ']
    ]);

    var rule = new Rule('+', new StandaloneCellBlock([
        [' ', ' ', ' '],
        [' ', 'm', ' '],
        [' ', ' ', ' ']
    ]), '-');

    ca.addRule(rule);

    ca.applyRules();

    chai.assert.equal(ca.getCell(1, 1), '-');
  });

  it("should not apply a rule if there is not a match", () => {
    ca = new CellularAutomaton(3, 3);

    ca.setCells([
      [' ', ' ', ' '],
      [' ', '+', '.'],
      [' ', ' ', ' ']
    ]);

    var rule = new Rule('+', new StandaloneCellBlock([
      [' ', ' ', ' '],
      [' ', 'm', ' '],
      [' ', ' ', ' ']
    ]), '-');

    ca.addRule(rule);

    ca.applyRules();

    chai.assert.equal(ca.getCell(1, 1), '+');
  });

  it("should not apply a rule if there is not a match", () => {
    ca = new CellularAutomaton(3, 3);

    ca.setCells([
      [' ', ' ', ' '],
      [' ', '+', '.'],
      [' ', ' ', ' ']
    ]);

    var rule = new Rule('+', new StandaloneCellBlock([
      [' ', ' ', ' '],
      [' ', 'm', ' '],
      [' ', ' ', ' ']
    ]), '-');

    ca.addRule(rule);

    ca.applyRules();

    chai.assert.equal(ca.getCell(1, 1), '+');
  });

  it("should apply a rule on the edge", () => {
    ca = new CellularAutomaton(3, 3);

    ca.setCells([
      ['+', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ]);

    var rule = new Rule('+', new StandaloneCellBlock([
      [' ', ' ', ' '],
      [' ', 'm', ' '],
      [' ', ' ', ' ']
    ]), '-');

    ca.addRule(rule);

    ca.applyRules();

    chai.assert.equal(ca.getCell(0, 0), '-');
  });
});