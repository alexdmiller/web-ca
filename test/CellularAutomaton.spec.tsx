import { CellularAutomaton } from "../src/model/CellularAutomaton";
import * as chai from "chai";

describe("CellularAutomaton", () => {
  var ca: CellularAutomaton;

  beforeEach(() => {
    ca = new CellularAutomaton(100, 100);
  });

  it("should populate lattice with spaces upon construction", () => {
    chai.assert.strictEqual(ca.getWidth(), 100);
    chai.assert.strictEqual(ca.getHeight(), 100);
    for (var x = 0; x < ca.getWidth(); x++) {
      for (var y = 0; y < ca.getHeight(); y++) {
        chai.assert.strictEqual(ca.getCell(x, y), ' ');
      }
    }
  });
});